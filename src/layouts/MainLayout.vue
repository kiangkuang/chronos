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
          icon="sync"
          :loading="isLoading"
          @click="updateEvents"
        >
          <template v-slot:loading>
            <q-spinner/>
            <q-tooltip anchor="center left" self="center right" class="text-body2 bg-dark">
              Sign in with Google!
            </q-tooltip>
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
import { useGoogleCalendar } from 'src/composables/useGoogleCalendar';

const { updateEvents, isLoading } = useGoogleCalendar();
</script>
