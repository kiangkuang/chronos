<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-icon name="mdi-calendar-clock" size="md" />

        <q-toolbar-title>
          <router-link to="/" class="text-white" style="text-decoration: none;">
            Chronos
          </router-link>
        </q-toolbar-title>

        <q-btn
          flat
          round
          icon="calendar_today"
          to="/calendar"
          class="q-mr-sm"
        >
          <q-tooltip>Calendar</q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          icon="settings"
          @click="dialog = true"
        >
          <q-tooltip>Settings</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
