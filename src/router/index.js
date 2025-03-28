import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/DashBody.vue'
import EventsPage from '../components/EventsBody.vue'
import RegisterPage from '../components/RegisterBody.vue'
import LoginPage from '../components/LoginBody.vue'
import EventDetail from '../components/EventDetail.vue'
import HostLogin from '../components/HostLogin.vue'

const routes = [
  { path: '/horizon-enents-front/', component: HomePage },
  { path: '/horizon-enents-front/events', component: EventsPage },
  { path: '/horizon-enents-front/register', component: RegisterPage },
  { path: '/horizon-enents-front/login', component: LoginPage },
  {
    path: '/horizon-enents-front/events/:id',
    name: 'EventDetail',
    component: EventDetail,
    props: true
  },
  { path: '/horizon-enents-front/host-login', component: HostLogin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
