<template>
  <q-btn
    flat
    rounded
    icon="date_range"
    :color="days.length > 0 ? 'white' : 'grey-7'"
    @click="showDialog = true"
  >
    <q-tooltip>Date Range</q-tooltip>
  </q-btn>

  <q-dialog v-model="showDialog">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Select Sprint Days</div>
        <div class="text-body2">Choose your working days for the sprint</div>
      </q-card-section>

      <q-card-section>
        <DateSettings />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" @click="showDialog = false" />
        <q-btn flat label="Done" color="primary" @click="handleDone" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'src/stores/settings-store';
import { useGoogle } from 'src/composables/useGoogle';
import DateSettings from './DateSettings.vue';

const showDialog = ref(false);
const { days } = storeToRefs(useSettingsStore());
const { updateEvents, isAuthenticated, isLoading } = useGoogle();

const handleDone = () => {
  showDialog.value = false;
  updateEvents();
};

watch(days, () => {
  updateEvents();
});

watchEffect(() => {
  if (isAuthenticated.value && !isLoading.value) {
    showDialog.value = true;
  }
});
</script>
