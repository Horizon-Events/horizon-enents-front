<script setup>
defineProps({
  title: String,
  price: String,
  image: String,
  attendees: Number,
})
</script>

<template>
  <div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300">
    <img :src="image" alt="Event" class="w-full h-40 object-cover" />
    <div class="p-4 space-y-1">
      <p class="text-xs text-gray-400">Event</p>
      <h3 class="font-semibold text-gray-800 text-sm truncate">{{ title }}</h3>
      <div class="flex items-center justify-between text-sm mt-2">
        <div class="text-blue-500 font-semibold">${{ price }}</div>
        <div class="flex items-center gap-1">
          <img
            v-for="i in 3"
            :key="i"
            src="https://i.pravatar.cc/20?img={{ i }}"
            class="w-5 h-5 rounded-full border"
          />
          <span class="text-xs text-gray-400 ml-1">{{ attendees }}+ users</span>
        </div>
      </div>
    </div>
  </div>
</template>
