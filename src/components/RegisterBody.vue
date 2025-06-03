<script setup>
import axios from 'axios'
import { ref } from 'vue'

import banner from '../assets/registerIMG.png'
import appAd1 from '../assets/journeyAD.png'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const message = ref('')

const registerUser = async () => {
  message.value = ''

  if (password.value !== confirmPassword.value) {
    message.value = 'Passwords do not match'
    return
  }

  try {
    await axios.post('http://localhost:3000/users', {
      email: email.value,
      full_name: username.value,
      password: password.value,
      role: 'attendee',
    })

    message.value = `Successfully registered as ${username.value}`
  } catch (error) {
    message.value = error.response?.data?.error || error.message
  }
}
</script>


<template>
  <div class="bg-gray-100 py-6 px-4">
    <div class="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-6">
      
      <div class="flex-1 max-w-2xl mx-auto">
        <div class="mb-4">
          <img :src="banner" alt="Banner" class="w-full h-30 object-fit rounded shadow" />
        </div>

        <div class="bg-white rounded shadow p-6">
          <h2 class="text-lg font-semibold bg-gray-100 px-4 py-2 rounded mb-4">Register to Event Horizons</h2>

          <form @submit.prevent="registerUser" class="space-y-4">
            <input
              v-model="username"
              type="text"
              placeholder="Username"
              class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-400"
            />
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-400"
            />
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-400"
            />
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-400"
            />

            <button
              type="submit"
              class="w-full bg-sky-300 hover:bg-sky-400 text-white font-medium py-2 rounded mt-4"
            >
              Join now
            </button>
          </form>

          <p class="text-sm text-red-500 mt-4 text-center">{{ message }}</p>
        </div>
      </div>

      <div class="hidden lg:flex flex-col items-center text-white bg-gray-800 rounded shadow p-2 w-46">
        <img :src="appAd1" alt="App Ad 1" class="w-full rounded" />
        <span class="text-xs text-gray-400 mt-2">Sponsored Ad</span>
      </div>
    </div>
  </div>
</template>
