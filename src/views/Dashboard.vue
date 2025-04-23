<template>
  <div class="dashboard">
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <button class="navbar-toggler border-0" type="button" @click="toggleSidebar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="dropdown">
          <button class="btn btn-link p-0" type="button" data-bs-toggle="dropdown">
            <i class="fas fa-ellipsis-v"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Настройки</a></li>
            <li><a class="dropdown-item" @click="handleLogout">Выйти</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <div class="sidebar-header">
        <h5>Меню</h5>
        <button class="close-btn" @click="toggleSidebar">&times;</button>
      </div>
      <div class="sidebar-content">
        <div class="user-info mb-4">
          <div class="user-avatar">
            <i class="fas fa-user"></i>
          </div>
          <div class="user-details">
            <h6>{{ user?.name || 'Пользователь' }}</h6>
            <p class="text-muted">{{ user?.email || '' }}</p>
          </div>
        </div>
        <div class="sidebar-menu">
          <router-link to="/dashboard" class="sidebar-item" @click="toggleSidebar">
            <i class="fas fa-home"></i>
            <span>Главная</span>
          </router-link>
          <router-link to="/profile" class="sidebar-item" @click="toggleSidebar">
            <i class="fas fa-user"></i>
            <span>Профиль</span>
          </router-link>
          <router-link to="/settings" class="sidebar-item" @click="toggleSidebar">
            <i class="fas fa-cog"></i>
            <span>Настройки</span>
          </router-link>
          <a href="#" class="sidebar-item" @click="handleLogout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Выйти</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <div class="overlay" v-if="isSidebarOpen" @click="toggleSidebar"></div>

    <div class="container py-4">
      <!-- AI Assistant Card -->
      <router-link to="/ai-assistant" class="text-decoration-none">
        <div class="ai-assistant-card mb-4">
          <div class="card-content text-center">
            <div class="ai-icon">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="58" fill="none" stroke="white" stroke-width="2"/>
                <circle cx="45" cy="50" r="5" fill="white"/> <!-- Left eye -->
                <circle cx="75" cy="50" r="5" fill="white"/> <!-- Right eye -->
                <path d="M45,70 Q60,80 75,70" stroke="white" stroke-width="3" fill="none"/> <!-- Smile -->
              </svg>
            </div>
            <h3 class="text-white mb-2">ИИ-помощник</h3>
            <p class="text-white-50 mb-0">Нажмите, чтобы задать вопрос ИИ!</p>
          </div>
        </div>
      </router-link>

      <!-- Feature Cards Grid -->
      <div class="row g-4">
        <div class="col-6">
          <router-link to="/universities" class="text-decoration-none">
            <div class="feature-card">
              <div class="card-body text-center">
                <h4>ВУЗЫ</h4>
                <p class="small mb-0">Найди лучшие университеты и программы обучения</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-6">
          <router-link to="/professions" class="text-decoration-none">
            <div class="feature-card">
              <div class="card-body text-center">
                <h4>Профессии</h4>
                <p class="small mb-0">Изучи разные профессии и выбери свою!</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-6">
          <router-link to="/directions" class="text-decoration-none">
            <div class="feature-card">
              <div class="card-body text-center">
                <h4>Направления</h4>
                <p class="small mb-0">Определи, какие сферы тебе подходят</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-6">
          <div class="feature-card">
            <div class="card-body text-center">
              <h4>Профориентологи</h4>
              <p class="small mb-0">Получай советы от экспертов</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const isSidebarOpen = ref(false)

    const user = computed(() => authStore.user)

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value
    }

    const handleLogout = async () => {
      try {
        await authStore.logout()
        router.push('/auth')
      } catch (error) {
        console.error('Ошибка при выходе:', error)
      }
    }

    return {
      isSidebarOpen,
      user,
      toggleSidebar,
      handleLogout
    }
  }
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #ffffff;
}

.navbar {
  padding: 1rem;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.ai-assistant-card {
  background-color: #98a3b3;
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ai-assistant-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.ai-icon {
  margin-bottom: 1rem;
}

.feature-card {
  background-color: #98a3b3;
  border-radius: 15px;
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.feature-card .card-body {
  padding: 1.5rem;
}

.feature-card h4 {
  color: white;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  line-height: 1.4;
}

.btn-link {
  color: #333;
}

.dropdown-menu {
  border: none;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.dropdown-item {
  padding: 0.5rem 1.5rem;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: left 0.3s ease;
}

.sidebar-open {
  left: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.sidebar-content {
  padding: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #98a3b3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.user-details h6 {
  margin: 0;
  font-size: 1rem;
}

.user-details p {
  margin: 0;
  font-size: 0.8rem;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.sidebar-item:hover {
  background-color: #f5f5f5;
}

.sidebar-item i {
  width: 20px;
  text-align: center;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

@media (max-width: 576px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .sidebar {
    width: 100%;
    left: -100%;
  }
}
</style> 