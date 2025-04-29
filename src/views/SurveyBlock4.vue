<template>
  <div class="survey-view">
    <div class="back-button">
      <router-link to="/survey/block3" class="btn-back">
        <i class="fas fa-arrow-left"></i>
      </router-link>
    </div>
    <div class="survey-container">
      <div class="survey-content">
        <div class="block-header">
          <h2>БЛОК 4. СВОБОДА И ИНИЦИАТИВА</h2>
        </div>
        <div class="questions">
          <div class="question-block">
            <div class="question-title">Как вы относитесь к ответственности в команде?</div>
            <div class="answer-list">
              <label class="answer-item">
                <input type="radio" name="q4_1" value="lead" v-model="answers.q4_1" />
                <span>Я люблю брать на себя ответственность и вести команду.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q4_1" value="clear" v-model="answers.q4_1" />
                <span>Мне комфортнее работать, когда распределение ответственности чёткое.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q4_1" value="own" v-model="answers.q4_1" />
                <span>Я предпочитаю выполнять свою работу и не брать на себя лишнюю ответственность.</span>
              </label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Когда вы сталкиваетесь с проблемой, что вы делаете?</div>
            <div class="answer-list">
              <label class="answer-item">
                <input type="radio" name="q4_2" value="act" v-model="answers.q4_2" />
                <span>Я сразу ищу решение и действую.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q4_2" value="analyze" v-model="answers.q4_2" />
                <span>Сначала анализирую проблему и прокачиваю план действий.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q4_2" value="together" v-model="answers.q4_2" />
                <span>Я предпочитаю посоветоваться с коллегами и искать решение вместе.</span>
              </label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Насколько важна для вас возможность самостоятельно планировать свою работу?</div>
            <div class="answer-list">
              <label class="answer-item">
                <input type="radio" name="q4_3" value="very" v-model="answers.q4_3" />
                <span>Очень важна — я люблю иметь свободу в работе.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q4_3" value="goals" v-model="answers.q4_3" />
                <span>Я предпочитаю, чтобы мне задавали чёткие цели, а дальше сам.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q4_3" value="instructions" v-model="answers.q4_3" />
                <span>Мне нравится следовать инструкциям, я не люблю планировать всё сам.</span>
              </label>
            </div>
          </div>
        </div>
        <div class="navigation-buttons">
          <router-link to="/survey/block3" class="nav-button prev">
            <span>Предыдущий</span>
          </router-link>
          <button class="nav-button next" @click="handleNext">
            <span>Следующий</span>
            <i class="fas fa-arrow-right"></i>
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
  name: 'SurveyBlock4',
  setup() {
    const router = useRouter()
    const answers = ref({
      q4_1: '', q4_2: '', q4_3: ''
    })

    const handleNext = () => {
      const allAnswered = Object.values(answers.value).every(val => val)
      if (!allAnswered) {
        alert('Пожалуйста, выберите ответы на все вопросы!')
        return
      }
      
      // Сохраняем ответы в localStorage
      localStorage.setItem('survey_block4', JSON.stringify(answers.value))
      
      router.push('/survey/block5')
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