<script setup>
import { ref, onMounted, computed } from 'vue'
import EventCard from './EventCard.vue'
import eventImg from '../assets/event.png'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()

const events = ref([])
const message = ref('')

const goToCreateEvent = () => {
  router.push('/create-event')
}

const fetchHostEvents = async () => {
  try {
    const organizerId = authStore.user?.uid
    if (!organizerId) {
      message.value = 'User not logged in'
      return
    }

    const response = await axios.get(`http://localhost:3000/events/${organizerId}`)
    events.value = response.data.events
  } catch (error) {
    message.value = 'Failed to load events'
    console.error(error)
  }
}

onMounted(fetchHostEvents)

const goToEvent = (eventId) => {
  router.push(`/host-event/${eventId}`)
}

const activeEvents = computed(() =>
  events.value.filter(e => new Date(e.end_date) > new Date())
)

const totalEvents = computed(() => events.value.length)
</script>


<template>
  <div class="max-w-screen-xl mx-auto px-4 py-8">
    <div class="max-w-6xl mx-auto text-center mb-10">
      <h1 class="text-3xl font-bold">
        Welcome back, {{ authStore.user?.full_name || authStore.user?.email || 'Organizer' }}!
      </h1>
      <p class="text-gray-500">Here is your organizer dashboard</p>
    </div>

    <div class="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
      <div class="bg-white rounded-lg shadow p-6 text-center border border-blue-100">
        <h2 class="text-4xl font-bold text-blue-600">{{ activeEvents.length }}</h2>
        <p class="text-sm text-gray-600 mt-2">Active Events</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6 text-center border border-green-100">
        <h2 class="text-4xl font-bold text-green-600">{{ totalEvents }}</h2>
        <p class="text-sm text-gray-600 mt-2">Total Events Hosted</p>
      </div>
    </div>

    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-semibold text-gray-800">Your Events</h2>
          <p class="text-sm text-gray-500">Manage and view your hosted events</p>
        </div>
        <button
          @click="goToCreateEvent"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Create New Event
        </button>
      </div>

      <div v-if="events.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <EventCard
          v-for="(event, index) in events"
          :key="index"
          :title="event.name"
          :price="`$${event.general_price}`"
          :image="event.image || eventImg"
          :attendees="event.attendees || 0"
          @click="() => goToEvent(event.id)"
        />
      </div>

      <p v-else class="text-center text-gray-500 text-sm">No events created yet.</p>
      <p v-if="message" class="text-red-500 text-center mt-4">{{ message }}</p>
      
    </div>
  </div>
</template>
