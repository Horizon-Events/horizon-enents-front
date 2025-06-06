<script setup>
  import { ref, onMounted } from 'vue'
import axios from 'axios'
import clouds from '../assets/clouds.png'
import sunset from '../assets/sunset.png'
import event from '../assets/logo.png'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const activeEventsCount = ref(0)

const fetchActiveEvents = async () => {
  try {
    const res = await axios.get('http://localhost:3000/events')
    const now = new Date()
    activeEventsCount.value = res.data.events.filter(e => new Date(e.end_date) > now).length
  } catch (err) {
    console.error('Failed to fetch events:', err)
  }
}

onMounted(fetchActiveEvents)


</script>

<template>
  <div class="w-full h-[40px] bg-[#221700] flex items-center justify-end pr-4">
    <router-link
      v-if="!authStore.user"
      to="/host-login"
      class="text-white text-sm hover:underline cursor-pointer"
    >
      ➲ Host login
    </router-link>
  </div>

  <div class="relative overflow-hidden h-[150px]">
    <div class="absolute top-0 left-0 w-[200vw] h-full">
      <img :src="sunset" alt="sunset" class="w-screen h-full object-cover" />
    </div>

    <div class="absolute top-0 left-0 w-[200vw] h-full flex animate-cloud-loop">
      <img :src="clouds" alt="Clouds" class="w-screen h-full object-cover" />
      <img :src="clouds" alt="Clouds duplicate" class="w-screen h-full object-cover" />
    </div>

    <div class="relative z-10 h-full">
      <div class="max-w-screen-xl mx-auto px-4 h-full flex items-center justify-between">
        <div class="flex items-center space-x-2 text-white text-2xl font-bold">
          <img :src="event" class="h-16 object-cover rounded" />
        </div>

        <div class="flex flex-col gap-2">
          <div class="bg-[#2e2e2e] text-white text-sm px-13 py-2 rounded shadow">
            {{ activeEventsCount }} Available Events
          </div>
          <router-link
            v-if="!authStore.user"
            to="/register"
            class="bg-green-500 text-white text-sm px-6 py-2 rounded shadow hover:bg-green-600 text-center"
          >
            Register now!
          </router-link>

        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@keyframes cloud-loop {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100vw);
  }
}

.animate-cloud-loop {
  animation: cloud-loop 30s linear infinite;
}
</style>
