<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const goHome = () => {
  router.push('/user-dashboard')
}
</script>

<template>
  <div class="max-w-md mx-auto mt-20 text-center bg-white p-6 rounded shadow">
    <h1 class="text-2xl font-bold text-green-600 mb-4">✅ Payment Successful!</h1>
    <p class="mb-2">You've successfully booked a <strong>{{ route.query.ticket }}</strong> ticket for <strong>{{ route.query.event }}</strong>.</p>
    <button @click="goHome" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Go to Home
    </button>
  </div>
</template>
