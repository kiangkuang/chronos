<template>
  <q-page-sticky position="bottom-right" :offset="[16, 16]" class="z-top">
    <q-btn fab icon="edit_note" color="accent">
      <q-popup-proxy :offset="[0, 8]" @before-show="beforeShow">
        <q-editor
          ref="editor"
          :style="{
            width: '600px',
            maxWidth: '90vw',
          }"
          max-height="50vh"
          v-model="model"
          dense
          autofocus
          :definitions="{
            copy: {
              tip: 'Copy All',
              icon: 'copy_all',
              label: 'Copy All',
              handler: copyAll
            }
          }"
          :toolbar="[['undo', 'redo'], ['bold', 'italic', 'strike', 'underline', 'link'], ['unordered', 'ordered', 'outdent', 'indent'], ['copy']]"
        />
      </q-popup-proxy>
    </q-btn>
  </q-page-sticky>
</template>

<script lang="ts" setup>
import { groupBy, sortBy } from 'es-toolkit';
import { DateTime, Interval } from 'luxon';
import {
  QPageSticky, QBtn, QPopupProxy, QEditor,
} from 'quasar';
import { useCalendar } from 'src/composables/useCalendar';
import { ref } from 'vue';

const editor = ref<QEditor>();

const {
  selectedEvents, workHours, totalHours, events,
} = useCalendar();

const model = ref('');

const createElement = (tagName: string, ...children: (Node | string)[]) => {
  const result = document.createElement(tagName);
  children.forEach((child) => {
    result.append(child);
  });
  return result;
};

const beforeShow = () => {
  const selectedEventObjects = events.value.filter((event) => selectedEvents.value.includes(event.id ?? ''));

  const sorted = sortBy(selectedEventObjects, [(event) => event.start?.toString()]);
  const groupedEvents = groupBy(sorted, (event) => DateTime.fromISO(event.start?.toString() ?? '').toFormat('MM/dd EEE'));

  model.value = createElement(
    'p',
    createElement(
      'p',
      'Hours: ',
      createElement('b', workHours.value.toString()),
      ` / ${totalHours.value.toString()}`,
    ),
    createElement('ul', ...Object.keys(groupedEvents).map((key) => createElement(
      'li',
      key,
      createElement('ul', ...groupedEvents[key].map((event) => {
        const start = DateTime.fromISO(event.start?.toString() ?? '');
        const end = DateTime.fromISO(event.end?.toString() ?? '');
        const duration = Interval.fromDateTimes(start, end).toDuration('hours').hours;
        return createElement(
          'li',
          `[${duration}] ${event.title}`,
        );
      })),
    ))),
  ).innerHTML;
};

const copyAll = () => {
  editor.value?.runCmd('selectAll');
  editor.value?.runCmd('copy');
};
</script>
