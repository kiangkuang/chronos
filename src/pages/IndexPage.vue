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
</template>

<script setup lang="ts">
import MyCalendar from 'src/components/MyCalendar.vue';
import { useCalendar } from 'src/composables/useCalendar';

const { workHours, totalHours } = useCalendar();
</script>
