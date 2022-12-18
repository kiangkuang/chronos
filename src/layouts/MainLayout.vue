<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-icon name="schedule" size="sm" />

        <q-toolbar-title>
          Chronos
        </q-toolbar-title>

        <GoogleLogin
          :button-config="{
            type: 'icon',
            shape: 'circle',
          }"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { GoogleLogin, googleSdkLoaded } from 'vue3-google-login';
import { useScriptTag, until } from '@vueuse/core';
import { ref } from 'vue';

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID || '';
const API_KEY = 'AIzaSyC4YLLkJAGPP1wmyiqzmkkaDzgZFwfPO1w';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const gapiLoaded = ref(false);

useScriptTag('https://apis.google.com/js/api.js', () => {
  window.gapi.load('client', async () => {
    await window.gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiLoaded.value = true;
  });
});

const getEvents = async () => {
  await until(gapiLoaded).toBeTruthy();

  const response = await window.gapi.client.calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: 'startTime',
  });
  console.log(response);
};

googleSdkLoaded(async (google) => {
  google.accounts.oauth2
    .initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: getEvents,
    })
    .requestAccessToken();
});

</script>
