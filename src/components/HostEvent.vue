<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const event = ref(null)
const error = ref('')
const isEditing = ref(false)
const message = ref('')

const fetchEvent = async () => {
  try {
    const eventId = route.params.id
    const response = await axios.get(`http://localhost:3000/events/event/${eventId}`)
    event.value = response.data.event
    console.log(event)
  } catch (err) {
    error.value = 'Failed to load event details.'
    console.error(err)
  }
}

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const saveChanges = async () => {
  try {
    await axios.put(`http://localhost:3000/events/${event.value.id}`, event.value)
    message.value = 'Event updated successfully!'
    isEditing.value = false
  } catch (err) {
    message.value = 'Failed to update event.'
    console.error(err)
  }
}

const updateStatus = async (ticketId, newStatus) => {
  try {
    
    await axios.put(`http://localhost:3000/tickets/${ticketId}`, {
      status: newStatus
    })

    const { data: ticketRes } = await axios.get(`http://localhost:3000/tickets/${ticketId}`)
    const { user_id, event_id } = ticketRes.ticket


    await axios.post(`http://localhost:3000/notifications/user`, {
      event_id,
      user_id,
      description: `Your booking for ${event.value.name} has been ${newStatus} by the host.`
    })


    await fetchEvent()

  } catch (err) {
    console.error('Failed to update status or send notification', err)
  }
}


const cancelEvent = async () => {
  try {
    const confirmCancel = confirm(`Are you sure you want to cancel the event "${event.value.name}"?`)
    if (!confirmCancel) return

    await axios.post(`http://localhost:3000/notifications/all`, {
      event_id: event.value.id,
      description: `The event "${event.value.name}" has been cancelled by the host. A refund has been initiated.`
    })

    await axios.delete(`http://localhost:3000/events/${event.value.id}`)

    message.value = 'Event cancelled and notifications sent.'
    router.push('/host-dashboard')

  } catch (err) {
    console.error('Failed to cancel event or send notifications:', err)
    message.value = 'Failed to cancel event or notify attendees.'
  }
}

const sendReminder = async () => {
  try {
    await axios.post(`http://localhost:3000/notifications/all`, {
      event_id: event.value.id,
      description: `Reminder: The event "${event.value.name}" is coming up soon! Please check your ticket and venue details.`
    })

    message.value = 'Reminder notification sent to all attendees.'
  } catch (err) {
    console.error('Failed to send reminder notification:', err)
    message.value = 'Failed to send reminder.'
  }
}

onMounted(fetchEvent)
</script>

