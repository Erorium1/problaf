<template>
  <div class="test-results">
    <div class="back-button">
      <router-link to="/test" class="btn-back">
        <i class="fas fa-arrow-left"></i>
      </router-link>
    </div>

    <div class="results-container">
      <h1>Результаты теста</h1>
      
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
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'TestResults',
  setup() {
    const authStore = useAuthStore();
    const analysis = computed(() => authStore.testAnalysis);

    return {
      analysis
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
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.result-block {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 15px;
}

h2 {
  color: #98a3b3;
  margin-bottom: 1.5rem;
}

.score-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.score, .level {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #98a3b3;
}

.description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #333;
}

.professions, .advice {
  margin-top: 1.5rem;
}

h3 {
  color: #98a3b3;
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 0.5rem 0;
  color: #333;
  border-bottom: 1px solid #eee;
}

li:last-child {
  border-bottom: none;
}
</style> 