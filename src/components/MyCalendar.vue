<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script setup lang="ts">
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core';
import { useGoogleCalendar } from 'src/composables/useGoogleCalendar';
import { computed, ref } from 'vue';

const { events } = useGoogleCalendar();

const selected = ref<string[]>([]);

const calendarOptions = computed<CalendarOptions>(() => ({
  plugins: [timeGridPlugin],
  initialView: 'timeGridWeek',
  height: 'calc(100vh - 50px - 16px - 16px)',
  eventMinHeight: 20,
  events: events.value,
  slotEventOverlap: false,
  eventMaxStack: 2,
  weekends: false,
  businessHours: {
    daysOfWeek: [1, 2, 3, 4, 5],
    startTime: '11:00',
    endTime: '18:00',
  },
  eventBackgroundColor: 'white',
  eventTextColor: '#3788d8',
  eventClick: ({ el, event }) => {
    el.blur();

    if (selected.value.includes(event.id)) {
      selected.value = selected.value.filter((x) => x !== event.id);
      event.setProp('backgroundColor', undefined);
      event.setProp('textColor', undefined);
    } else {
      selected.value = [...selected.value, event.id];
      event.setProp('backgroundColor', '#3788d8');
      event.setProp('textColor', 'white');
    }
  },
}));

</script>
