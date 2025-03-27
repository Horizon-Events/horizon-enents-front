<script setup>
import events from '../assets/event.png'
import appAd1 from '../assets/journeyAD.png'

const recentEvents = Array(5).fill({
  title: 'Illawarra Sunset Soiree #212',
  description: 'Join us watching the sunset',
  org: 'Wollongong Council',
  date: '2 days ago'
})
</script>

<template>
  <div class="bg-gray-100 py-6 px-4">
    <div class="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div>
        <h3 class="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded mb-4">Recent Events</h3>
        <div
          v-for="(event, i) in recentEvents"
          :key="i"
          class="bg-white rounded shadow-sm mb-4 flex"
        >
          <img :src="events" alt="Event" class="w-24 h-20 object-cover rounded-l" />
          <div class="p-2 text-sm">
            <p class="text-blue-600 font-medium">{{ event.title }}</p>
            <p class="text-gray-500">{{ event.description }}</p>
            <div class="text-xs text-gray-400 mt-1 flex justify-between">
              <span>{{ event.org }}</span>
              <span>{{ event.date }}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="bg-white rounded shadow p-6">
          <h2 class="text-lg font-semibold bg-gray-100 px-4 py-2 rounded mb-4">
            Login to Event Horizons
          </h2>

          <form @submit.prevent class="space-y-4">
            <input
              type="text"
              placeholder="Username"
              class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-400"
            />

            <div class="mt-2 flex items-center">
              <input type="checkbox" id="robot" class="mr-2" />
              <label for="robot" class="text-sm text-gray-600">I'm not a robot</label>
              <img
                src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                alt="reCAPTCHA"
                class="h-6 ml-auto"
              />
            </div>

            <a href="#" class="text-sm text-blue-400 hover:underline block">
              Forgot your password?
            </a>

            <button
              type="submit"
              class="w-full bg-sky-300 hover:bg-sky-400 text-white font-medium py-2 rounded mt-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <div class="hidden lg:flex flex-col items-center text-white rounded shadow p-3 w-56">
        <img :src="appAd1" alt="App Ad 1" class="w-full rounded mb-2" />
      </div>

    </div>
  </div>
</template>
