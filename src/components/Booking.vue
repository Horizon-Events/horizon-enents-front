<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const eventId = route.params.id

const event = ref(null)
const message = ref('')
const ticketType = ref('')
const paymentLoading = ref(false)

const fetchEvent = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/events/event/${eventId}`)
    event.value = res.data.event
  } catch (err) {
    message.value = 'Failed to load event'
    console.error(err)
  }
}

const submitBooking = async () => {
  if (!ticketType.value) {
    message.value = 'Please select a ticket type.'
    return
  }
  console.log("Going to pay with:", ticketType.value)

  router.push({
    name: 'MockPayment',
    params: { eventId },
    query: { type: ticketType.value }
  })
}



onMounted(fetchEvent)
</script>

<template>
  <div class="max-w-xl mx-auto px-4 py-10">
    <h1 class="text-2xl font-bold mb-4">🎟️ Book Tickets</h1>

    <div v-if="event" class="bg-white shadow p-6 rounded space-y-4">
      <h2 class="text-xl font-semibold">{{ event.name }}</h2>
      <p class="text-gray-500 text-sm">📍 {{ event.venue }} | 📅 {{ new Date(event.start_date).toLocaleDateString() }}</p>
      <p class="text-gray-600 text-sm line-clamp-3">{{ event.description }}</p>

      <div class="mt-4">
        <label class="block font-medium mb-1">Choose One Ticket Type</label>
        <div class="flex gap-4">
          <label class="flex items-center gap-2">
            <input type="radio" value="general" v-model="ticketType" />
            General - ${{ event.general_price }}
          </label>
          <label class="flex items-center gap-2">
            <input type="radio" value="vip" v-model="ticketType" />
            VIP - ${{ event.vip_price }}
          </label>
        </div>
      </div>

      <button
        @click="submitBooking"
        :disabled="paymentLoading"
        class="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {{ paymentLoading ? 'Processing Payment...' : 'Confirm & Pay' }}
      </button>

      <p v-if="message" class="text-sm mt-3 text-green-600 font-medium">{{ message }}</p>
    </div>

    <p v-else class="text-red-500 text-center mt-4">{{ message }}</p>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
