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
            <a href="#" @click="openPrivacyPolicy" class="text-primary">Privacy Policy</a>
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
        title="Date Range"
        icon="date_range"
        :done="isAuthenticated"
      >
        <p>Select your sprint days.</p>
        <DateSettings/>
        <q-stepper-navigation class="q-gutter-sm">
          <q-btn @click="emit('update:modelValue', false)" color="primary" icon="check" label="Done" />
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
import { ref, watch, watchEffect } from 'vue';
import DateSettings from 'src/components/DateSettings.vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'src/stores/settings-store';
import { useRouter } from 'vue-router';

defineProps<{modelValue:boolean}>();
const emit = defineEmits<{(event: 'update:modelValue', value: boolean): void }>();

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

const { days } = storeToRefs(useSettingsStore());
watch(days, () => {
  updateEvents();
});

const signIn = async () => {
  await _signIn();
  step.value = 2;
};

const router = useRouter();
const openPrivacyPolicy = () => {
  const privacyPolicyUrl = `${router.options.history?.base ?? ''}/privacy-policy.html`;
  window.open(privacyPolicyUrl, '_blank');
};
</script>
