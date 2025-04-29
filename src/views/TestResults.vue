<template>
  <div class="test-results">
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <router-link to="/test" class="btn-back">
          <i class="fas fa-arrow-left"></i>
        </router-link>
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

    <div class="container py-4">
      <h1 class="text-center mb-4">Результаты теста</h1>
      
      <div v-if="loading" class="loading text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Загрузка...</span>
        </div>
        <p class="mt-2">Загрузка результатов...</p>
      </div>

      <div v-else-if="error" class="error text-center">
        <i class="fas fa-exclamation-circle text-danger mb-2" style="font-size: 2rem;"></i>
        <p>{{ error }}</p>
      </div>

      <template v-else>
        <div class="row g-4">
          <div v-for="(result, category) in analysis" :key="category" class="col-12">
            <div class="result-card">
              <div class="card-header">
                <h2>{{ category }}</h2>
              </div>
              <div class="card-body">
                <div class="score-info mb-3">
                  <div class="score">
                    <span class="label">Баллы:</span>
                    <span class="value">{{ result.score }}</span>
                  </div>
                  <div class="level">
                    <span class="label">Уровень:</span>
                    <span class="value">{{ result.level }}</span>
                  </div>
                </div>

                <div class="description mb-4">
                  <p>{{ result.description }}</p>
                </div>

                <div v-if="result.professions && result.professions.length" class="professions mb-4">
                  <h3>Подходящие профессии:</h3>
                  <div class="professions-list">
                    <span v-for="profession in result.professions" :key="profession" class="profession-tag">
                      {{ profession }}
                    </span>
                  </div>
                </div>

                <div v-if="result.advice && result.advice.length" class="advice">
                  <h3>Советы:</h3>
                  <ul class="advice-list">
                    <li v-for="(advice, index) in result.advice" :key="index">
                      <i class="fas fa-check-circle"></i>
                      {{ advice }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { surveyService } from '@/services/api';

export default {
  name: 'TestResults',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const analysis = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const fetchResults = async () => {
      try {
        const userId = authStore.user?.id || authStore.user?._id;
        
        if (!userId) {
          console.error('User ID is missing:', authStore.user);
          error.value = 'Ошибка: ID пользователя не найден';
          loading.value = false;
          return;
        }

        console.log('Fetching results for user:', userId);
        const data = await surveyService.getTestResults(userId);
        console.log('Received results:', data);
        analysis.value = data.analysis;
      } catch (err) {
        error.value = err.message;
        console.error('Error fetching results:', err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      if (!authStore.isAuthenticated) {
        router.push('/auth');
        return;
      }
      
      // Проверяем наличие пользователя и его ID
      if (!authStore.user || (!authStore.user.id && !authStore.user._id)) {
        error.value = 'Ошибка: данные пользователя не найдены';
        loading.value = false;
        return;
      }
      
      fetchResults();
    });

    return {
      analysis,
      loading,
      error
    };
  }
};
</script>

<style scoped>
.test-results {
  min-height: 100vh;
  background-color: #ffffff;
}

.navbar {
  padding: 1rem;
}

.btn-back {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #98a3b3;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-back:hover {
  background-color: #7a8595;
  color: white;
}

.result-card {
  background-color: #98a3b3;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
}

.card-header h2 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
}

.card-body {
  padding: 1.5rem;
}

.score-info {
  display: flex;
  gap: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 10px;
}

.score, .level {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.value {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
}

.description p {
  color: white;
  line-height: 1.6;
  margin: 0;
}

.professions h3, .advice h3 {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.professions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.profession-tag {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.advice-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.advice-list li {
  color: white;
  padding: 0.5rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.advice-list li i {
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.2rem;
}

.loading, .error {
  padding: 2rem;
  color: #98a3b3;
}

.error {
  color: #dc3545;
}

@media (max-width: 576px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  .score-info {
    flex-direction: column;
    gap: 1rem;
  }
}
</style> 