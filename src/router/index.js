import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/DashBody.vue'
import EventsPage from '../components/EventsBody.vue'
import RegisterPage from '../components/RegisterBody.vue'
import LoginPage from '../components/LoginBody.vue'
import EventDetail from '../components/EventDetail.vue'
import HostLogin from '../components/HostLogin.vue'
import HostSign from '../components/HostSign.vue'
import HostBody from '../components/HostBody.vue'
import HostEvent from '../components/HostEvent.vue'
import EventForm from '../components/EventForm.vue'
import Booking from '../components/Booking.vue'
import MockPayment from '../components/MockPayment.vue'
import PaymentSuccess from '../components/PaymentSuccess.vue'
import UserDash from '../components/UserDash.vue'
import Reports from '../components/Reports.vue'


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
  { path: '/host-dashboard', component: HostBody },
  { path: '/create-event', component: EventForm },
  { path: '/host-event/:id', component: HostEvent },
  { path: '/book-tickets/:id', component: Booking },
  { path: '/payment/:eventId', name: 'MockPayment', component: MockPayment},
  { path: '/payment-success', name: 'PaymentSuccess', component: PaymentSuccess },
  { path: '/user-dashboard', component: UserDash },
  { path: '/reports', component: Reports }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
