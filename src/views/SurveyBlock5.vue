<template>
  <div class="survey-view">
    <div class="back-button">
      <router-link to="/survey/block4" class="btn-back">
        <i class="fas fa-arrow-left"></i>
      </router-link>
    </div>
    <div class="survey-container">
      <div class="survey-content">
        <div class="block-header">
          <h2>БЛОК 5. ВОЗМОЖНОСТЬ РАЗВИТИЯ И УЧЁБА</h2>
        </div>
        <div class="questions">
          <div class="question-block">
            <div class="question-title">Сколько времени вы готовы тратить на обучение и развитие в своей профессии?</div>
            <div class="answer-list">
              <label class="answer-item"><input type="radio" name="q5_1" value="lifetime" v-model="answers.q5_1" />Я готов учиться всю жизнь, это важно для моей карьеры.</label>
              <label class="answer-item"><input type="radio" name="q5_1" value="courses" v-model="answers.q5_1" />Я готов пройти несколько курсов и тренингов.</label>
              <label class="answer-item"><input type="radio" name="q5_1" value="practice" v-model="answers.q5_1" />Мне важнее практическая работа, а не обучение.</label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Что вас больше привлекает в будущем?</div>
            <div class="answer-list">
              <label class="answer-item"><input type="radio" name="q5_2" value="career" v-model="answers.q5_2" />Возможности карьерного роста.</label>
              <label class="answer-item"><input type="radio" name="q5_2" value="business" v-model="answers.q5_2" />Возможности начать собственное дело.</label>
              <label class="answer-item"><input type="radio" name="q5_2" value="calm" v-model="answers.q5_2" />Спокойная работа, где можно развивать свои навыки.</label>
            </div>
          </div>
        </div>
        <div class="navigation-buttons">
          <router-link to="/survey/block4" class="nav-button prev">
            <span>Предыдущий</span>
          </router-link>
          <button class="nav-button next" @click="handleNext">
            <span>Завершить</span>
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'SurveyBlock5',
  setup() {
    const router = useRouter()
    const answers = ref({
      q5_1: '', q5_2: ''
    })

    const handleNext = () => {
      const allAnswered = Object.values(answers.value).every(val => val)
      if (!allAnswered) {
        alert('Пожалуйста, выберите ответы на все вопросы!')
        return
      }
      alert('Спасибо за прохождение опроса!')
      router.push('/ai-assistant')
    }

    return {
      answers,
      handleNext
    }
  }
}
</script>

<style scoped>
@import '@/assets/styles/survey.css';
</style> 