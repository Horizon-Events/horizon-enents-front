<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const organizerEvents = ref([])
const expandedEventId = ref(null)
const eventStats = ref({})
const error = ref('')

const fetchOrganizerEvents = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/events/${authStore.user.uid}`)
    organizerEvents.value = res.data.events
  } catch (err) {
    console.error('Failed to fetch organizer events:', err)
    error.value = 'Unable to load your events.'
  }
}

const fetchStats = async (eventId) => {
  try {
    const res = await axios.get(`http://localhost:3000/events/${eventId}/stats`)
    eventStats.value[eventId] = res.data
  } catch (err) {
    console.error(`Failed to fetch stats for event ${eventId}:`, err)
  }
}

const toggleStats = async (eventId) => {
  if (expandedEventId.value === eventId) {
    expandedEventId.value = null
  } else {
    expandedEventId.value = eventId
    if (!eventStats.value[eventId]) {
      await fetchStats(eventId)
    }
  }
}

onMounted(fetchOrganizerEvents)
</script>

<template>
  <div class="max-w-screen-xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Reports - Your Events</h1>

    <div v-if="organizerEvents.length" class="space-y-4">
      <div
        v-for="event in organizerEvents"
        :key="event.id"
        class="bg-white p-4 rounded shadow"
      >
        <div class="flex justify-between items-center cursor-pointer" @click="toggleStats(event.id)">
          <div>
            <h2 class="text-lg font-semibold text-blue-700">{{ event.name }}</h2>
            <p class="text-sm text-gray-600">
              📍 {{ event.venue }} – {{ new Date(event.start_date).toLocaleString() }}
            </p>
          </div>
          <span class="text-sm text-blue-500">
            {{ expandedEventId === event.id ? 'Hide Stats ▲' : 'View Stats ▼' }}
          </span>
        </div>

        <div v-if="expandedEventId === event.id" class="mt-4 bg-gray-50 p-4 rounded border">
          <div v-if="eventStats[event.id]" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><strong>General Tickets Sold:</strong> {{ eventStats[event.id].general_sold }}</div>
            <div><strong>VIP Tickets Sold:</strong> {{ eventStats[event.id].vip_sold }}</div>
            <div><strong>Revenue:</strong> ${{ eventStats[event.id].revenue }}</div>
            <div><strong>Confirmed:</strong> {{ eventStats[event.id].confirmed }}</div>
            <div><strong>Pending:</strong> {{ eventStats[event.id].pending }}</div>
            <div><strong>Rejected:</strong> {{ eventStats[event.id].rejected }}</div>
          </div>
          <p v-else class="text-gray-500">Loading stats...</p>
        </div>
      </div>
    </div>

    <p v-else-if="!error" class="text-gray-500 italic">No events found.</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>
  </div>
</template>
