<template>
  <div class="test-results">
    <div class="back-button">
      <router-link to="/test" class="btn-back">
        <i class="fas fa-arrow-left"></i>
      </router-link>
    </div>

    <div class="results-container">
      <h1>Результаты теста</h1>
      
      <div v-if="loading" class="loading">
        Загрузка результатов...
      </div>

      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <template v-else>
        <div v-for="(result, category) in analysis" :key="category" class="result-block">
          <h2>{{ category }}</h2>
          
          <div class="score-info">
            <div class="score">
              <span class="label">Баллы:</span>
              <span class="value">{{ result.score }}</span>
            </div>
            <div class="level">
              <span class="label">Уровень:</span>
              <span class="value">{{ result.level }}</span>
            </div>
          </div>

          <div class="description">
            <p>{{ result.description }}</p>
          </div>

          <div v-if="result.professions && result.professions.length" class="professions">
            <h3>Подходящие профессии:</h3>
            <ul>
              <li v-for="profession in result.professions" :key="profession">
                {{ profession }}
              </li>
            </ul>
          </div>

          <div v-if="result.advice && result.advice.length" class="advice">
            <h3>Советы:</h3>
            <ul>
              <li v-for="(advice, index) in result.advice" :key="index">
                {{ advice }}
              </li>
            </ul>
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
  background-color: #f5f5f5;
  padding: 2rem;
}

.back-button {
  position: absolute;
  top: 1rem;
  left: 1rem;
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
}

.results-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.result-block {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

h2 {
  color: #98a3b3;
  margin-bottom: 1rem;
}

.score-info {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}

.score, .level {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.9rem;
  color: #666;
}

.value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.description {
  margin-bottom: 1.5rem;
}

.description p {
  line-height: 1.6;
  color: #444;
}

.professions, .advice {
  margin-top: 1rem;
}

h3 {
  color: #98a3b3;
  margin-bottom: 0.5rem;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  padding: 0.5rem 0;
  color: #444;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: #dc3545;
}
</style> 