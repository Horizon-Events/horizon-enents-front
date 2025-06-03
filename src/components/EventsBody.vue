<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import EventCard from '../components/EventComp.vue'

const events = ref([])
const error = ref('')

const search = ref('')
const selectedCategory = ref('All')
const selectedDate = ref('All')

const fetchEvents = async () => {
  try {
    const response = await axios.get('http://localhost:3000/events')
    events.value = response.data.events
  } catch (err) {
    console.error('Failed to fetch events:', err)
    error.value = 'Could not load events.'
  }
}

onMounted(fetchEvents)

const filteredEvents = computed(() => {
  return events.value.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory =
      selectedCategory.value === 'All' || event.category === selectedCategory.value
    const matchesDate =
      selectedDate.value === 'All' ||
      new Date(event.start_date).toDateString() === selectedDate.value
    return matchesSearch && matchesCategory && matchesDate
  })
})

const uniqueCategories = computed(() =>
  Array.from(new Set(events.value.map(e => e.category)))
)
const uniqueDates = computed(() =>
  Array.from(new Set(events.value.map(e => new Date(e.start_date).toDateString())))
)
</script>

<template>
  <div class="bg-gray-100 py-6 px-4">
    <div class="max-w-screen-xl mx-auto px-4 space-y-6">
      <div class="bg-white p-4 rounded shadow">
        <div class="flex items-center gap-4 mb-4">
          <input
            v-model="search"
            type="text"
            placeholder="Search here..."
            class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-blue-400"
          />
          <button class="text-gray-500 text-xl">🔍</button>
        </div>

        <div class="flex flex-wrap gap-4 text-sm">
          <div class="text-gray-700 font-semibold">Filters</div>

          <button
            @click="selectedCategory = 'All'"
            :class="{ 'bg-blue-100': selectedCategory === 'All' }"
            class="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
          >
            Category: All
          </button>
          <button
            v-for="category in uniqueCategories"
            :key="category"
            @click="selectedCategory = category"
            :class="{ 'bg-blue-100': selectedCategory === category }"
            class="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
          >
            {{ category }}
          </button>

          <select
            v-model="selectedDate"
            class="bg-gray-100 px-3 py-1 rounded border border-gray-300"
          >
            <option>All</option>
            <option v-for="date in uniqueDates" :key="date">{{ date }}</option>
          </select>
        </div>
      </div>

      <button class="bg-gray-200 text-gray-700 px-4 py-1 rounded font-semibold">
        Recent Events
      </button>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <EventCard
          v-for="event in filteredEvents"
          :key="event.id"
          :id="event.id"
          :name="event.name"
          :description="event.description"
          :category="event.category"
          :generalPrice="event.general_price"
          :vipPrice="event.vip_price"
          :image="event.image"
        />
      </div>

      <p v-if="error" class="text-red-600 text-center mt-6">{{ error }}</p>
    </div>
  </div>
</template>
