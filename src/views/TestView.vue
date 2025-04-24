<template>
  <div class="test-view">
    <div class="back-button">
      <router-link to="/ai-assistant" class="btn-back">
        <i class="fas fa-arrow-left"></i>
      </router-link>
    </div>
    
    <div class="test-container">
      <div class="test-content">
        <div class="instruction-card">
          <p class="test-instructions">
            Перед тобой 5 разделов.
            В каждом — утверждения,
            начинающиеся с «Я...».
            Твоя задача — оценить,
            насколько каждое
            утверждение подходит
            тебе по шкале:

            1 — Совсем не про меня
            2 — Скорее не про меня
            3 — Нейтрально
            4 — Скорее про меня
            5 — Полностью про меня

            Отвечай быстро и
            интуитивно. Не
            задумывайся слишком
            долго — первый отклик
            часто самый точный.
          </p>
        </div>
        <div class="next-button-container">
          <button class="next-button" @click="handleNext">
            <span>Следующий</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'TestView',
  setup() {
    const router = useRouter()

    const handleNext = () => {
      router.push('/test/block1')
    }

    return {
      handleNext
    }
  }
}
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
  gap: 2rem;
}

.instruction-card {
  background-color: #98a3b3;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.test-instructions {
  color: white;
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
  margin: 0;
  white-space: pre-line;
}

.next-button-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.next-button {
  background-color: white;
  color: #98a3b3;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 2.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.next-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.next-button i {
  font-size: 0.9rem;
}
</style> 