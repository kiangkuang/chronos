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
        <p v-else>Sign in to the Google Calendar account to load events from.</p>
        <q-stepper-navigation class="q-gutter-sm">
          <q-btn v-if="isAuthenticated" @click="step = 2" color="primary" icon="check" label="Continue" />
          <q-btn @click="signIn" :flat="isAuthenticated" color="primary" icon="login" :label="isAuthenticated ? 'Change Account' : 'Sign In'" />
          <q-btn v-if="isAuthenticated" @click="signOut" flat color="primary" icon="logout" label="Sign Out" />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name="2"
        title="Date Range"
        icon="date_range"
        :done="isAuthenticated"
      >
        <p>Select your sprint days.</p>
        <DateSettings/>
        <q-stepper-navigation class="q-gutter-sm">
          <q-btn @click="done" color="primary" icon="check" label="Done" />
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
import { ref, watchEffect } from 'vue';
import DateSettings from 'src/components/DateSettings.vue';

defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const step = ref(1);

const {
  isLoading, isAuthenticated, signIn: _signIn, signOut, updateEvents,
} = useGoogle();

watchEffect(() => {
  if (isAuthenticated.value) {
    step.value = 2;
  } else {
    step.value = 1;
  }
});

watchEffect(() => {
  if (step.value === 2) {
    updateEvents();
  }
});

const done = () => {
  updateEvents();
  emit('update:modelValue', false);
};

const signIn = async () => {
  await _signIn();
  step.value = 2;
};
</script>
