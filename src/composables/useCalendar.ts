import { EventApi, EventInput } from '@fullcalendar/core';
import { DateTime, Interval } from 'luxon';
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

const fullDayIntervals = days.map((day) => Interval.fromDateTimes(
  DateTime.now().startOf('week').plus({ day, hours: 0 }),
  DateTime.now().startOf('week').plus({ day, hours: 24 }),
));

const beforeWorkIntervals = days.map((day) => Interval.fromDateTimes(
  DateTime.now().startOf('week').plus({ day, hours: 0 }),
  DateTime.now().startOf('week').plus({ day, hours: 11 }),
));

const lunchIntervals = days.map((day) => Interval.fromDateTimes(
  DateTime.now().startOf('week').plus({ day, hours: 13 }),
  DateTime.now().startOf('week').plus({ day, hours: 14 }),
));

const afterWorkIntervals = days.map((day) => Interval.fromDateTimes(
  DateTime.now().startOf('week').plus({ day, hours: 18 }),
  DateTime.now().startOf('week').plus({ day, hours: 24 }),
));

const workHours = computed(() => {
  const eventIntervals = selectedEvents.value.map((event) => Interval.fromDateTimes(
    DateTime.fromISO(event.start?.toISOString() ?? ''),
    DateTime.fromISO(event.end?.toISOString() ?? ''),
  ));

  const free = Interval.xor([
    ...fullDayIntervals,
    ...beforeWorkIntervals,
    ...lunchIntervals,
    ...afterWorkIntervals,
    ...eventIntervals,
  ]);
  return free.reduce((acc, curr) => acc + curr.toDuration('hours').hours, 0);
});

const totalHours = Interval.xor([
  ...fullDayIntervals,
  ...beforeWorkIntervals,
  ...lunchIntervals,
  ...afterWorkIntervals,
]).reduce((acc, curr) => acc + curr.toDuration('hours').hours, 0);

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
