<template>
  <q-btn
    flat
    rounded
    color="white"
    :disable="!isAuthenticated"
  >
    <q-tooltip>Calendar Selection</q-tooltip>

    <q-icon name="calendar_today" />
    <q-badge
      v-if="isAuthenticated &&selectedCalendarIds.length > 0"
      floating
      rounded
      color="white"
      text-color="primary"
      :label="selectedCalendarIds.length"
    />

    <q-popup-proxy v-model="showCalendarSelector">
      <q-list class="bg-white">
        <q-item v-if="!isAuthenticated">
          <q-item-section>
            <q-item-label>Not available</q-item-label>
            <q-item-label caption>Sign in to access calendars</q-item-label>
          </q-item-section>
        </q-item>

        <template v-else>
          <q-item>
            <q-item-section>
              <q-item-label>Select Calendars</q-item-label>
              <q-item-label caption>{{ selectedCalendarIds.length }} selected</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <div v-if="calendars.length === 0" class="q-pa-md text-center">
            <q-spinner color="primary" size="2em" />
            <p class="q-mt-sm">Loading calendars...</p>
            <q-btn
              @click="loadCalendars"
              flat
              color="primary"
              icon="refresh"
              label="Retry"
              size="sm"
              class="q-mt-sm"
            />
          </div>

          <div v-else class="q-pa-md">
            <q-option-group
              v-model="selectedCalendarIds"
              :options="calendarOptions"
              color="primary"
              type="checkbox"
              @update:model-value="updateEvents"
            />
          </div>
        </template>
      </q-list>
    </q-popup-proxy>
  </q-btn>
</template>

<script setup lang="ts">
import { useGoogle } from 'src/composables/useGoogle';
import { computed, ref, watchEffect } from 'vue';

const {
  isLoading,
  isAuthenticated,
  loadCalendars,
  calendars,
  selectedCalendarIds,
  updateEvents,
} = useGoogle();

const calendarOptions = computed(() => calendars.value.map((calendar) => ({
  label: calendar.summary,
  value: calendar.id,
})));

watchEffect(() => {
  if (isAuthenticated.value) {
    loadCalendars();
  }
});

const showCalendarSelector = ref(false);
watchEffect(() => {
  if (!isLoading.value && isAuthenticated.value && calendars.value.length > 0 && selectedCalendarIds.value.length === 0) {
    showCalendarSelector.value = true;
  }
});
</script>
