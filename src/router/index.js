import { createRouter, createWebHistory } from 'vue-router'
import LanguageSelect from '@/views/LanguageSelect.vue'
import Welcome from '@/views/Welcome.vue'
import Auth from '@/views/Auth.vue'
import Dashboard from '@/views/Dashboard.vue'
import Universities from '@/views/Universities.vue'
import Professions from '@/views/Professions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'language',
      component: LanguageSelect
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/universities',
      name: 'universities',
      component: Universities,
      meta: { requiresAuth: true }
    },
    {
      path: '/professions',
      name: 'professions',
      component: Professions,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      next('/auth')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
