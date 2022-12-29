<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-icon name="schedule" size="md" />

        <q-toolbar-title>
          Chronos
        </q-toolbar-title>

        <q-btn
          flat
          round
          icon="date_range"
          @click="isDateSettingsOpen=true"
        >
          <q-tooltip anchor="bottom middle" self="top middle" class="text-body2 bg-dark">
            Working days
          </q-tooltip>
        </q-btn>
        <DateSettings/>

        <q-btn
          flat
          round
          icon="cloud_sync"
          :loading="isLoading"
          @click="updateEvents"
        >
          <q-tooltip anchor="bottom middle" self="top middle" class="text-body2 bg-dark">
            {{ isAuthenticated ? "Re-sync calendar" : "Sign in with Google" }}
          </q-tooltip>

          <template v-slot:loading>
            <q-spinner/>
          </template>
        </q-btn>
        <q-spinner-radio
          color="primary"
          size="2em"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import DateSettings from 'src/components/DateSettings.vue';
import { useGoogleCalendar } from 'src/composables/useGoogleCalendar';
import { useSettingsStore } from 'src/stores/settings-store';

const { updateEvents, isLoading, isAuthenticated } = useGoogleCalendar();
const { isDateSettingsOpen } = storeToRefs(useSettingsStore());
</script>
