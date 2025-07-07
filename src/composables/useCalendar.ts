import { EventApi, EventInput } from '@fullcalendar/core';
import { DateTime, Interval } from 'luxon';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'src/stores/settings-store';
import { ref, computed, watch } from 'vue';
import { useGoogle } from './useGoogle';

// Default colors for fallback
const DEFAULT_COLORS = {
  TRANSPARENCY: '10',
  CALENDAR_BACKGROUND: '#3788d8',
  CALENDAR_FOREGROUND: '#000000',
  CUSTOM_BACKGROUND: '#aaaaaa',
  CUSTOM_FOREGROUND: '#000000',
};

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

const {
  events: _events, calendars, getCalendarColor,
} = useGoogle();

const customEvents = ref<EventInput[]>([]);

const events = computed(() => [
  ..._events.value.map<EventInput>((event) => {
    const isSelected = selectedEvents.value.includes(event.id);

    // Find the calendar this event belongs to
    const calendar = calendars.value.find((cal) => cal.id === event.calendarId);

    const colors = getCalendarColor(calendar);

    return {
      id: event.id,
      start: event.start?.dateTime ?? event.start?.date,
      end: event.end?.dateTime ?? event.end?.date,
      title: event.summary,
      backgroundColor: `${colors.background ?? DEFAULT_COLORS.CALENDAR_BACKGROUND}${isSelected ? '' : DEFAULT_COLORS.TRANSPARENCY}`,
      textColor: colors.foreground ?? DEFAULT_COLORS.CALENDAR_FOREGROUND,
      borderColor: colors.background ?? DEFAULT_COLORS.CALENDAR_BACKGROUND,
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
        backgroundColor: `${DEFAULT_COLORS.CUSTOM_BACKGROUND}${selectedEvents.value.includes(`support-${x.start.toISODate()}`) ? '' : DEFAULT_COLORS.TRANSPARENCY}`,
        textColor: DEFAULT_COLORS.CUSTOM_FOREGROUND,
        borderColor: DEFAULT_COLORS.CUSTOM_BACKGROUND,
      },
      {
        id: `leave-${x.start.toISODate()}`,
        start: x.start.toISODate(),
        end: x.end.toISODate(),
        title: 'Leave',
        backgroundColor: `${DEFAULT_COLORS.CUSTOM_BACKGROUND}${selectedEvents.value.includes(`leave-${x.start.toISODate()}`) ? '' : DEFAULT_COLORS.TRANSPARENCY}`,
        textColor: DEFAULT_COLORS.CUSTOM_FOREGROUND,
        borderColor: DEFAULT_COLORS.CUSTOM_BACKGROUND,
      },
    ];
  }),
  ...customEvents.value.map<EventInput>((event) => ({
    ...event,
    backgroundColor: `${DEFAULT_COLORS.CUSTOM_BACKGROUND}${selectedEvents.value.includes(event.id ?? '') ? '' : DEFAULT_COLORS.TRANSPARENCY}`,
    textColor: DEFAULT_COLORS.CUSTOM_FOREGROUND,
    borderColor: DEFAULT_COLORS.CUSTOM_BACKGROUND,
  })),
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
  customEvents,
  selectedEvents,
  toggleSelectedEvent,
  workHours,
  totalHours,
});
