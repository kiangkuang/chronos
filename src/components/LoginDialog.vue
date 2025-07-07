<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :persistent="!isAuthenticated"
  >
    <q-stepper
      v-model="step"
      vertical
      animated
      :header-nav="isAuthenticated"
      active-icon="none"
      class="relative-position"
    >
      <q-step
        :name="1"
        title="Account"
        icon="account_circle"
        :done="isAuthenticated"
      >

        <p v-if="isAuthenticated">Already signed in.</p>

        <template v-else>
          <p>Sign in to the Google Calendar account to load events from.</p>
          <div class="text-caption">
            By signing in, you agree to our
            <router-link to="/privacy-policy" target="_blank">Privacy Policy</router-link>
          </div>
        </template>

        <q-stepper-navigation class="q-gutter-sm">
          <q-btn v-if="isAuthenticated" @click="step = 2" color="primary" icon="check" label="Continue" />
          <q-btn @click="signIn" :flat="isAuthenticated" color="primary" icon="login" :label="isAuthenticated ? 'Change Account' : 'Sign In'" />
          <q-btn v-if="isAuthenticated" @click="signOut" flat color="primary" icon="logout" label="Sign Out" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Calendar"
        icon="calendar_today"
        :done="selectedCalendarIds.length > 0"
      >
        <p>Select the calendars to load events from.</p>

        <div v-if="calendars.length === 0" class="text-center q-pa-md">
          <q-spinner color="primary" size="2em" />
          <p class="q-mt-sm">Loading calendars...</p>
          <q-btn
            @click="loadCalendars"
            flat
            color="primary"
            icon="refresh"
            label="Retry"
            class="q-mt-sm"
          />
        </div>

        <div v-else class="q-gutter-y-md">
          <q-option-group
            v-model="selectedCalendarIds"
            :options="calendarOptions"
            color="primary"
            type="checkbox"
            inline
          />

          <div v-if="selectedCalendarIds.length" class="q-mt-md">
            <q-card flat bordered class="q-mb-sm">
              <q-card-section>
                <div class="text-subtitle2">Selected Calendar</div>
                <div class="text-body2" v-for="id in selectedCalendarIds" :key="id">
                  {{ calendars.find(c => c.id === id)?.summary || id }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <q-stepper-navigation class="q-gutter-sm">
          <q-btn @click="step = 3" color="primary" icon="check" label="Continue" />
          <q-btn @click="step = 1" flat color="primary" icon="arrow_back" label="Back" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Date Range"
        icon="date_range"
        :done="isAuthenticated"
      >
        <p>Select your sprint days.</p>
        <DateSettings/>
        <q-stepper-navigation class="q-gutter-sm">
          <q-btn @click="emit('update:modelValue', false)" color="primary" icon="check" label="Done" />
          <q-btn @click="step = 2" flat color="primary" icon="arrow_back" label="Back" />
        </q-stepper-navigation>
      </q-step>

      <q-inner-loading
        :showing="isLoading"
        label="Loading..."
        color="primary"
      />
    </q-stepper>
  </q-dialog>
</template>

<script setup lang="ts">
import { QStepper } from 'quasar';
import { useGoogle } from 'src/composables/useGoogle';
import {
  ref, watch, watchEffect, computed,
} from 'vue';
import DateSettings from 'src/components/DateSettings.vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'src/stores/settings-store';

defineProps<{modelValue:boolean}>();
const emit = defineEmits<{(event: 'update:modelValue', value: boolean): void }>();

const step = ref(1);

const {
  isLoading, isAuthenticated, signIn: _signIn, signOut, updateEvents,
  loadCalendars, calendars, selectedCalendarIds,
} = useGoogle();

const calendarOptions = computed(() => calendars.value.map((calendar) => ({
  label: calendar.summary || calendar.id || 'Unknown Calendar',
  value: calendar.id || '',
  description: calendar.description || '',
  caption: calendar.primary ? ' (Primary)' : '',
})));

watch(() => isAuthenticated.value, () => {
  if (!isAuthenticated.value) {
    step.value = 1;
  } else if (selectedCalendarIds.value.length === 0) {
    step.value = 2;
  } else {
    step.value = 3;
  }
});

watchEffect(() => {
  if (isAuthenticated.value) {
    loadCalendars();
  }
});

watchEffect(() => {
  if (step.value === 3) {
    updateEvents();
  }
});

// Watch for calendar selection changes and reload events
watch(selectedCalendarIds, () => {
  if (step.value >= 3) {
    updateEvents();
  }
});

const { days } = storeToRefs(useSettingsStore());
watch(days, () => {
  updateEvents();
});

const signIn = async () => {
  await _signIn();
  step.value = 2;
};
</script>
