import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/DashBody.vue'
import EventsPage from '../components/EventsBody.vue'
import RegisterPage from '../components/RegisterBody.vue'
import LoginPage from '../components/LoginBody.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/events', component: EventsPage },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
