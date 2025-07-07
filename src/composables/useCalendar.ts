import { EventApi, EventInput } from '@fullcalendar/core';
import { DateTime, Interval } from 'luxon';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'src/stores/settings-store';
import { ref, computed, watch } from 'vue';
import { useGoogle } from './useGoogle';

const selectedEvents = ref<string[]>([]);

const { days } = storeToRefs(useSettingsStore());

const workDaysInterval = computed(() => days.value
  .flatMap((day) => Interval.fromDateTimes(day.from, day.to).splitBy({ days: 1 })));

const totalWorkIntervals = computed(() => workDaysInterval.value.flatMap((day) => {
  if (!day.start) return [];

  return [
    Interval.fromDateTimes(day.start.plus({ hours: 11 }), day.start.plus({ hours: 13 })),
    Interval.fromDateTimes(day.start.plus({ hours: 14 }), day.start.plus({ hours: 18 })),
  ];
}));

const { events: _events } = useGoogle();
const events = computed(() => [
  ..._events.value.map<EventInput>((event) => {
    const isSelected = selectedEvents.value.includes(event.id);
    return {
      id: event.id,
      start: event.start?.dateTime ?? event.start?.date,
      end: event.end?.dateTime ?? event.end?.date,
      title: event.summary,
      backgroundColor: isSelected ? '#3788d8' : 'white',
      textColor: isSelected ? 'white' : '#3788d8',
    };
  }),
  ...workDaysInterval.value.flatMap((x) => {
    if (!x.start || !x.end) return [];

    return [
      {
        id: `support-${x.start.toISODate()}`,
        start: x.start.toISODate(),
        end: x.end.toISODate(),
        title: 'Support',
        backgroundColor: selectedEvents.value.includes(`support-${x.start.toISODate()}`) ? '#3788d8' : 'white',
        textColor: selectedEvents.value.includes(`support-${x.start.toISODate()}`) ? 'white' : '#3788d8',
      },
      {
        id: `leave-${x.start.toISODate()}`,
        start: x.start.toISODate(),
        end: x.end.toISODate(),
        title: 'Leave',
        backgroundColor: selectedEvents.value.includes(`leave-${x.start.toISODate()}`) ? '#3788d8' : 'white',
        textColor: selectedEvents.value.includes(`leave-${x.start.toISODate()}`) ? 'white' : '#3788d8',
      },
    ];
  }),
]);

const eventIntervals = computed(() => {
  const allEvents = events.value;
  return selectedEvents.value
    .map((eventId) => allEvents.find((event) => event.id === eventId))
    .filter((event): event is EventInput => event !== undefined)
    .map((event) => Interval.fromDateTimes(
      DateTime.fromISO(event.start?.toString() ?? ''),
      DateTime.fromISO(event.end?.toString() ?? ''),
    ));
});

const workIntervals = computed(() => eventIntervals.value.reduce((acc, curr) => acc
  .flatMap((x) => x.difference(curr)), totalWorkIntervals.value));

const workHours = computed(() => workIntervals.value.reduce((acc, curr) => acc + curr.toDuration('hours').hours, 0));

const totalHours = computed(() => totalWorkIntervals.value.reduce((acc, curr) => acc + curr.toDuration('hours').hours, 0));

const toggleSelectedEvent = (event: EventApi) => {
  const eventId = event.id;
  selectedEvents.value = selectedEvents.value.includes(eventId)
    ? selectedEvents.value.filter((id) => id !== eventId)
    : [...selectedEvents.value, eventId];
};

watch(_events, () => {
  selectedEvents.value = selectedEvents.value.filter((id) => _events.value.some((event) => event.id === id));
});

export const useCalendar = () => ({
  events,
  selectedEvents,
  toggleSelectedEvent,
  workHours,
  totalHours,
});
