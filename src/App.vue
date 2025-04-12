<script setup>
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import TabBar from './components/TabBar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
</script>

<template>
  <div v-if="route.path !== '/horizon-enents-front/host-login' && route.path !== '/horizon-enents-front/host-signup'">
    <Header />
    <TabBar />
    <router-view />
    <Footer />
  </div>

  <div v-else>
    <router-view />
  </div>
</template>
