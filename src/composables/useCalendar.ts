import { EventApi, EventInput } from '@fullcalendar/core';
import { DateTime } from 'luxon';
import { ref, computed } from 'vue';
import { useGoogleCalendar } from './useGoogleCalendar';

const selectedEvents = ref<EventApi[]>([]);

const { events: _events } = useGoogleCalendar();
const events = computed(() => _events.value.map<EventInput>((event) => {
  const isSelected = selectedEvents.value.some((x) => x.id === event.id);
  return {
    id: event.id,
    start: event.start.dateTime ?? event.start.date,
    end: event.end.dateTime ?? event.end.date,
    title: event.summary,
    backgroundColor: isSelected ? '#3788d8' : 'white',
    textColor: isSelected ? 'white' : '#3788d8',
  };
}));

const days = [0, 1, 2, 3, 4, 7, 8, 9, 10, 11];
const hours = [11, 12, 14, 15, 16, 17];
const minutes = [0, 30];

const timeSlots = days
  .flatMap((day) => hours
    .flatMap((hour) => minutes
      .flatMap((minute) => DateTime.now().startOf('week').plus({ day, hour, minute }))));

const totalHours = days.length * hours.length;

const workHours = computed(() => {
  let result = 0;
  timeSlots.forEach((slot) => {
    const slotStart = slot;
    const slotEnd = slot.plus({ minutes: 30 });
    let slotResult = slotEnd.diff(slotStart, 'hours').hours;

    selectedEvents.value.forEach((event) => {
      if (slotResult === 0) return;
      const eventStart = DateTime.fromISO(event.start?.toISOString() ?? '');
      const eventEnd = DateTime.fromISO(event.end?.toISOString() ?? '');
      if (((eventEnd > slotStart)) && (eventStart < slotEnd)) {
        slotResult = 0;
      }
    });

    result += slotResult;
  });
  return result;
});

const toggleSelectedEvent = (event :EventApi) => {
  selectedEvents.value = selectedEvents.value.some((x) => x.id === event.id)
    ? selectedEvents.value.filter((x) => x.id !== event.id)
    : [...selectedEvents.value, event];
};

export const useCalendar = () => ({
  events,
  toggleSelectedEvent,
  workHours,
  totalHours,
});
