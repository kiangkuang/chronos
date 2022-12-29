import { maxBy, minBy } from 'lodash';
import { DateTime } from 'luxon';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const isDateSettingsOpen = ref(false);

  const days = ref([
    {
      from: DateTime.now().startOf('week').toFormat('yyyy/MM/dd'),
      to: DateTime.now().startOf('week').plus({ days: 4 }).toFormat('yyyy/MM/dd'),
    },
    {
      from: DateTime.now().startOf('week').plus({ days: 7 }).toFormat('yyyy/MM/dd'),
      to: DateTime.now().startOf('week').plus({ days: 11 }).toFormat('yyyy/MM/dd'),
    },
  ]);

  const minDate = computed(() => DateTime.fromFormat(minBy(days.value, (x) => x.from)?.from ?? '', 'yyyy/MM/dd'));
  const maxDate = computed(() => DateTime.fromFormat(maxBy(days.value, (x) => x.to)?.to ?? '', 'yyyy/MM/dd'));

  return {
    isDateSettingsOpen,
    days,
    minDate,
    maxDate,
  };
});
