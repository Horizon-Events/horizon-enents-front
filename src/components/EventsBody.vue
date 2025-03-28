<script setup>
import eventImg from '../assets/event.png'

const events = [
  {
    title: 'Illawarra Sunset Soiree',
    status: 'green',
    description: 'A magical evening under the lanterns with live music and food.',
    id: 1
  },
  {
    title: 'Illawarra Sunset Soiree',
    status: 'green',
    description: 'Join us for a coastal sunset celebration with a vibrant crowd.',
    id: 2
  },
  {
    title: 'Illawarra Sunset Soiree',
    status: 'green',
    description: 'Celebrate the sunset with performances and outdoor dining.',
    id: 3
  },
  {
    title: 'Illawarra Sunset Soiree',
    status: 'yellow',
    description: 'Limited seats available. Book soon for the twilight vibes.',
    id: 4
  },
  {
    title: 'Illawarra Sunset Soiree',
    status: 'yellow',
    description: 'Get ready for sunset photography, music and good company.',
    id: 5
  },
  {
    title: 'Illawarra Sunset Soiree',
    status: 'green',
    description: 'Sunset festival featuring lights, dancing, and local food trucks.',
    id: 6
  },
  {
    title: 'Illawarra Sunset Soiree',
    status: 'red',
    description: 'This event is currently sold out, stay tuned for next one.',
    id: 7
  },
  {
    title: 'Illawarra Sunset Soiree',
    status: 'red',
    description: 'Fully booked. You can register for waitlist or future updates.',
    id: 8
  },
  {
    title: 'Illawarra Sunset Soiree',
    status: 'yellow',
    description: 'A twilight market and music event at the bay.',
    id: 9
  }
]
</script>

<template>
  <div class="bg-gray-100 py-6 px-4">
    <div class="max-w-screen-xl mx-auto px-4 space-y-6">

      <div class="bg-white p-4 rounded shadow">
        <div class="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search here..."
            class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-blue-400"
          />
          <button class="text-gray-500 text-xl">🔍</button>
        </div>

        <div class="flex flex-wrap gap-4 text-sm">
          <div class="text-gray-700 font-semibold">Filters</div>
          <button class="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Category: All ⏷</button>
          <button class="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Type: All ⏷</button>
          <button class="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Date: All ⏷</button>
        </div>
      </div>

      <button class="bg-gray-200 text-gray-700 px-4 py-1 rounded font-semibold">
        Recent Events
      </button>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        <router-link
            v-for="(event, i) in events"
            :key="i"
            :to="`/events/${event.id}`"
            class="relative group bg-white rounded shadow overflow-hidden cursor-pointer block"
            >
            <div class="relative">
                <img :src="eventImg" alt="Event Image" class="w-full h-36 object-cover" />
                <div
                class="absolute top-2 right-2 w-3 h-3 rounded-full"
                :class="{
                    'bg-green-500': event.status === 'green',
                    'bg-yellow-400': event.status === 'yellow',
                    'bg-red-500': event.status === 'red'
                }"
                ></div>
                <div
                class="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-xs px-4 text-center opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                >
                {{ event.description }}
                </div>
            </div>

            <div class="px-4 py-2">
                <p class="text-xs font-bold text-center border-b pb-1">EVENTS</p>
                <h3 class="text-center text-sm font-medium mt-2">
                {{ event.title }}
                </h3>
            </div>
            </router-link>

      </div>
    </div>
  </div>
</template>
