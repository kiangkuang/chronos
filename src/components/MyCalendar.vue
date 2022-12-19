<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script setup lang="ts">
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core';

const calendarOptions: CalendarOptions = {
  plugins: [timeGridPlugin],
  initialView: 'timeGridWeek',
  height: 'calc(100vh - 50px - 16px - 16px)',
  events: [],
};

</script>
