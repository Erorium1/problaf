import { createRouter, createWebHistory } from 'vue-router'
import LanguageSelect from '@/views/LanguageSelect.vue'
import Welcome from '@/views/Welcome.vue'
import Auth from '@/views/Auth.vue'
import Dashboard from '@/views/Dashboard.vue'
import Universities from '@/views/Universities.vue'
import Professions from '@/views/Professions.vue'
import AIAssistant from '@/views/AIAssistant.vue'
import Directions from '@/views/Directions.vue'
import DirectionDetail from '@/views/DirectionDetail.vue'
import ProfessionDetail from '@/views/ProfessionDetail.vue'
import LawProfessionDetail from '../views/LawProfessionDetail.vue'

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
      component: Auth,
      meta: {
        transition: 'slide-fade'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        transition: 'slide-fade'
      }
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
    },
    {
      path: '/ai-assistant',
      name: 'ai-assistant',
      component: AIAssistant,
      meta: { requiresAuth: true }
    },
    {
      path: '/directions',
      name: 'directions',
      component: Directions,
      meta: { requiresAuth: true }
    },
    {
      path: '/direction/:id',
      name: 'direction-detail',
      component: DirectionDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/profession/:field',
      name: 'profession-detail',
      component: ProfessionDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/law-professions',
      name: 'LawProfessions',
      component: LawProfessionDetail,
      meta: {
        requiresAuth: true,
        transition: 'slide-fade'
      }
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
