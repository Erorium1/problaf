<template>
  <div class="test-view">
    <div class="back-button">
      <router-link to="/ai-assistant" class="btn-back">
        <i class="fas fa-arrow-left"></i>
      </router-link>
    </div>
    
    <div class="test-container">
      <div class="test-content">
        <div class="results-message">
          <h2>Отлично! Ты прошёл(а) все этапы.</h2>
          <p class="description">
            Сейчас мы обработаем твои
            ответы и покажем, какие
            направления профессий тебе
            подходят больше всего.
            Готов(а) узнать, где ты можешь
            быть счастлив(а) и успешен(на)?
          </p>
        </div>

        <div class="loading-section">
          <div class="loading-text" v-if="isLoading">Считаем...</div>
          <div class="results-ready" v-else>
            <p>Результаты готовы!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

onMounted(() => {
  // Имитация обработки результатов
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});
</script>

<style scoped>
.test-view {
  min-height: 100vh;
  background-color: #98a3b3;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background-color: rgba(255, 255, 255, 0.2);
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
  background-color: rgba(255, 255, 255, 0.3);
}

.test-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
}

.test-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  text-align: center;
}

.results-message {
  color: white;
}

.results-message h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.description {
  font-size: 1.2rem;
  line-height: 1.6;
  white-space: pre-line;
}

.loading-section {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.loading-text {
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
  animation: pulse 1.5s infinite;
}

.results-ready {
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style> 