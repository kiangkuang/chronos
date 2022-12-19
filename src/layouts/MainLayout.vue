<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-icon name="schedule" size="md" />

        <q-toolbar-title>
          Chronos
        </q-toolbar-title>

        <q-btn
          color="white"
          text-color="black"
          dense
          round
          icon="sync"
          @click="updateEvents"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useGoogleCalendar } from 'src/composables/useGoogleCalendar';

const { updateEvents } = useGoogleCalendar();
</script>
