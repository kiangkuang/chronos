import { maxBy, minBy } from 'lodash';
import { DateTime } from 'luxon';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const isDateSettingsOpen = ref(false);

  const days = ref([
    {
      from: DateTime.now().startOf('week'),
      to: DateTime.now().startOf('week').plus({ days: 4 }).endOf('day'),
    },
    {
      from: DateTime.now().startOf('week').plus({ days: 7 }),
      to: DateTime.now().startOf('week').plus({ days: 11 }).endOf('day'),
    },
  ]);

  const minDate = computed(() => minBy(days.value, (x) => x.from)?.from ?? DateTime.now().startOf('day'));
  const maxDate = computed(() => maxBy(days.value, (x) => x.to)?.to ?? DateTime.now().endOf('day'));

  return {
    isDateSettingsOpen,
    days,
    minDate,
    maxDate,
  };
});
