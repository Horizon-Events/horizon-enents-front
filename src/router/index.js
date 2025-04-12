import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/DashBody.vue'
import EventsPage from '../components/EventsBody.vue'
import RegisterPage from '../components/RegisterBody.vue'
import LoginPage from '../components/LoginBody.vue'
import EventDetail from '../components/EventDetail.vue'
import HostLogin from '../components/HostLogin.vue'
import HostSign from '../components/HostSign.vue'
import HostBody from '../components/HostBody.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/events', component: EventsPage },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  {
    path: '/events/:id',
    name: 'EventDetail',
    component: EventDetail,
    props: true
  },
  { path: '/host-login', component: HostLogin },
  { path: '/host-signup', component: HostSign },
  { path: '/host-dashboard', component: HostBody }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
