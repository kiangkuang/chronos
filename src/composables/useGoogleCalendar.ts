import { refAutoReset, until, useScriptTag } from '@vueuse/core';
import { ref } from 'vue';
import { IEvent } from '../interfaces/event';

const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID || '';
const API_KEY = process.env.GOOGLE_API_KEY;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const gapiLoaded = ref(false);
const gsiLoaded = ref(false);
const events = ref<IEvent[]>([]);
const isAuthenticated = ref(false);
const isLoading = refAutoReset(false, 30 * 1000);

useScriptTag('https://apis.google.com/js/api.js', () => {
  window.gapi.load('client', async () => {
    await window.gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiLoaded.value = true;
  });
});

useScriptTag('https://accounts.google.com/gsi/client', () => {
  gsiLoaded.value = true;
});

const checkToken = async (callback: () => void) => {
  isLoading.value = true;
  await until(gsiLoaded).toBeTruthy();
  await until(gapiLoaded).toBeTruthy();

  const tokenClient = window.google.accounts.oauth2
    .initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: () => {
        isAuthenticated.value = true;
        callback();
        isLoading.value = false;
      },
    });

  if (window.gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken();
  } else {
    isAuthenticated.value = true;
    callback();
    isLoading.value = false;
  }
};

const getEvents = async () => {
  const response = await window.gapi.client.calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3)).toISOString(), // TODO: start of week
    timeMax: (new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 14)).toISOString(), // TODO: start of week + 14 days
    showDeleted: false,
    singleEvents: true,
  });

  events.value = response.result.items;
};

const updateEvents = () => {
  checkToken(getEvents);
};

export const useGoogleCalendar = () => ({
  updateEvents,
  events,
  isLoading,
  isAuthenticated,
});
