<template>
  <div class="survey-view">
    <div class="back-button">
      <router-link to="/ai-assistant" class="btn-back">
        <i class="fas fa-arrow-left"></i>
      </router-link>
    </div>
    <div class="survey-container">
      <div class="survey-content">
        <div class="block-header">
          <h2>БЛОК 1. ОТНОШЕНИЕ К РАБОТЕ</h2>
        </div>
        <div class="questions">
          <div class="question-block">
            <div class="question-title">Какой рабочий график вам больше всего подходит?</div>
            <div class="answer-list">
              <label class="answer-item"><input type="radio" name="q1_1" value="9-18" v-model="answers.q1_1" />Я предпочитаю работать с 9 до 18.</label>
              <label class="answer-item"><input type="radio" name="q1_1" value="flexible" v-model="answers.q1_1" />Гибкий график, главное — выполнить задачи.</label>
              <label class="answer-item"><input type="radio" name="q1_1" value="evening" v-model="answers.q1_1" />Мне нравится работать по вечерам и ночам.</label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Что для вас важнее всего в профессии?</div>
            <div class="answer-list">
              <label class="answer-item"><input type="radio" name="q1_2" value="income" v-model="answers.q1_2" />Высокий доход.</label>
              <label class="answer-item"><input type="radio" name="q1_2" value="growth" v-model="answers.q1_2" />Возможность развиваться и учиться новому.</label>
              <label class="answer-item"><input type="radio" name="q1_2" value="help" v-model="answers.q1_2" />Стремление помогать людям.</label>
              <label class="answer-item"><input type="radio" name="q1_2" value="stability" v-model="answers.q1_2" />Стабильность и безопасность</label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Какую роль вам хочется играть в коллективе?</div>
            <div class="answer-list">
              <label class="answer-item"><input type="radio" name="q1_3" value="leader" v-model="answers.q1_3" />Лидер, который принимает решения.</label>
              <label class="answer-item"><input type="radio" name="q1_3" value="specialist" v-model="answers.q1_3" />Специалист, который фокусируется на задачах.</label>
              <label class="answer-item"><input type="radio" name="q1_3" value="support" v-model="answers.q1_3" />Поддержка для коллег, создатель хорошей атмосферы.</label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Что вам ближе в работе?</div>
            <div class="answer-list">
              <label class="answer-item"><input type="radio" name="q1_4" value="people" v-model="answers.q1_4" />Работа с людьми.</label>
              <label class="answer-item"><input type="radio" name="q1_4" value="tech" v-model="answers.q1_4" />Работа с техникой и технологиями.</label>
              <label class="answer-item"><input type="radio" name="q1_4" value="data" v-model="answers.q1_4" />Работа с данными, анализом и цифрами.</label>
              <label class="answer-item"><input type="radio" name="q1_4" value="creative" v-model="answers.q1_4" />Творчество и создание нового.</label>
            </div>
          </div>
        </div>
        <div class="navigation-buttons">
          <router-link to="/ai-assistant" class="nav-button prev">
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
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'SurveyBlock1',
  setup() {
    const router = useRouter()
    const answers = ref({
      q1_1: '', q1_2: '', q1_3: '', q1_4: ''
    })

    const handleNext = () => {
      const allAnswered = Object.values(answers.value).every(val => val)
      if (!allAnswered) {
        alert('Пожалуйста, выберите ответы на все вопросы!')
        return
      }
      
      // Сохраняем ответы в localStorage
      localStorage.setItem('survey_block1', JSON.stringify(answers.value))
      
      router.push('/survey/block2')
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