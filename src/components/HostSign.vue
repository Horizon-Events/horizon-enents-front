<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { hostAuth, hostFirestore } from '../hostfirebase'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const dob = ref('')
const gender = ref('')
const message = ref('')
const router = useRouter()

const registerHost = async () => {
  message.value = ''

  if (!email.value || !password.value || !firstName.value || !lastName.value || !dob.value || !gender.value) {
    message.value = 'Please fill in all fields.'
    return
  }

  if (password.value !== confirmPassword.value) {
    message.value = 'Passwords do not match'
    return
  }

  try {
    console.log(hostAuth.app.name) 
    const result = await createUserWithEmailAndPassword(hostAuth, email.value, password.value)
    const user = result.user

    await setDoc(doc(hostFirestore, 'hosts', user.uid), {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      dob: dob.value,
      gender: gender.value,
      role: 'host',
      createdAt: new Date()
    })

    message.value = 'Host account created!'
    router.push('/horizon-enents-front/host-login')
  } catch (err) {
    message.value = err.message
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
    <router-link
      to="/host-login"
      class="absolute top-4 left-4 text-gray-700 bg-white px-4 py-2 rounded shadow hover:bg-gray-100 transition"
    >
      ← Back
    </router-link>

    <div class="bg-white p-10 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] w-full max-w-lg">
      <h2 class="text-2xl font-semibold mb-6">Create Account</h2>

      <form @submit.prevent="registerHost" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-700 mb-1">First Name</label>
          <input v-model="firstName" type="text" placeholder="John"
            class="w-full px-4 py-2 rounded border border-gray-300 bg-gray-100 focus:outline-blue-400" />
        </div>

        <div>
          <label class="block text-sm text-gray-700 mb-1">Last Name</label>
          <input v-model="lastName" type="text" placeholder="Doe"
            class="w-full px-4 py-2 rounded border border-gray-300 bg-gray-100 focus:outline-blue-400" />
        </div>

        <div>
          <label class="block text-sm text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" placeholder="Example@email.com"
            class="w-full px-4 py-2 rounded border border-gray-300 bg-gray-100 focus:outline-blue-400" />
        </div>

        <div>
          <label class="block text-sm text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" placeholder="At least 8 characters"
            class="w-full px-4 py-2 rounded border border-gray-300 bg-gray-100 focus:outline-blue-400" />
        </div>

        <div>
          <label class="block text-sm text-gray-700 mb-1">Confirm Password</label>
          <input v-model="confirmPassword" type="password" placeholder="Repeat password"
            class="w-full px-4 py-2 rounded border border-gray-300 bg-gray-100 focus:outline-blue-400" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-700 mb-1">Date of Birth</label>
            <div class="relative">
              <input v-model="dob" type="date"
                class="w-full px-4 py-2 rounded border border-gray-300 bg-gray-100 focus:outline-blue-400" />
              <span class="absolute right-4 top-2.5 text-gray-400 pointer-events-none">
                <i class="fa fa-calendar" />
              </span>
            </div>
          </div>

          <div>
            <label class="block text-sm text-gray-700 mb-1">Gender</label>
            <select v-model="gender"
              class="w-full px-4 py-2 rounded border border-gray-300 bg-gray-100 focus:outline-blue-400">
              <option disabled value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <button type="submit"
          class="w-full bg-[#0f1f2e] hover:bg-[#1a2b3d] text-white py-2 rounded shadow mt-2">Sign up</button>
      </form>

      <p v-if="message" class="text-sm text-center text-red-500 mt-4">{{ message }}</p>

      <p class="text-sm text-center text-gray-600 mt-4">
        Already have an account?
        <router-link to="/host-login" class="text-blue-500 hover:underline">Sign in</router-link>
      </p>
    </div>
  </div>
</template>
