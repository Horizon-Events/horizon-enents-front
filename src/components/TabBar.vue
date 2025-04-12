<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const logout = () => {
  authStore.clearUser()
  showDropdown.value = false
  router.push('/')
}

const account = () => {
  console.log(authStore.user)
}

const goHome = () => {
  const user = authStore.user
console.log("hi")
  if (user?.role === 'host') {
    router.push('/host-dashboard')
  } else {
    router.push('/')
  }
}


</script>
<template>
  <div class="bg-gray-100">
    <nav class="bg-white shadow-lg h-16 relative z-10">
      <div class="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4">

        <div class="flex space-x-8">
          <a
            @click.prevent="goHome"
            class="text-sm font-medium pb-2 cursor-pointer"
            :class="route.path === '/' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700 hover:text-blue-500'"
          >
            HOMEPAGE
          </a>


          <router-link
            to="/events"
            :class="['text-sm font-medium pb-2', route.path === '/events' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700 hover:text-blue-500']"
          >EVENTS</router-link>

          <router-link
            to="/help"
            :class="['text-sm font-medium pb-2', route.path === '/help' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700 hover:text-blue-500']"
          >HELP</router-link>
        </div>

        <div v-if="authStore.user" class="relative" @click="toggleDropdown">
          <button class="flex items-center space-x-2 text-gray-600 hover:text-gray-800 cursor-pointer">
            <span>{{ authStore.user.email || 'User' }}</span>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>

          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-20"
          >
          <button @click="account" class="w-full text-left px-4 py-2 text-sm text-black-600 hover:bg-gray-100">Account</button>
            <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
          </div>
        </div>

        <router-link
          v-else
          to="/login"
          class="bg-sky-300 hover:bg-sky-400 text-white text-sm px-9 py-1.5 rounded shadow transition"
        >
          Login
        </router-link>
      </div>
    </nav>
  </div>
</template>
