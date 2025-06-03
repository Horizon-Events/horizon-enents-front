<template>
  <div
    class="bg-white rounded-lg shadow hover:shadow-lg transform transition duration-200 hover:scale-105 cursor-pointer"
    @click="$emit('click')"
  >
    <img :src="image" alt="Event Image" class="w-full h-40 object-cover rounded-t-lg" />
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
      <p class="text-sm text-gray-600">{{ price }}</p>
      <p class="text-xs text-gray-400 mt-1">{{ attendees }} attendees</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['title', 'price', 'image', 'attendees'])
</script>
