<template>
  <q-btn-dropdown
    outline
    rounded
    color="white"
    :disable="!isAuthenticated"
  >
    <template v-slot:label>
      <q-badge
        v-if="selectedCalendarIds.length > 0"
        class="q-mr-xs"
        outline
        rounded
        :label="selectedCalendarIds.length"
      />

      <q-icon name="calendar_today" />

      <q-tooltip>Calendar Selection</q-tooltip>
    </template>

    <q-list style="min-width: 250px">
      <q-item v-if="!isAuthenticated">
        <q-item-section>
          <q-item-label>Not available</q-item-label>
          <q-item-label caption>Sign in to access calendars</q-item-label>
        </q-item-section>
      </q-item>

      <template v-else>
        <q-item>
          <q-item-section>
            <q-item-label>Select Calendars</q-item-label>
            <q-item-label caption>{{ selectedCalendarIds.length }} selected</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <div v-if="calendars.length === 0" class="q-pa-md text-center">
          <q-spinner color="primary" size="2em" />
          <p class="q-mt-sm">Loading calendars...</p>
          <q-btn
            @click="loadCalendars"
            flat
            color="primary"
            icon="refresh"
            label="Retry"
            size="sm"
            class="q-mt-sm"
          />
        </div>

        <div v-else class="q-pa-md">
          <q-option-group
            v-model="selectedCalendarIds"
            :options="calendarOptions"
            color="primary"
            type="checkbox"
            @update:model-value="updateEvents"
          />

          <div v-if="selectedCalendarIds.length" class="q-mt-md">
            <q-card flat bordered class="q-mb-sm">
              <q-card-section class="q-pa-sm">
                <div class="text-subtitle2">Selected Calendars</div>
                <div class="text-body2 text-caption" v-for="id in selectedCalendarIds" :key="id">
                  {{ calendars.find(c => c.id === id)?.summary || id }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </template>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { useGoogle } from 'src/composables/useGoogle';
import { computed, watchEffect } from 'vue';

const {
  isAuthenticated,
  loadCalendars,
  calendars,
  selectedCalendarIds,
  updateEvents,
} = useGoogle();

const calendarOptions = computed(() => calendars.value.map((calendar) => ({
  label: calendar.summary || calendar.id || 'Unknown Calendar',
  value: calendar.id || '',
  description: calendar.description || '',
  caption: calendar.primary ? ' (Primary)' : '',
})));

watchEffect(() => {
  if (isAuthenticated.value) {
    loadCalendars();
  }
});
</script>
