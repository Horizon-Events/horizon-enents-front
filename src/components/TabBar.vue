<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
  <div class="bg-gray-100">
    <nav class="bg-white shadow-lg h-16 relative z-10">
      <div class="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4">
        <div class="flex space-x-8">
          <router-link
            to="/horizon-enents-front/"
            :class="['text-sm font-medium pb-2',
              route.path === '/horizon-enents-front/' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700 hover:text-blue-500'
            ]"
          >
            HOMEPAGE
          </router-link>

          <router-link
            to="/events"
            :class="['text-sm font-medium pb-2',
              route.path === '/events' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700 hover:text-blue-500'
            ]"
          >
            EVENTS
          </router-link>

          <router-link
            to="/help"
            :class="['text-sm font-medium pb-2',
              route.path === '/help' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700 hover:text-blue-500'
            ]"
          >
            HELP
          </router-link>
        </div>

        <router-link
          to="/login"
          class="bg-sky-300 hover:bg-sky-400 text-white text-sm px-9 py-1.5 rounded shadow transition"
        >
          Login
        </router-link>
      </div>
    </nav>
  </div>
</template>
