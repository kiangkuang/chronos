<template>
  <q-dialog v-model="isDateSettingsOpen">
    <q-date
      range
      multiple
      v-model="model"
      subtitle="Working days"/>
  </q-dialog>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'src/stores/settings-store';
import { computed } from 'vue';

const { isDateSettingsOpen, days } = storeToRefs(useSettingsStore());

const format = 'yyyy/MM/dd';
const model = computed({
  get() {
    return days.value.map((x) => ({
      from: x.from.toFormat(format),
      to: x.to.toFormat(format),
    }));
  },
  set(newValue) {
    days.value = newValue?.map((x) => ({
      from: DateTime.fromFormat(x.from, format),
      to: DateTime.fromFormat(x.to, format).endOf('day'),
    })) ?? [];
  },
});
</script>
