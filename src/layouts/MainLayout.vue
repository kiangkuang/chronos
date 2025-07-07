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

        <div class="q-gutter-xs">
          <DateSelector />
          <CalendarSelector />
          <AccountMenu />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import AccountMenu from 'components/AccountMenu.vue';
import CalendarSelector from 'components/CalendarSelector.vue';
import DateSelector from 'components/DateSelector.vue';
</script>
