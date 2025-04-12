<script setup>
  import EventCard from './EventCard.vue'
  import eventImg from '../assets/event.png'
  import { useAuthStore } from '../stores/auth' 
  const authStore = useAuthStore()

  const events = [
    {
      title: 'Illawarra Sunset Soiree',
      price: '$50.00',
      image: eventImg,
    },
    {
      title: 'Illawarra Sunset Soiree',
      price: '$49.00',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    },
    {
      title: 'Sunset and Live Music',
      price: '$30.00',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    },
    {
      title: 'Illawarra Drinks and Games Night',
      price: '$109.00',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    },
    {
      title: 'Illawarra Sunset Soiree',
      price: '$109.00',
      image: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56',
    },
    {
      title: 'Illawarra Sunset Soiree',
      price: '$109.00',
      image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2',
    }
  ]
  </script>

<template>
    <div class="min-h-screen bg-gray-50 px-4 py-8">
      <div class="max-w-6xl mx-auto text-center mb-10">
        <h1 class="text-3xl font-bold">
            Welcome back, {{ authStore.user?.displayName || authStore.user?.email || 'Guest' }}!
        </h1>
        <p class="text-gray-500">Here is your dashboard</p>
      </div>
  
      <div class="max-w-4xl mx-auto grid grid-cols-2 gap-6 mb-10">
        <div class="bg-white rounded shadow p-6 text-center">
          <h2 class="text-4xl font-bold text-blue-600">08</h2>
          <p class="text-sm text-gray-600 mt-2">Active Events</p>
        </div>
        <div class="bg-white rounded shadow p-6 text-center">
          <h2 class="text-4xl font-bold text-green-600">23</h2>
          <p class="text-sm text-gray-600 mt-2">Events Attended</p>
        </div>
      </div>
  
      <div class="max-w-6xl mx-auto">
        <h2 class="text-xl font-semibold mb-4">Events Summary</h2>
        <p class="text-sm text-gray-500 mb-6">Lorem ipsum something anything</p>
  
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCard
                v-for="(event, index) in events"
                :key="index"
                :title="event.title"
                :price="event.price"
                :image="event.image"
                :attendees="event.attendees || 123"
            />

        </div>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  </style>
  