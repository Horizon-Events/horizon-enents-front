<script setup>
import banner from '../assets/registerIMG.png'
import appAd1 from '../assets/journeyAD.png'
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

          <form @submit.prevent class="space-y-4">
            <input
              type="text"
              placeholder="Username"
              class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-400"
            />
            <input
              type="email"
              placeholder="Email"
              class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-400"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-blue-400"
            />

            <div class="mt-4 flex justify-center">
              <div class="bg-white border rounded shadow px-4 py-2 text-sm text-gray-500">
                <input type="checkbox" id="robot" class="mr-2" />
                I'm not a robot
              </div>
            </div>

            <button
              type="submit"
              class="w-full bg-sky-300 hover:bg-sky-400 text-white font-medium py-2 rounded mt-4"
            >
              Join now
            </button>
          </form>
        </div>
      </div>

      <div class="hidden lg:flex flex-col items-center text-white bg-gray-800 rounded shadow p-2 w-46">
        <img :src="appAd1" alt="App Ad 1" class="w-full rounded" />
        <span class="text-xs text-gray-400 mt-2">Sponsored Ad</span>
      </div>
    </div>
  </div>
</template>
