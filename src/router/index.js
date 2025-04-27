import { createRouter, createWebHistory } from 'vue-router';
import LanguageSelect from '@/views/LanguageSelect.vue';
import Welcome from '@/views/Welcome.vue';
import Auth from '@/views/Auth.vue';
import Dashboard from '@/views/Dashboard.vue';
import Universities from '@/views/Universities.vue';
import Professions from '@/views/Professions.vue';
import AIAssistant from '@/views/AIAssistant.vue';
import Directions from '@/views/Directions.vue';
import DirectionDetail from '@/views/DirectionDetail.vue';
import ProfessionDetail from '@/views/ProfessionDetail.vue';
import LawProfessionDetail from '../views/LawProfessionDetail.vue';
import TestView from '@/views/TestView.vue';
import TestBlock1 from '@/views/TestBlock1.vue';
import TestBlock2 from '@/views/TestBlock2.vue';
import TestBlock3 from '@/views/TestBlock3.vue';
import TestBlock4 from '@/views/TestBlock4.vue';
import TestBlock5 from '@/views/TestBlock5.vue';
import TestResults from '@/views/TestResults.vue';
import SurveyBlock1 from '@/views/SurveyBlock1.vue';
import SurveyBlock2 from '@/views/SurveyBlock2.vue';
import SurveyBlock3 from '@/views/SurveyBlock3.vue';
import SurveyBlock4 from '@/views/SurveyBlock4.vue';
import SurveyBlock5 from '@/views/SurveyBlock5.vue';
import { useAuthStore } from '@/stores/auth'; // Импортируйте ваш authStore

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'language',
      component: LanguageSelect,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      meta: {
        requiresGuest: true,
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
    },
    {
      path: '/test',
      name: 'test',
      component: TestView,
      meta: { requiresAuth: true }
    },
    {
      path: '/test/block1',
      name: 'test-block-1',
      component: TestBlock1,
      meta: { requiresAuth: true }
    },
    {
      path: '/test/block2',
      name: 'test-block-2',
      component: TestBlock2,
      meta: { requiresAuth: true }
    },
    {
      path: '/test/block3',
      name: 'test-block-3',
      component: TestBlock3,
      meta: { requiresAuth: true }
    },
    {
      path: '/test/block4',
      name: 'test-block-4',
      component: TestBlock4,
      meta: { requiresAuth: true }
    },
    {
      path: '/test/block5',
      name: 'test-block-5',
      component: TestBlock5,
      meta: { requiresAuth: true }
    },
    {
      path: '/test/results',
      name: 'test-results',
      component: TestResults,
      meta: { requiresAuth: true }
    },
    {
      path: '/survey/block1',
      name: 'survey-block-1',
      component: SurveyBlock1,
      meta: { requiresAuth: true }
    },
    {
      path: '/survey/block2',
      name: 'survey-block-2',
      component: SurveyBlock2,
      meta: { requiresAuth: true }
    },
    {
      path: '/survey/block3',
      name: 'survey-block-3',
      component: SurveyBlock3,
      meta: { requiresAuth: true }
    },
    {
      path: '/survey/block4',
      name: 'survey-block-4',
      component: SurveyBlock4,
      meta: { requiresAuth: true }
    },
    {
      path: '/survey/block5',
      name: 'survey-block-5',
      component: SurveyBlock5,
      meta: { requiresAuth: true }
    }
  ]
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  // Если пользователь аутентифицирован и пытается зайти на гостевые страницы
  if (isAuthenticated && to.meta.requiresGuest) {
    console.log('User is authenticated, redirecting to dashboard');
    next('/dashboard');
    return;
  }

  // Если пользователь не аутентифицирован и пытается зайти на защищенные страницы
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('User is not authenticated, redirecting to auth');
    next('/auth');
    return;
  }

  // В остальных случаях разрешаем переход
  next();
});

export default router;