import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AddStatement from '../views/AddStatement.vue'
import MonthlyUsage from '../views/MonthlyUsage.vue'
import MyMonthlyUsage from '../views/MyMonthlyUsage.vue'
import AddUsage from '../views/AddUsage.vue'
import AddMyUsage from '../views/AddMyUsage.vue'
import { auth } from '../firebase/init.js'
import { onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/add-statement',
      name: 'add-statement',
      component: AddStatement,
    },
    {
      path: '/monthly-usage',
      name: 'monthly-usage',
      component: MonthlyUsage,
    },
    {
      path: '/add-usage',
      name: 'add-usage',
      component: AddUsage,
    },
    {
      path: '/my-usage',
      name: 'my-usage',
      component: MyMonthlyUsage,
    },
    {
      path: '/add-my-usage',
      name: 'add-my-usage',
      component: AddMyUsage,
    },
  ],
})
router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (to.name !== 'login' && !user) {
      next({ name: 'login' })
    } else next()
  })
})
export default router
