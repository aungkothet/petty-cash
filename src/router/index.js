import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AddStatement from '../views/AddStatement.vue'
import MonthlyUsage from '../views/MonthlyUsage.vue'
import AddUsage from '../views/AddUsage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/add-statement',
      name: 'add-statement',
      component: AddStatement
    },
    {
      path: '/monthly-usage',
      name: 'monthly-usage',
      component: MonthlyUsage
    },
    {
      path: '/add-usage',
      name: 'add-usage',
      component: AddUsage
    },
  ]
})

export default router
