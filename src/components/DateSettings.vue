<template>
  <q-popup-proxy anchor="bottom middle" self="top middle" @hide="onHide">
    <q-date
      color="blue-10"
      range
      multiple
      v-model="model"
      subtitle="Working days"/>
  </q-popup-proxy>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import { storeToRefs } from 'pinia';
import { useGoogleCalendar } from 'src/composables/useGoogleCalendar';
import { useSettingsStore } from 'src/stores/settings-store';
import { computed } from 'vue';

const { days } = storeToRefs(useSettingsStore());
const { isAuthenticated, updateEvents } = useGoogleCalendar();

const onHide = () => {
  if (isAuthenticated.value) {
    updateEvents();
  }
};

const format = 'yyyy/MM/dd';
const model = computed({
  get() {
    return days.value.map((x) => ({
      from: x.from.toFormat(format), // inclusive
      to: x.to.minus({ days: 1 }).toFormat(format), // inclusive
    }));
  },
  set(newValue) {
    days.value = newValue?.map((x) => ({
      from: DateTime.fromFormat(x.from, format), // inclusive
      to: DateTime.fromFormat(x.to, format).plus({ days: 1 }), // exclusive
    })) ?? [];
  },
});
</script>
