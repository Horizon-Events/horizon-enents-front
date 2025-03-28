<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const eventId = route.params.id

</script>

<template>
  <div class="bg-gray-100 py-6 px-4">
    <div class="max-w-screen-xl mx-auto px-4">
      <div class="mb-4 relative">
        <img src="../assets/event.png" class="w-full h-46 object-cover rounded shadow" />
        <div class="absolute bottom-4 left-4 text-white">
          <h1 class="text-lg font-bold">Illawarra Sunset Soiree</h1>
          <p>Hosted by: Wollongong Council</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 bg-white p-4 rounded shadow">
          <h2 class="text-lg font-semibold mb-2">Description</h2>
          <p class="text-sm mb-4">
            Step into a glowing wonderland by the sea...
          </p>
          <h3 class="font-semibold mb-2">Event Highlights</h3>
          <ul class="list-disc ml-5 text-sm space-y-2">
            <li><strong>🌅 Scenic Sunset:</strong> Experience golden hour along the foreshore.</li>
            <li><strong>🎶 Live Entertainment:</strong> Chill vibes with local bands & musicians.</li>
            <li><strong>🛍️ Market:</strong> Artisan goods and street food.</li>
            <li><strong>👨‍👩‍👧 Family Fun:</strong> Safe play zones, bubble shows, etc.</li>
          </ul>
        </div>

        <div class="space-y-4">
          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-semibold text-md mb-2">Tickets</h3>
            <ul class="text-sm space-y-1">
              <li><strong>General:</strong> $15</li>
              <li><strong>Concession:</strong> $10</li>
              <li><strong>Under 12:</strong> Free</li>
              <li><strong>Group Bundle (5):</strong> $60</li>
            </ul>
            <button class="mt-4 w-full bg-sky-300 text-white py-2 rounded hover:bg-sky-400">
              Book Here
            </button>
          </div>

          <div class="bg-white p-4 rounded shadow text-sm">
            <p><strong>📍 Location:</strong> Wollongong Foreshore Park</p>
            <p><strong>📅 Date:</strong> April 20, 2025</p>
            <p><strong>🕔 Time:</strong> 5:00 PM – 9:30 PM</p>
            <p><strong>☁️ Weather:</strong> Outdoor event – bring a jacket</p>
            <p><strong>🚗 Parking:</strong> Lang Park Carpark</p>
            <p><strong>♿ Accessibility:</strong> Wheelchair-friendly</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
