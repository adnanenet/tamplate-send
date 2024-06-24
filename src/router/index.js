import { createRouter, createWebHistory } from 'vue-router'
import SendPage from '../views/SendPage.vue'
import cvTmplate from '../views/cvTmplate.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cv',
      component: cvTmplate
    },
    {
      path: '/go',
      name: 'go',
      component: SendPage
    },
  ]

})

export default router
