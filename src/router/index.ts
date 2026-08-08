import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/views/HomeView.vue')
    },
    {
      path: '/station/:stationCode',
      name: 'station',
      component: () => import('../components/views/StationView.vue'),
    },
  ],
})

export default router
