import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'src/stores/settings-store';
import { ref } from 'vue';
import { Notify } from 'quasar';
import { IEvent } from '../interfaces/event';
import { useGoogle } from './useGoogle';

const events = ref<IEvent[]>([]);
const { minDate, maxDate, email } = storeToRefs(useSettingsStore());

const getEvents = async () => {
  try {
    const response = await window.gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: minDate.value.toISO(),
      timeMax: maxDate.value.toISO(),
      showDeleted: false,
      singleEvents: true,
    });

    events.value = response.result.items.filter((event) => {
      const attendeeResponse = event.attendees?.filter((attde) => attde.email === email.value).at(0);
      return (attendeeResponse?.responseStatus !== 'declined');
    }).map((e) => e as IEvent);
  } catch {
    Notify.create({
      icon: 'error',
      message: 'Google API error!',
      caption: 'Try again later',
      color: 'negative',
      position: 'top-right',
      progress: true,
    });
  }
};

const { checkToken } = useGoogle();

const updateEvents = () => {
  checkToken(getEvents);
};

export const useGoogleCalendar = () => ({
  updateEvents,
  events,
});
