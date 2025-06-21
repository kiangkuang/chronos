<template>
  <q-page class="q-pa-md">
    <div class="row">
      Work Hours: {{ workHours }}
      <q-linear-progress
        rounded
        size="xl"
        color="warning"
        animation-speed="500"
        :value="workHours/totalHours"
      />
    </div>
    <div class="row">
      <MyCalendar class="col"/>
    </div>
  </q-page>

  <ExportText/>

  <LoginDialog v-model="dialog"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MyCalendar from 'src/components/MyCalendar.vue';
import { useCalendar } from 'src/composables/useCalendar';
import ExportText from 'src/components/ExportText.vue';
import LoginDialog from 'src/components/LoginDialog.vue';

const { workHours, totalHours } = useCalendar();
const dialog = ref(true);
</script>
