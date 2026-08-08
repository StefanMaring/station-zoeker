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
      path: '/departures',
      name: 'departures',
      component: () => import('../components/views/StationDeparturesView.vue'),
    },
  ],
})

export default router
