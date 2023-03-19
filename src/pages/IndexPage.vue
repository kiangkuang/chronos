<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col">
        <span>
          Dev Hours: {{ devHours }} / {{ workHours }}
          <q-tooltip>
           focus hours: {{ focusDevHours }} / {{ devHours }} <br/>
           broken hours: {{ brokenDevHours }} / {{ devHours }}
          </q-tooltip>
          </span>
      </div>
      <div class="col"></div>
      <div class="col" style="text-align: right;">
        <span>
          Leave: {{leavePercent}}%,
          <q-tooltip>
            {{leaveHours}} hours
          </q-tooltip>
        </span>
        <span>
          Support: {{supportPercent}}%,
          <q-tooltip>
            {{supportHours}} hours
          </q-tooltip>
        </span>
        <span>
          Meeting: {{meetingPercent}}%,
          <q-tooltip>
            {{meetingHours}} hours
          </q-tooltip>
        </span>
        <span>
          Improving: {{improvingPercent}}%,
          <q-tooltip>
            {{improvingHours}} hours
          </q-tooltip>
        </span>
        <span>
          Dev: {{devPercent}}%
          <q-tooltip>
            {{devHours}} hours
          </q-tooltip>
        </span>

      </div>
    </div>
    <div class="row">
      <q-linear-progress
        rounded
        size="xl"
        color="warning"
        animation-speed="500"
        :value="devHours/workHours"
      />
    </div>
    <div class="row">
      <MyCalendar class="col"/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import MyCalendar from 'src/components/MyCalendar.vue';
import { useTimeCalculator } from 'src/composables/useTimeCalculator';

const {
  workHours,
  leaveHours,
  supportHours,
  meetingHours,
  improvingHours,
  devHours,
  focusDevHours,
  brokenDevHours,
  leavePercent,
  supportPercent,
  meetingPercent,
  improvingPercent,
  devPercent,
} = useTimeCalculator();
</script>
