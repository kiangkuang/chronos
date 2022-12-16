<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-icon name="schedule" size="sm" />

        <q-toolbar-title>
          Chronos
        </q-toolbar-title>

        <GoogleLogin :callback="callback" prompt auto-login/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GoogleLogin, CallbackTypes } from 'vue3-google-login';

const callback = (response: CallbackTypes.CredentialPopupResponse) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log('Handle the response', response);
};

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
