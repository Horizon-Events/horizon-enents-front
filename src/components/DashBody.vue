<script setup>
import event from '../assets/event.png'
import convert from '../assets/convert.png'
</script>

<template>
    <div class="bg-gray-100 py-4">
      <div class="max-w-screen-xl mx-auto px-4">
        <div class="bg-blue-200 text-blue-800 text-sm px-4 py-2 rounded mb-4">
          <strong>Heads up!</strong> We can put a note here/update
        </div>
  
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2">
            <div class="relative">
              <img
                :src="convert"
                alt="Event"
                class="w-full h-56 object-cover rounded"
              />
              <button class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow">
                ←
              </button>
              <button class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow">
                →
              </button>
            </div>
  
            <div class="mt-6">
              <h2 class="text-gray-700 font-medium mb-2">Popular Events</h2>
              <div class="grid grid-cols-2 gap-4">
                <div v-for="n in 6" :key="n" class="bg-white h-32 rounded shadow-sm"></div>
              </div>
            </div>
          </div>
  
          <div>
            <div class="p-3 rounded">
                <div class="bg-gray-300 p-3 rounded shadow-sm flex justify-between items-center mb-4">
                <h3 class="font-semibold text-gray-700 text-lg">Newest Events</h3>
                <span class="text-gray-400 text-xl">🎉</span>
            </div>

  
              <div v-for="n in 3" :key="n" class="bg-white mb-6 shadow rounded overflow-hidden">
                <div class="relative">
                  <img :src="event" alt="Event Banner" class="w-full h-32 object-cover" />
                  <div class="absolute top-2 left-2 bg-white p-2 rounded shadow">
                    <span class="text-xl">🎉</span>
                  </div>
                </div>
  
                <div class="p-4">
                  <h4 class="text-blue-500 font-semibold text-md cursor-pointer hover:underline">
                    Illawarra Sunset Soiree #{{ n + 211 }}
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">Join us watching the sunset</p>
                  <div class="flex justify-between items-center text-xs text-gray-500 mt-4">
                    <span>Wollongong Council</span>
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  