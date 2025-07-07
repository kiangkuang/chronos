<template>
  <q-btn
    flat
    rounded
    color="white"
    @click="showMenu = true"
  >
    <q-tooltip>Account</q-tooltip>

    <q-icon name="account_circle" />
    <q-badge
      v-if="!isLoading && !isAuthenticated"
      floating
      color="negative"
      rounded
    />
  </q-btn>

  <q-dialog v-model="showMenu" :persistent="!isLoading && !isAuthenticated">
    <q-list class="bg-white">
      <q-item v-if="!isAuthenticated">
        <q-item-section>
          <q-item-label>Not signed in</q-item-label>
          <q-item-label caption>Sign in to Google Calendar</q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-else>
        <q-item-section>
          <q-item-label>Signed in</q-item-label>
          <q-item-label caption>Connected to Google Calendar</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item
        v-if="!isAuthenticated"
        clickable
        @click="signIn"
        :disable="isLoading"
      >
        <q-item-section side>
          <q-icon name="login" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Sign In</q-item-label>
        </q-item-section>
      </q-item>

      <template v-else>
        <q-item clickable @click="signIn" v-close-popup>
          <q-item-section side>
            <q-icon name="swap_horiz" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Change Account</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="signOut" v-close-popup>
          <q-item-section side>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sign Out</q-item-label>
          </q-item-section>
        </q-item>
      </template>

      <q-separator />

      <q-item>
        <q-item-section>
          <q-item-label caption>
            By signing in, you agree to our
            <router-link to="/privacy-policy" target="_blank" class="text-primary">Privacy Policy</router-link>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-dialog>
</template>

<script setup lang="ts">
import { useGoogle } from 'src/composables/useGoogle';
import { ref, watchEffect } from 'vue';

const {
  isLoading, isAuthenticated, signIn, signOut,
} = useGoogle();

const showMenu = ref(false);
watchEffect(() => {
  if (!isLoading.value) {
    showMenu.value = !isAuthenticated.value;
  }
});
</script>
