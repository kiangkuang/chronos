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
          icon="settings"
          @click="dialog = true"
        >
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <ExportText/>
  </q-layout>

  <LoginDialog v-model="dialog"/>
</template>

<script setup lang="ts">
import ExportText from 'src/components/ExportText.vue';
import LoginDialog from 'src/components/LoginDialog.vue';
import { ref } from 'vue';

const dialog = ref(true);
</script>
