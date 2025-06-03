<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

import eventDefault from '../assets/event.png'
import event1 from '../assets/event1.jpg'
import event2 from '../assets/event2.jpg'
import event3 from '../assets/event3.jpg'
import event4 from '../assets/event4.jpg'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const event = ref(null)
const error = ref('')
const userHasBooking = ref(false)

const images = [eventDefault, event1, event2, event3, event4]

const fetchEvent = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/events/event/${route.params.id}`)
    const evt = res.data.event
    evt.image = images[Math.floor(Math.random() * images.length)]
    event.value = evt

    if (auth.user?.uid && evt.attendees?.length) {
      userHasBooking.value = evt.attendees.some(u => u.email === auth.user.email)
      console.log(evt.attendees)
    }
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load event.'
  }
}

const bookTicket = () => {
  router.push({ path: `/book-tickets/${event.value.id}` })
}


const cancelBooking = async (ticketId) => {
  if (!confirm('Are you sure you want to cancel your booking?')) return;

  try {
    console.log(ticketId)
    await axios.delete(`http://localhost:3000/tickets/${ticketId}`);
    userHasBooking.value = false;
    message.value = 'Your booking has been cancelled.';
  } catch (err) {
    console.error('Failed to cancel booking:', err);
    message.value = 'Failed to cancel booking.';
  }
};


onMounted(fetchEvent)
</script>

<template>
  <div class="bg-gray-100 py-6 px-4 min-h-screen">
    <div class="max-w-screen-xl mx-auto">

      <div v-if="event" class="mb-6 relative">
        <img :src="event.image" class="w-full h-64 object-cover rounded shadow" />
        <div class="absolute bottom-4 left-4 text-white bg-black/60 p-3 rounded">
          <h1 class="text-2xl font-bold">{{ event.name }}</h1>
          <p class="text-sm">Hosted by: {{ event.organizer || 'Organizer' }}</p>
        </div>
      </div>


      <div v-if="event" class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div class="md:col-span-2 bg-white p-4 rounded shadow space-y-4">
          <h2 class="text-lg font-semibold">Description</h2>
          <p class="text-sm text-gray-700 whitespace-pre-line">{{ event.description }}</p>
        </div>

        <div class="space-y-4">

          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-semibold text-md mb-2">Tickets</h3>
            <ul class="text-sm space-y-1">
              <li><strong>General:</strong> ${{ event.general_price }}</li>
              <li><strong>VIP:</strong> ${{ event.vip_price }}</li>
              <li><strong>Quantity (Gen):</strong> {{ event.general_quantity }}</li>
              <li><strong>Quantity (VIP):</strong> {{ event.vip_quantity }}</li>
            </ul>


            <div class="mt-4">
              <button
                v-if="auth.user && userHasBooking"
                @click="cancelBooking(
                  event.attendees.find(a => a.email === auth.user.email)?.id
                )"
                class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded text-center"
              >
                Cancel Booking
              </button>

              <button
                v-else-if="auth.user"
                @click="bookTicket"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-center"
              >
                Book Ticket
              </button>

              <p v-else class="text-sm text-gray-500 italic text-center mt-2">
                Please log in to book tickets.
              </p>
            </div>
          </div>


          <div class="bg-white p-4 rounded shadow text-sm space-y-2">
            <h3 class="font-semibold text-md mb-2">Event Info</h3>
            <ul class="space-y-1">
              <li><strong>Event ID:</strong> #{{ event.id }}</li>
              <li><strong>Organizer ID:</strong> {{ event.organizer_id }}</li>
              <li><strong>📅 Start:</strong> {{ new Date(event.start_date).toLocaleString() }}</li>
              <li><strong>📅 End:</strong> {{ new Date(event.end_date).toLocaleString() }}</li>
              <li><strong>📍 Venue:</strong> {{ event.venue || 'TBA' }}</li>
              <li><strong>🏷 Category:</strong> {{ event.category }}</li>
              <li><strong>♿ Accessible:</strong> {{ event.accessible ? 'Yes' : 'No' }}</li>
              <li><strong>🌳 Outdoor:</strong> {{ event.outdoor ? 'Yes' : 'No' }}</li>
              <li><strong>🚗 Parking:</strong> {{ event.parking ? 'Available' : 'Not specified' }}</li>
            </ul>
          </div>
        </div>
      </div>

      <p v-if="error" class="text-red-500 text-center mt-6">{{ error }}</p>
    </div>
  </div>
</template>
