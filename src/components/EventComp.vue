<script setup>
import { defineProps } from 'vue'
import { ref } from 'vue'

import eventDefault from '../assets/event.png'
import event1 from '../assets/event1.jpg'
import event2 from '../assets/event2.jpg'
import event3 from '../assets/event3.jpg'
import event4 from '../assets/event4.jpg'

const props = defineProps({
  id: [String, Number],
  name: String,
  description: String,
  category: String,
  generalPrice: Number,
  vipPrice: Number,
  image: String
})

const imageOptions = [eventDefault, event1, event2, event3, event4]
const randomImage = ref(imageOptions[Math.floor(Math.random() * imageOptions.length)])
</script>


<template>
  <router-link
    :to="`/events/${id}`"
    class="block bg-white rounded-lg overflow-hidden shadow transform transition-transform duration-300 hover:scale-[1.06]"
  >
    <img :src="image || randomImage" alt="Event" class="w-full h-40 object-cover" />

    <div class="p-4 space-y-1">
      <p class="text-xs text-blue-500 uppercase font-semibold tracking-wider">{{ category }}</p>
      <h3 class="font-semibold text-gray-800 text-sm truncate">{{ name }}</h3>
      <p class="text-xs text-gray-600 truncate">{{ description }}</p>

      <div class="flex items-center justify-between text-sm mt-2">
        <div>
          🎟 General: <span class="text-blue-500 font-semibold">${{ generalPrice }}</span>
        </div>
        <div>
          ⭐ VIP: <span class="text-yellow-600 font-semibold">${{ vipPrice }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>
