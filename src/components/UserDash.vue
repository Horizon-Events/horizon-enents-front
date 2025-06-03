<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth' 

import eventDefault from '../assets/event.png'
import event1 from '../assets/event1.jpg'
import event2 from '../assets/event2.jpg'
import event3 from '../assets/event3.jpg'
import event4 from '../assets/event4.jpg'

const authStore = useAuthStore()
const bookings = ref([])
const error = ref('')
const events = ref([])
const eventImages = [eventDefault, event1, event2, event3, event4]

const fetchBookings = async () => {
  try {
    console.log(authStore.user.uid)
    const res = await axios.get(`http://localhost:3000/tickets/user/${authStore.user.uid}`)
    bookings.value = res.data.tickets.map(t => ({
      ...t,
      image: eventImages[Math.floor(Math.random() * eventImages.length)]
    }))
  } catch (err) {
    error.value = 'Failed to load bookings'
    console.error(err)
  }
}

const fetchEvents = async () => {
  try {
    const response = await axios.get('http://localhost:3000/events')
    events.value = response.data.events.map(e => ({
      ...e,
      image: eventImages[Math.floor(Math.random() * eventImages.length)]
    }))
  } catch (err) {
    console.error('Failed to fetch events:', err)
    error.value = 'Could not load events.'
  }
}


const newestEvents = computed(() => {
  return [...events.value]
    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    .slice(0, 3)
})

onMounted(async () => {
  if (authStore.user.uid) {
    await fetchBookings()
    await fetchNotifications()
  } else {
    console.warn('User not logged in')
  }

  await fetchEvents()
})

const notifications = ref([])

const fetchNotifications = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/notifications/${authStore.user.uid}`)
    notifications.value = res.data.notifications.map(n => ({
  description: n.description,
  created_at: new Date(n.created_at).toLocaleString()
}))

  } catch (err) {
    console.error('Failed to fetch notifications:', err)
    error.value = 'Could not load notifications.'
  }
}

</script>

<template>
  <div class="bg-gray-100 py-6">
    <div class="max-w-screen-xl mx-auto px-4 space-y-10">
      <div class="bg-blue-200 text-blue-800 text-sm px-4 py-2 rounded shadow">
        <strong>Welcome {{ authStore.full_name }}</strong> – Here are your current bookings.
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2 space-y-8">
        <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold text-gray-700 mb-3">🔔 Notifications</h2>
        <ul
          v-if="notifications.length"
          class="space-y-4 max-h-60 overflow-y-auto pr-2"
        >
          <li
            v-for="(note, i) in notifications"
            :key="i"
            class="text-sm text-gray-700 flex flex-col gap-1"
          >
            <div class="flex gap-2 items-start">
              <span class="text-blue-500 pt-1">•</span>
              <div>
                <p>{{ note.description }}</p>
                <p class="text-xs text-gray-400 italic mt-1">{{ note.created_at }}</p>
              </div>
            </div>
          </li>
        </ul>

        <p v-else class="text-sm text-gray-500 italic">No new notifications.</p>
        </div>


          <section>
            <h2 class="text-xl font-semibold text-gray-700 mb-3">My Bookings</h2>
           <div v-if="bookings.length" class="space-y-4">
            <div v-if="bookings.length" class="space-y-4">
            <router-link
                v-for="ticket in bookings"
                :key="ticket.id"
                :to="`/events/${ticket.event_id}`"
                class="flex items-center bg-white rounded shadow p-4 hover:shadow-lg transition hover:bg-gray-50"
            >
                <img
                :src="ticket.image || eventDefault"
                class="w-32 h-20 object-cover rounded mr-4"
                alt="Event"
                />
                <div class="flex-1 space-y-1">
                <h3 class="text-blue-600 text-lg font-semibold">{{ ticket.event_name }}</h3>
                <p class="text-sm text-gray-700">Type: <strong>{{ ticket.ticket_type.toUpperCase() }}</strong></p>
                <p class="text-sm text-gray-500">Status: {{ ticket.status }}</p>
                <p class="text-xs text-gray-400 italic">
                    Venue: {{ ticket.venue }} | {{ new Date(ticket.start_date).toLocaleDateString() }}
                </p>
                </div>
            </router-link>
            </div>

            </div>

            <p v-else class="text-gray-600 italic text-sm">You haven’t booked any events yet.</p>
          </section>
        </div>

        <aside class="space-y-6">
          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-semibold text-gray-700 text-lg mb-3">Newest Events</h3>
            <div class="space-y-6">
              <router-link
                v-for="event in newestEvents"
                :key="event.id"
                :to="`/events/${event.id}`"
                class="block rounded shadow hover:shadow-lg transition overflow-hidden"
              >
                <img :src="event.image || eventDefault" class="w-full h-28 object-cover" />
                <div class="p-3 space-y-1">
                  <h4 class="text-blue-600 text-sm font-semibold truncate">{{ event.name }}</h4>
                  <p class="text-xs text-gray-600 truncate">{{ event.description }}</p>
                  <div class="flex justify-between text-xs text-gray-500">
                    <span>{{ event.venue }}</span>
                    <span>{{ new Date(event.start_date).toLocaleDateString() }}</span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </aside>
      </div>

      <p v-if="error" class="text-red-500 text-center mt-6">{{ error }}</p>
    </div>
  </div>
</template>
