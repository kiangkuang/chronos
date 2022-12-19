import { until, useScriptTag } from '@vueuse/core';
import { ref } from 'vue';
import { googleSdkLoaded } from 'vue3-google-login';
import { IEvent } from '../interfaces/event';
import { ITokenClient } from '../interfaces/tokenClient';

const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID || '';
const API_KEY = process.env.GOOGLE_API_KEY;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const gapiLoaded = ref(false);
const gsiLoaded = ref(false);
const events = ref<IEvent[]>([]);

let tokenClient: ITokenClient;

useScriptTag('https://apis.google.com/js/api.js', () => {
  window.gapi.load('client', async () => {
    await window.gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiLoaded.value = true;
  });
});

googleSdkLoaded(async (google) => {
  tokenClient = google.accounts.oauth2
    .initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
    });
  gsiLoaded.value = true;
});

const checkToken = async (callback: () => void) => {
  await until(gsiLoaded).toBeTruthy();
  await until(gapiLoaded).toBeTruthy();

  tokenClient.callback = callback;

  if (window.gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient?.requestAccessToken();
  } else {
    callback();
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
});
