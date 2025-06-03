<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

import { useAuthStore } from '../stores/auth' 
import { useRouter } from 'vue-router'


const authStore = useAuthStore()
const router = useRouter()

const event = reactive({
  name: '',
  category: '',
  gender: '',
  startDate: '',
  endDate: '',
  venue: '',
  generalPrice: '',
  generalQuantity: '',
  vipPrice: '',
  vipQuantity: '',
  accessible: false,
  outdoor: false,
  parking: false
})

const message = ref('')

const submitEvent = async () => {
  message.value = ''
  try {

    const eventWithOrganizer = {
      ...event,
      organizerId: authStore.user?.uid
    }

    const response = await axios.post('http://localhost:3000/events', eventWithOrganizer)
    message.value = 'Event created successfully!'
    console.log(response.data)
    router.push('/host-dashboard')
  } catch (error) {
    message.value = error.response?.data?.message || 'Something went wrong'
    console.error(error)
  }
}

const backToDash = () => {
 router.push('/host-dashboard')
}

</script>




<template>
  <div class="max-w-screen-xl mx-auto px-4 py-8">
    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-1">Basic Event Information</h2>
      <p class="text-sm text-gray-500 mb-4">Please set your Personal profile</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block mb-1">Event Name</label>
          <input
            v-model="event.name"
            type="text"
            placeholder="Event Name Here"
            class="w-full border border-gray-300 rounded px-4 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label class="block mb-1">Category Name</label>
          <select
            v-model="event.category"
            class="w-full border border-gray-300 rounded px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
            <option value="" disabled selected>Select a category</option>
            <option value="sports">Sports</option>
            <option value="art">Art</option>
            <option value="music">Music</option>
            <option value="technology">Technology</option>
            <option value="seasonal">Seasonal</option>
            </select>

        </div>
        <div class="md:col-span-2">
          <label class="block mb-1">Description</label>
          <textarea
            v-model="event.gender"
            placeholder="Event Description Here"
            class="w-full border border-gray-300 rounded px-4 py-2 h-32 resize-none bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-1">Date & Time</h2>
      <p class="text-sm text-gray-500 mb-4">Please set your Personal profile</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block mb-1">Start Date</label>
          <input
            v-model="event.startDate"
            type="date"
            class="w-full border border-gray-300 rounded px-4 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label class="block mb-1">End Date</label>
          <input
            v-model="event.endDate"
            type="date"
            class="w-full border border-gray-300 rounded px-4 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-1">Venue & Location</h2>
      <p class="text-sm text-gray-500 mb-4">Enter the venue name and address</p>
      <div>
        <label class="block mb-1">Venue & Location</label>
        <input
          v-model="event.venue"
          type="text"
          placeholder="e.g. Wollongong Town Hall, NSW"
          class="w-full border border-gray-300 rounded px-4 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </section>


    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-1">Ticketing</h2>
      <p class="text-sm text-gray-500 mb-4">Set ticket types and availability</p>

      <h3 class="text-lg font-semibold mb-2">General Ticket</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label class="block mb-1">General Ticket Price</label>
          <input
            v-model="event.generalPrice"
            type="number"
            placeholder="e.g. 30"
            class="w-full border border-gray-300 rounded px-4 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label class="block mb-1">General Ticket Quantity</label>
          <input
            v-model="event.generalQuantity"
            type="number"
            placeholder="e.g. 100"
            class="w-full border border-gray-300 rounded px-4 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <h3 class="text-lg font-semibold mb-2">VIP Ticket</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block mb-1">VIP Ticket Price</label>
          <input
            v-model="event.vipPrice"
            type="number"
            placeholder="e.g. 80"
            class="w-full border border-gray-300 rounded px-4 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label class="block mb-1">VIP Ticket Quantity</label>
          <input
            v-model="event.vipQuantity"
            type="number"
            placeholder="e.g. 30"
            class="w-full border border-gray-300 rounded px-4 py-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-1">Additional Event Features</h2>
      <p class="text-sm text-gray-500 mb-4">Select applicable options</p>

      <div class="flex flex-col gap-2">
        <label class="inline-flex items-center">
          <input type="checkbox" v-model="event.accessible" class="mr-2" />
          Wheelchair Accessible
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" v-model="event.outdoor" class="mr-2" />
          Outdoor Event
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" v-model="event.parking" class="mr-2" />
          Parking Available
        </label>
      </div>
    </section>



    <div class="flex justify-end gap-4">
      <button
        @click="backToDash"
        class="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
      >
        Back
      </button>
      <button
        @click="submitEvent"
        class="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
      Submit
    </button>
    </div>
  </div>
</template>
