<template>
  <q-dialog v-model="isDateSettingsOpen">
    <q-date range multiple v-model="days" subtitle="Working days"/>
  </q-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'src/stores/settings-store';

const { isDateSettingsOpen, days } = storeToRefs(useSettingsStore());
</script>
