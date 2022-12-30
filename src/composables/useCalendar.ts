import { EventApi, EventInput } from '@fullcalendar/core';
import { DateTime, Interval } from 'luxon';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'src/stores/settings-store';
import { ref, computed, watch } from 'vue';
import { useGoogleCalendar } from './useGoogleCalendar';

const selectedEvents = ref<EventApi[]>([]);

const { events: _events } = useGoogleCalendar();
const events = computed(() => _events.value.map<EventInput>((event) => ({
  id: event.id,
  start: event.start.dateTime ?? event.start.date,
  end: event.end.dateTime ?? event.end.date,
  title: event.summary,
})));

watch(events, () => {
  selectedEvents.value = [];
});

const { days } = storeToRefs(useSettingsStore());

const fullDayIntervals = computed(() => days.value.flatMap((day) => Interval.fromDateTimes(day.from, day.to).splitBy({ days: 1 })));

const beforeWorkIntervals = computed(() => fullDayIntervals.value.map((day) => Interval.fromDateTimes(
  day.start.plus({ hours: 0 }),
  day.start.plus({ hours: 11 }),
)));

const lunchIntervals = computed(() => fullDayIntervals.value.map((day) => Interval.fromDateTimes(
  day.start.plus({ hours: 13 }),
  day.start.plus({ hours: 14 }),
)));

const afterWorkIntervals = computed(() => fullDayIntervals.value.map((day) => Interval.fromDateTimes(
  day.start.plus({ hours: 18 }),
  day.start.plus({ hours: 24 }),
)));

const workHours = computed(() => {
  const eventIntervals = selectedEvents.value.map((event) => Interval.fromDateTimes(
    DateTime.fromISO(event.start?.toISOString() ?? ''),
    DateTime.fromISO(event.end?.toISOString() ?? ''),
  ));

  return Interval.xor([
    ...fullDayIntervals.value,
    ...beforeWorkIntervals.value,
    ...lunchIntervals.value,
    ...afterWorkIntervals.value,
    ...eventIntervals,
  ]).reduce((acc, curr) => acc + curr.toDuration('hours').hours, 0);
});

const totalHours = computed(() => Interval.xor([
  ...fullDayIntervals.value,
  ...beforeWorkIntervals.value,
  ...lunchIntervals.value,
  ...afterWorkIntervals.value,
]).reduce((acc, curr) => acc + curr.toDuration('hours').hours, 0));

const toggleSelectedEvent = (event :EventApi) => {
  selectedEvents.value = selectedEvents.value.some((x) => x.id === event.id)
    ? selectedEvents.value.filter((x) => x.id !== event.id)
    : [...selectedEvents.value, event];
};

export const useCalendar = () => ({
  events,
  selectedEvents,
  toggleSelectedEvent,
  workHours,
  totalHours,
});
