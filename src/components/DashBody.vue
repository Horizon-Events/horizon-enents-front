<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import eventDefault from '../assets/event.png'
import event1 from '../assets/event1.jpg'
import event2 from '../assets/event2.jpg'
import event3 from '../assets/event3.jpg'
import event4 from '../assets/event4.jpg'
import convert from '../assets/convert.png'

const slideshowImages = [event1, event2, event3, event4, convert]
const currentSlide = ref(0)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slideshowImages.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slideshowImages.length) % slideshowImages.length
}

const currentBanner = computed(() => slideshowImages[currentSlide.value])

const events = ref([])
const error = ref('')
const eventImages = [eventDefault, event1, event2, event3, event4]

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

onMounted(fetchEvents)

const newestEvents = computed(() => {
  return [...events.value]
    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    .slice(0, 4)
})

const popularEvents = computed(() => {
  return [...events.value]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
})
</script>


<template>
  <div class="bg-gray-100 py-6">
    <div class="max-w-screen-xl mx-auto px-4 space-y-10">

      <div class="bg-blue-200 text-blue-800 text-sm px-4 py-2 rounded shadow">
        <strong>Heads up!</strong> Check out upcoming and trending events!
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2 space-y-8">
          <div class="relative rounded overflow-hidden shadow">
            <img :src="currentBanner" alt="Banner" class="w-full h-60 object-cover" />
            <button
              @click="prevSlide"
              class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
            >
              ←
            </button>
            <button
              @click="nextSlide"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
            >
              →
            </button>
          </div>

          <section>
            <h2 class="text-xl font-semibold text-gray-700 mb-3">🔥 Popular Events</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                v-for="event in popularEvents"
                :key="event.id"
                class="bg-white rounded shadow overflow-hidden hover:shadow-lg transition"
              >
                <img :src="event.image || eventDefault" alt="Event Image" class="w-full h-28 object-cover" />
                <div class="p-3 space-y-1">
                  <h3 class="text-blue-600 text-sm font-semibold truncate">{{ event.name }}</h3>
                  <p class="text-xs text-gray-600 truncate">{{ event.description }}</p>
                  <p class="text-xs italic text-gray-400">Category: {{ event.category }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside class="space-y-6">
          <div class="bg-white p-4 rounded shadow">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-semibold text-gray-700 text-lg">🆕 Newest Events</h3>
            </div>

            <div class="space-y-6">
              <router-link
                v-for="event in newestEvents"
                :key="event.id"
                :to="`/events/${event.id}`"
                class="block rounded shadow hover:shadow-lg transition overflow-hidden"
              >
                <img :src="event.image || eventDefault" alt="Event Banner" class="w-full h-28 object-cover" />
                <div class="p-3 space-y-1">
                  <h4 class="text-blue-600 text-sm font-semibold truncate">
                    {{ event.name }}
                  </h4>
                  <p class="text-xs text-gray-600 truncate">{{ event.description }}</p>
                  <div class="flex justify-between text-xs text-gray-500">
                    <span>{{ event.venue || 'Unknown Venue' }}</span>
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
