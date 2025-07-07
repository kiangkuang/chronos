import { maxBy, minBy } from 'es-toolkit/compat';
import { DateTime } from 'luxon';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const days = ref([
    {
      from: DateTime.now().startOf('week'), // inclusive
      to: DateTime.now().startOf('week').plus({ days: 5 }), // exclusive
    },
    {
      from: DateTime.now().startOf('week').plus({ days: 7 }), // inclusive
      to: DateTime.now().startOf('week').plus({ days: 12 }), // exclusive
    },
  ]);

  const minDate = computed(() => minBy(days.value, (x) => x.from)?.from ?? DateTime.now().startOf('day'));
  const maxDate = computed(() => maxBy(days.value, (x) => x.to)?.to ?? DateTime.now().startOf('day').plus({ days: 1 }));

  return {
    days,
    minDate,
    maxDate,
  };
});
