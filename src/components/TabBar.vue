<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <nav class="bg-white shadow-sm h-15">
    <div class="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4">
      <div class="flex space-x-8">
        <router-link
          to="/"
          :class="['text-sm font-medium pb-2',
            route.path === '/' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700 hover:text-blue-500'
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

      <div class="text-sm text-gray-600">Ranko ⏷</div>
    </div>
  </nav>
</template>
