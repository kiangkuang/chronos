<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-gradient from-blue-900 via-blue-600 to-blue-300">
    <!-- Hero Section -->
    <div class="row justify-center items-center" style="min-height: 100vh;">
      <div class="col-12 col-md-8 text-center q-pa-xl">
        <q-icon name="mdi-calendar-clock" size="120px" color="white" class="q-mb-lg" />
        <h1 class="text-h1 text-white text-weight-bold q-mb-md">
          Chronos
        </h1>
        <p class="text-h5 text-white q-mb-xl" style="opacity: 0.9;">
          Master your sprint commitments with intelligent calendar tracking
        </p>
        <div class="q-gutter-md">
          <q-btn
            to="/calendar"
            color="white"
            text-color="primary"
            size="lg"
            label="Start Tracking"
            icon="mdi-rocket-launch"
            rounded
            no-caps
            class="q-px-xl"
          />
          <q-btn
            flat
            color="white"
            size="lg"
            label="Learn More"
            icon="mdi-play-circle-outline"
            rounded
            no-caps
            class="q-px-xl"
            @click="scrollToFeatures"
          />
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-white q-py-xl" ref="featuresSection">
      <div class="row justify-center">
        <div class="col-12 col-md-10">
          <div class="text-center q-mb-xl">
            <h2 class="text-h3 text-weight-bold text-grey-8 q-mb-md">Powerful Features</h2>
            <p class="text-h6 text-grey-6">Everything you need to track and optimize your sprint availability</p>
          </div>

          <div class="row q-col-gutter-lg">
            <div class="col-12 col-md-4">
              <q-card class="text-center q-pa-xl full-height" bordered>
                <q-icon name="mdi-google" size="60px" color="primary" class="q-mb-md" />
                <h3 class="text-h5 text-weight-bold q-mb-md">Google Calendar Integration</h3>
                <p class="text-body1 text-grey-7 q-mb-md">
                  Seamlessly connect your Google Calendar and import all meetings, events, and commitments in seconds.
                </p>
                <q-chip color="positive" text-color="white" icon="mdi-check" size="sm">
                  One-click import
                </q-chip>
              </q-card>
            </div>

            <div class="col-12 col-md-4">
              <q-card class="text-center q-pa-xl full-height" bordered>
                <q-icon name="mdi-cursor-pointer" size="60px" color="secondary" class="q-mb-md" />
                <h3 class="text-h5 text-weight-bold q-mb-md">Smart Event Selection</h3>
                <p class="text-body1 text-grey-7 q-mb-md">
                  Intuitively select events that impact your availability. Click to include, click to exclude - it's that simple.
                </p>
                <q-chip color="secondary" text-color="white" icon="mdi-gesture-tap" size="sm">
                  Visual selection
                </q-chip>
              </q-card>
            </div>

            <div class="col-12 col-md-4">
              <q-card class="text-center q-pa-xl full-height" bordered>
                <q-icon name="mdi-chart-timeline-variant" size="60px" color="accent" class="q-mb-md" />
                <h3 class="text-h5 text-weight-bold q-mb-md">Sprint Analytics</h3>
                <p class="text-body1 text-grey-7 q-mb-md">
                  Get detailed insights into your availability patterns and help your team make data-driven sprint decisions.
                </p>
                <q-chip color="accent" text-color="white" icon="mdi-trending-up" size="sm">
                  Smart insights
                </q-chip>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- How it Works Section -->
    <div class="bg-grey-1 q-py-xl">
      <div class="row justify-center">
        <div class="col-12 col-md-8">
          <div class="text-center q-mb-xl">
            <h2 class="text-h3 text-weight-bold text-grey-8 q-mb-md">How It Works</h2>
            <p class="text-h6 text-grey-6">Four simple steps to better sprint planning</p>
          </div>

          <div class="q-gutter-md">
            <q-card class="q-pa-lg" bordered>
              <div class="row items-center q-gutter-md">
                <q-avatar size="60px" color="primary" text-color="white" class="text-h4 text-weight-bold">
                  1
                </q-avatar>
                <div class="col">
                  <h3 class="text-h5 text-weight-bold q-mb-sm">Connect Your Calendar</h3>
                  <p class="text-body1 text-grey-7">
                    Sign in with Google and grant access to your calendar. We'll import all your events securely.
                  </p>
                </div>
                <q-icon name="mdi-calendar-import" size="40px" color="primary" class="gt-sm" />
              </div>
            </q-card>

            <div class="text-center q-py-sm">
              <q-icon name="mdi-arrow-down" size="24px" color="grey-5" />
            </div>

            <q-card class="q-pa-lg" bordered>
              <div class="row items-center q-gutter-md">
                <q-avatar size="60px" color="secondary" text-color="white" class="text-h4 text-weight-bold">
                  2
                </q-avatar>
                <div class="col">
                  <h3 class="text-h5 text-weight-bold q-mb-sm">Configure Sprint Settings</h3>
                  <p class="text-body1 text-grey-7">
                    Set your sprint duration, working days, and time zones. Customize to match your team's workflow.
                  </p>
                </div>
                <q-icon name="mdi-cog" size="40px" color="secondary" class="gt-sm" />
              </div>
            </q-card>

            <div class="text-center q-py-sm">
              <q-icon name="mdi-arrow-down" size="24px" color="grey-5" />
            </div>

            <q-card class="q-pa-lg" bordered>
              <div class="row items-center q-gutter-md">
                <q-avatar size="60px" color="positive" text-color="white" class="text-h4 text-weight-bold">
                  3
                </q-avatar>
                <div class="col">
                  <h3 class="text-h5 text-weight-bold q-mb-sm">Mark Busy Events</h3>
                  <p class="text-body1 text-grey-7">
                    Click on meetings and events that affect your development time. Visual feedback makes it intuitive.
                  </p>
                </div>
                <q-icon name="mdi-calendar-cursor" size="40px" color="positive" class="gt-sm" />
              </div>
            </q-card>

            <div class="text-center q-py-sm">
              <q-icon name="mdi-arrow-down" size="24px" color="grey-5" />
            </div>

            <q-card class="q-pa-lg" bordered>
              <div class="row items-center q-gutter-md">
                <q-avatar size="60px" color="accent" text-color="white" class="text-h4 text-weight-bold">
                  4
                </q-avatar>
                <div class="col">
                  <h3 class="text-h5 text-weight-bold q-mb-sm">Share with Team</h3>
                  <p class="text-body1 text-grey-7">
                    Export your availability summary and share it with your team for better sprint planning decisions.
                  </p>
                </div>
                <q-icon name="mdi-share-variant" size="40px" color="accent" class="gt-sm" />
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action Section -->
    <div class="bg-gradient q-py-xl">
      <div class="row justify-center">
        <div class="col-12 col-md-8 text-center">
          <h2 class="text-h3 text-weight-bold text-white q-mb-md">Ready to Optimize Your Sprint Planning?</h2>
          <p class="text-h6 text-white q-mb-lg" style="opacity: 0.9;">
            Join development teams who are already making smarter sprint commitments with Chronos.
          </p>
          <q-btn
            to="/calendar"
            color="white"
            text-color="primary"
            size="xl"
            label="Get Started Now"
            icon="mdi-calendar-arrow-right"
            rounded
            no-caps
            class="q-px-xl q-mb-md"
          />
          <div class="text-white q-mt-md" style="opacity: 0.8;">
            <q-icon name="mdi-shield-check" size="16px" class="q-mr-xs" />
            Your calendar data stays private and secure
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-grey-10 q-py-lg">
      <div class="row justify-center">
        <div class="col-12 col-md-10">
          <div class="row items-center justify-between">
            <div class="col-auto">
              <div class="row items-center">
                <q-icon name="mdi-calendar-clock" size="24px" color="white" class="q-mr-sm" />
                <span class="text-h6 text-white text-weight-bold">Chronos</span>
              </div>
            </div>
            <div class="col-auto">
              <router-link to="/privacy-policy" class="text-grey-5 text-decoration-none">
                Privacy Policy
              </router-link>
            </div>
          </div>
        </div>
      </div>
         </div>
   </q-page>
    </q-page-container>
  </q-layout>
 </template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';

const featuresSection = useTemplateRef('featuresSection');

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
