import { EventApi, EventInput } from '@fullcalendar/core';
import { DateTime, Interval } from 'luxon';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'src/stores/settings-store';
import { ref, computed, watch } from 'vue';
import { useGoogle } from './useGoogle';

const selectedEvents = ref<EventApi[]>([]);

const { days } = storeToRefs(useSettingsStore());

const workDaysInterval = computed(() => days.value
  .flatMap((day) => Interval.fromDateTimes(day.from, day.to).splitBy({ days: 1 })));

const totalWorkIntervals = computed(() => workDaysInterval.value.flatMap((day) => {
  // Add null check for day.start
  if (!day.start) return [];

  return [
    Interval.fromDateTimes(day.start.plus({ hours: 11 }), day.start.plus({ hours: 13 })),
    Interval.fromDateTimes(day.start.plus({ hours: 14 }), day.start.plus({ hours: 18 })),
  ];
}));

const eventIntervals = computed(() => selectedEvents.value.map((event) => Interval.fromDateTimes(
  DateTime.fromISO(event.start?.toISOString() ?? ''),
  DateTime.fromISO(event.end?.toISOString() ?? ''),
)));

const workIntervals = computed(() => eventIntervals.value.reduce((acc, curr) => acc
  .flatMap((x) => x.difference(curr)), totalWorkIntervals.value));

const workHours = computed(() => workIntervals.value.reduce((acc, curr) => acc + curr.toDuration('hours').hours, 0));

const totalHours = computed(() => totalWorkIntervals.value.reduce((acc, curr) => acc + curr.toDuration('hours').hours, 0));

const toggleSelectedEvent = (event: EventApi) => {
  selectedEvents.value = selectedEvents.value.some((x) => x.id === event.id)
    ? selectedEvents.value.filter((x) => x.id !== event.id)
    : [...selectedEvents.value, event];
};

const { events: _events } = useGoogle();
const events = computed(() => [
  ..._events.value.map<EventInput>((event) => ({
    id: event.id,
    start: event.start?.dateTime ?? event.start?.date,
    end: event.end?.dateTime ?? event.end?.date,
    title: event.summary,
  })),
  ...workDaysInterval.value.flatMap((x) => {
    if (!x.start || !x.end) return [];

    return [
      {
        id: crypto.randomUUID(),
        start: x.start.toISODate(),
        end: x.end.toISODate(),
        title: 'Support',
      },
      {
        id: crypto.randomUUID(),
        start: x.start.toISODate(),
        end: x.end.toISODate(),
        title: 'Leave',
      },
    ];
  }),
]);

watch(events, () => {
  selectedEvents.value = [];
});

export const useCalendar = () => ({
  events,
  selectedEvents,
  toggleSelectedEvent,
  workHours,
  totalHours,
});
