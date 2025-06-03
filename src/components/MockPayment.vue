<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const event = ref(null)
const loading = ref(false)
const message = ref('')

const name = ref('')
const cardNumber = ref('')
const expiry = ref('')
const cvv = ref('')

const ticketType = ref(route.query.type || 'general')

const fetchEvent = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/events/event/${route.params.eventId}`)
    event.value = response.data.event
  } catch (err) {
    message.value = 'Event not found'
    console.error(err)
  }
}

const submitPayment = async () => {
  if (!name.value || !cardNumber.value || !expiry.value || !cvv.value) {
    message.value = 'Please fill in all fields'
    return
  }

  loading.value = true
  message.value = ''

  try {
    await new Promise(resolve => setTimeout(resolve, 2000)) 

    await axios.post('http://localhost:3000/tickets', {
      userId: authStore.user.uid,
      eventId: route.params.eventId,
      organizerId: event.value.organizer_id,
      ticketType: ticketType.value
    })

    router.push({
      name: 'PaymentSuccess',
      query: {
        event: event.value.name,
        ticket: ticketType.value
      }
    })
  } catch (err) {
    console.error(err)
    message.value = 'Payment or ticket creation failed.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchEvent)
</script>


<template>
  <div class="max-w-md mx-auto py-10 px-4 bg-white shadow rounded mt-6">
    <h2 class="text-xl font-bold mb-4">Payment for: {{ event?.name }}</h2>
    <p class="text-sm text-gray-500 mb-6">
      Selected Ticket: <strong>{{ ticketType }}</strong>
    </p>

    <form @submit.prevent="submitPayment" class="space-y-4">
      <input v-model="name" type="text" placeholder="Name on Card" class="w-full border px-4 py-2 rounded" />
      <input v-model="cardNumber" type="text" placeholder="Card Number" class="w-full border px-4 py-2 rounded" />
      <div class="flex gap-4">
        <input v-model="expiry" type="text" placeholder="MM/YY" class="w-1/2 border px-4 py-2 rounded" />
        <input v-model="cvv" type="text" placeholder="CVV" class="w-1/2 border px-4 py-2 rounded" />
      </div>

      <button type="submit" :disabled="loading" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        {{ loading ? 'Processing...' : 'Pay Now' }}
      </button>

      <p v-if="message" class="text-red-500 text-center mt-2">{{ message }}</p>
    </form>
  </div>
</template>
