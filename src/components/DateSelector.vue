<template>
  <q-btn
    flat
    rounded
    :color="days.length > 0 ? 'white' : 'grey-7'"
  >
    <q-tooltip>Date Range</q-tooltip>

    <q-icon name="date_range" />

    <q-popup-proxy v-model="showDialog">
      <q-card style="min-width: 350px" class="bg-white">
        <q-card-section>
          <div class="text-h6">Select Sprint Days</div>
          <div class="text-body2">Choose your working days for the sprint</div>
        </q-card-section>

        <q-card-section>
          <DateSettings />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Done" color="primary" @click="updateEvents" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-popup-proxy>
  </q-btn>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'src/stores/settings-store';
import { useGoogle } from 'src/composables/useGoogle';
import DateSettings from './DateSettings.vue';

const { days } = storeToRefs(useSettingsStore());
const {
  isLoading, isAuthenticated, selectedCalendarIds, updateEvents,
} = useGoogle();

watch(days, () => {
  updateEvents();
});

const showDialog = ref(false);
watch([isLoading, isAuthenticated], () => {
  if (!isLoading.value && isAuthenticated.value && selectedCalendarIds.value.length > 0) {
    showDialog.value = true;
  }
});
</script>