<template>
  <div class="max-w-screen-xl mx-auto px-4 py-8">
    <div v-if="event" class="space-y-8">
      <div class="relative">
        <img src="../assets/event.png" class="w-full h-64 object-cover rounded-lg" />
        <div class="absolute top-4 right-4 flex gap-2">
          <button @click="toggleEdit" class="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
            {{ isEditing ? 'Cancel' : 'Edit Event' }}
          </button>
          <button @click="cancelEvent" class="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700">
            Cancel Event
          </button>
        </div>

        <div class="absolute bottom-4 right-4">
          <button
            @click="sendReminder"
            class="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 text-sm"
          >
            Send Reminder
          </button>
        </div>


      </div>

      <div>
        <h1 class="text-3xl font-bold">
          <span v-if="!isEditing">{{ event.name }}</span>
          <input v-else v-model="event.name" class="border p-2 w-full text-xl" />
        </h1>
        <p class="text-gray-600">Hosted by You</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-4">
          <h2 class="text-xl font-semibold">Description</h2>
          <div v-if="isEditing">
            <textarea v-model="event.description" class="w-full border rounded p-2 h-28" />
          </div>
          <p v-else class="text-gray-700 whitespace-pre-line">{{ event.description }}</p>

          <h3 class="text-lg font-semibold mt-6">Accessibility & Features</h3>
          <div v-if="isEditing" class="flex flex-col gap-2 text-sm">
            <label><input type="checkbox" v-model="event.accessible" /> Wheelchair Access</label>
            <label><input type="checkbox" v-model="event.outdoor" /> Outdoor Event</label>
            <label><input type="checkbox" v-model="event.parking" /> Parking Available</label>
          </div>
          <ul v-else class="text-sm text-gray-600 space-y-1">
            <li>Wheelchair Access: <strong>{{ event.accessible ? 'Yes' : 'No' }}</strong></li>
            <li>Outdoor Event: <strong>{{ event.outdoor ? 'Yes' : 'No' }}</strong></li>
            <li>Parking Available: <strong>{{ event.parking ? 'Yes' : 'No' }}</strong></li>
          </ul>
        </div>

        <div class="space-y-4">
          <div class="bg-white p-4 rounded shadow">
            <h3 class="text-lg font-semibold mb-2">Tickets</h3>
            <div v-if="isEditing" class="space-y-2 text-sm">
              <label>General Price: <input type="number" v-model="event.general_price" class="border p-1 w-full" /></label>
              <label>General Quantity: <input type="number" v-model="event.general_quantity" class="border p-1 w-full" /></label>
              <label>VIP Price: <input type="number" v-model="event.vip_price" class="border p-1 w-full" /></label>
              <label>VIP Quantity: <input type="number" v-model="event.vip_quantity" class="border p-1 w-full" /></label>
            </div>
            <ul v-else class="text-sm text-gray-700">
              <li>General: ${{ event.general_price }} ({{ event.general_quantity }} available)</li>
              <li>VIP: ${{ event.vip_price }} ({{ event.vip_quantity }} available)</li>
            </ul>
          </div>

          <div class="bg-white p-4 rounded shadow">
            <h3 class="text-lg font-semibold mb-2">Details</h3>
            <div v-if="isEditing" class="space-y-2 text-sm">
              <label>Venue: <input v-model="event.venue" class="border p-1 w-full" /></label>
              <label>Start Date: <input type="date" v-model="event.start_date" class="border p-1 w-full" /></label>
              <label>End Date: <input type="date" v-model="event.end_date" class="border p-1 w-full" /></label>
            </div>
            <div v-else class="text-sm text-gray-700">
              <p>{{ event.venue }}</p>
              <p>{{ event.start_date }} to {{ event.end_date }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border border-blue-300 rounded shadow mt-10 overflow-auto">
        <div class="bg-blue-50 border-b border-blue-200 px-4 py-2 font-semibold text-gray-700">
          Attendees for the event:
        </div>
        <table class="min-w-full text-sm text-left text-gray-700">
          <thead class="bg-blue-100 text-gray-700 uppercase">
            <tr>
              <th class="px-4 py-2">S.no</th>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Type</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(attendee, index) in event.attendees"
              :key="index"
              :class="index % 2 === 0 ? 'bg-gray-100' : ''"
            >
              <td class="px-4 py-2">{{ index + 1 }}</td>
              <td class="px-4 py-2">{{ attendee.name }}</td>
              <td class="px-4 py-2">{{ attendee.type }}</td>
              <td class="px-4 py-2">{{ attendee.email }}</td>
              <td class="px-4 py-2">
              <div class="flex items-center gap-2">
                <span
                  :class="{
                    'text-green-600 font-semibold': attendee.status === 'confirmed',
                    'text-red-600 font-semibold': attendee.status === 'rejected',
                    'text-yellow-600 font-semibold': attendee.status === 'pending'
                  }"
                >
                  {{ attendee.status }}
                </span>
                <button
                  @click="updateStatus(attendee.id, 'confirmed')"
                  class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs"
                >
                  Confirm
                </button>
                <button
                  @click="updateStatus(attendee.id, 'rejected')"
                  class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                >
                  Reject
                </button>
              </div>
            </td>

            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="isEditing" class="text-right mt-4">
        <button
          @click="saveChanges"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
        <p class="text-green-600 mt-2">{{ message }}</p>
      </div>
    </div>

    <div v-else-if="error" class="text-red-600 text-center py-8">{{ error }}</div>
    <div v-else class="text-gray-500 text-center py-8">Loading event...</div>
  </div>
</template>
