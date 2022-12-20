<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script setup lang="ts">
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { useGoogleCalendar } from 'src/composables/useGoogleCalendar';
import { computed, ref } from 'vue';

const selected = ref<string[]>([]);

const { events: _events } = useGoogleCalendar();
const events = computed(() => _events.value.map<EventInput>((x) => {
  const isSelected = selected.value.includes(x.id ?? '');
  return {
    id: x.id,
    start: x.start.dateTime ?? x.start.date,
    end: x.end.dateTime ?? x.end.date,
    title: x.summary,
    backgroundColor: isSelected ? '#3788d8' : 'white',
    textColor: isSelected ? 'white' : '#3788d8',
  };
}));

const calendarOptions = computed<CalendarOptions>(() => ({
  plugins: [timeGridPlugin],
  initialView: 'timeGridWeek',
  height: 'calc(100vh - 50px - 16px - 16px)',
  eventMinHeight: 20,
  eventShortHeight: 40,
  events: events.value,
  slotEventOverlap: false,
  eventMaxStack: 2,
  weekends: false,
  businessHours: {
    daysOfWeek: [1, 2, 3, 4, 5],
    startTime: '11:00',
    endTime: '18:00',
  },
  eventClick: ({ el, event }) => {
    el.blur();

    selected.value = selected.value.includes(event.id)
      ? selected.value.filter((x) => x !== event.id)
      : [...selected.value, event.id];
  },
}));
</script>
