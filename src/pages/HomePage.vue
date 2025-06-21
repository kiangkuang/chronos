<template>
  <q-page class="q-pa-lg">
    <!-- Hero Section -->
    <div class="row justify-center q-mb-xl">
      <div class="col-12 col-md-8 text-center">
        <q-icon name="mdi-calendar-clock" size="80px" color="warning" />
        <h1 class="text-h2 text-weight-bold text-warning q-mb-md">
          Chronos
        </h1>
        <p class="text-h5 text-grey-7 q-mb-lg">
          Your sprint time tracking and calendar management solution
        </p>
        <q-btn
          to="/calendar"
          color="primary"
          size="lg"
          label="Get Started"
          icon="mdi-calendar-arrow-right"
          class="q-mb-md"
        />
      </div>
    </div>

    <!-- Features Section -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-md-4">
        <q-card class="text-center q-pa-lg full-height">
          <q-icon name="mdi-calendar-import" size="60px" color="primary" class="q-mb-md" />
          <h3 class="text-h5 text-weight-bold q-mb-md">Import Calendar</h3>
          <p class="text-body1 text-grey-7">
            Connect your work calendar and automatically import all your meetings and events for sprint planning.
          </p>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="text-center q-pa-lg full-height">
          <q-icon name="mdi-calendar-cursor" size="60px" color="secondary" class="q-mb-md" />
          <h3 class="text-h5 text-weight-bold q-mb-md">Select Events</h3>
          <p class="text-body1 text-grey-7">
            Simply click on events where you're unavailable to accurately track your available sprint time.
          </p>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="text-center q-pa-lg full-height">
          <q-icon name="mdi-finance" size="60px" color="accent" class="q-mb-md" />
          <h3 class="text-h5 text-weight-bold q-mb-md">Improve Commitment Estimations</h3>
          <p class="text-body1 text-grey-7">
            Get summary of your commitments to help your team make better sprint planning decisions.
          </p>
        </q-card>
      </div>
    </div>

    <!-- How it Works Section -->
    <div class="row justify-center q-mb-xl">
      <div class="col-12 col-md-8">
        <h2 class="text-h4 text-weight-bold text-center q-mb-lg">How It Works</h2>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">1</q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">Import Your Calendar</q-item-label>
                  <q-item-label caption>Connect and import events from your existing calendar</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-avatar color="secondary" text-color="white">2</q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">Configure Sprint Days</q-item-label>
                  <q-item-label caption>Set up your sprint schedule and working days</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-12 col-md-6">
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="positive" text-color="white">3</q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">Select Busy Events</q-item-label>
                  <q-item-label caption>Click on events where you're busy to include them in sprint tracking</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-avatar color="accent" text-color="white">4</q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">Share with Team</q-item-label>
                  <q-item-label caption>Export and share your commitment summary with your team for better planning</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="row justify-center">
      <div class="col-12 col-md-6 text-center">
        <q-card class="q-pa-lg bg-primary text-white">
          <h3 class="text-h5 text-weight-bold q-mb-md">Ready to Get Started?</h3>
          <p class="text-body1 q-mb-lg">
            Join teams who are already managing their sprint time more effectively with Chronos.
          </p>
          <q-btn
            to="/calendar"
            color="white"
            text-color="primary"
            size="lg"
            label="Open Calendar"
            icon="mdi-calendar-arrow-right"
          />
        </q-card>
      </div>
    </div>

    <!-- Footer with Privacy Policy -->
    <div class="row justify-center q-mt-xl">
      <div class="col-12 text-center">
        <q-separator class="q-mb-md" />
        <p class="text-caption text-grey-6">
          <router-link to="/privacy-policy" target="_blank">Privacy Policy</router-link>
        </p>
      </div>
    </div>
  </q-page>
</template>
