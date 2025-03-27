import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/DashBody.vue'
import EventsPage from '../components/EventsBody.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/events', component: EventsPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
