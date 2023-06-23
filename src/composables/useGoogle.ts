import { StorageSerializers, useScriptTag, useSessionStorage } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'src/stores/settings-store';
import { ref, watchEffect } from 'vue';
import { Notify } from 'quasar';
import { DateTime } from 'luxon';
import { IEvent } from '../interfaces/event';

const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID || '';
const API_KEY = process.env.GOOGLE_API_KEY;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const isLoading = ref(true);

const isAuthenticated = ref(false);
const token = useSessionStorage<google.accounts.oauth2.TokenResponse | null>('token', null, { serializer: StorageSerializers.object });
const tokenExpiry = useSessionStorage<DateTime | null>('tokenExpiry', null, {
  serializer: {
    read: (raw) => (raw ? DateTime.fromISO(raw) : null),
    write: (value) => value?.toISO() ?? '',
  },
});

let google: typeof window.google | null;
useScriptTag('https://accounts.google.com/gsi/client', () => {
  google = window.google;
});

let gapi: typeof window.gapi | null;
useScriptTag('https://apis.google.com/js/api.js', () => {
  gapi = window.gapi;

  gapi.load('client', async () => {
    await gapi?.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });

    isLoading.value = false;

    watchEffect(() => {
      if (token.value && tokenExpiry.value && tokenExpiry.value > DateTime.now()) {
        gapi?.client.setToken(token.value);
        isAuthenticated.value = true;
      } else {
        isAuthenticated.value = false;
      }
    });
  });
});

const signIn = async () => new Promise<google.accounts.oauth2.TokenResponse>((resolve, reject) => {
  if (!google) {
    reject('google not loaded');
    return;
  }

  google.accounts.oauth2
    .initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (response) => {
        token.value = response;
        tokenExpiry.value = DateTime.now().plus({ seconds: Number(response.expires_in) });
        resolve(response);
      },
    })
    .requestAccessToken();
});

const signOut = async () => new Promise<void>((resolve, reject) => {
  if (!google) {
    reject('google not loaded');
    return;
  }

  if (!token.value) {
    reject('no token');
    return;
  }

  google.accounts.oauth2
    .revoke(token.value.access_token, () => {
      token.value = null;
      tokenExpiry.value = null;
      isAuthenticated.value = false;
      resolve();
    });
});

const events = ref<IEvent[]>([]);
const { minDate, maxDate } = storeToRefs(useSettingsStore());
const updateEvents = async () => {
  try {
    if (!gapi) {
      throw new Error('gapi not loaded');
    }

    const response = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: minDate.value.toISO(),
      timeMax: maxDate.value.toISO(),
      showDeleted: false,
      singleEvents: true,
    });

    events.value = response.result.items.filter((event) => event.attendees?.find((attendee) => attendee.self && attendee.responseStatus !== 'declined'));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    signOut();

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

export const useGoogle = () => ({
  isLoading,

  isAuthenticated,
  signIn,
  signOut,

  updateEvents,
  events,
});
