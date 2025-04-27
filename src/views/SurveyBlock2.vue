<template>
  <div class="survey-view">
    <div class="back-button">
      <router-link to="/survey/block1" class="btn-back">
        <i class="fas fa-arrow-left"></i>
      </router-link>
    </div>
    <div class="survey-container">
      <div class="survey-content">
        <div class="block-header">
          <h2>БЛОК 2. ЛИЧНЫЕ ПРЕДПОЧТЕНИЯ И СОБЫТИЯ</h2>
        </div>
        <div class="questions">
          <div class="question-block">
            <div class="question-title">Когда вам комфортнее работать?</div>
            <div class="answer-list">
              <label class="answer-item"><input type="radio" name="q2_1" value="alone" v-model="answers.q2_1" />В одиночку, в тишине и сосредоточенности.</label>
              <label class="answer-item"><input type="radio" name="q2_1" value="team" v-model="answers.q2_1" />В команде, обсуждая идеи и задачи.</label>
              <label class="answer-item"><input type="radio" name="q2_1" value="group" v-model="answers.q2_1" />Мне нравится работать в коллективе, но без лишних разговоров.</label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Что вас мотивирует на работе?</div>
            <div class="answer-list">
              <label class="answer-item"><input type="radio" name="q2_2" value="result" v-model="answers.q2_2" />Результат и успех.</label>
              <label class="answer-item"><input type="radio" name="q2_2" value="recognition" v-model="answers.q2_2" />Признание со стороны коллег и руководства.</label>
              <label class="answer-item"><input type="radio" name="q2_2" value="benefit" v-model="answers.q2_2" />Возможность приносить пользу людям и обществу.</label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Какую роль в жизни вы хотите занимать?</div>
            <div class="answer-list">
              <label class="answer-item"><input type="radio" name="q2_3" value="expert" v-model="answers.q2_3" />Ведущий специалист в своей области.</label>
              <label class="answer-item"><input type="radio" name="q2_3" value="organizer" v-model="answers.q2_3" />Организатор проектов, создатель.</label>
              <label class="answer-item"><input type="radio" name="q2_3" value="helper" v-model="answers.q2_3" />Человек, который помогает и поддерживает других.</label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Как вы относитесь к поездкам и командировкам в работе?</div>
            <div class="answer-list">
              <label class="answer-item"><input type="radio" name="q2_4" value="oneplace" v-model="answers.q2_4" />Я предпочитаю работать на одном месте.</label>
              <label class="answer-item"><input type="radio" name="q2_4" value="travel" v-model="answers.q2_4" />Мне нравятся командировки, особенно за границу.</label>
              <label class="answer-item"><input type="radio" name="q2_4" value="ready" v-model="answers.q2_4" />Я готов к командировкам, если это необходимо для работы.</label>
            </div>
          </div>
        </div>
        <div class="navigation-buttons">
          <router-link to="/survey/block1" class="nav-button prev">
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
  name: 'SurveyBlock2',
  setup() {
    const router = useRouter()
    const answers = ref({
      q2_1: '', q2_2: '', q2_3: '', q2_4: ''
    })

    const handleNext = () => {
      const allAnswered = Object.values(answers.value).every(val => val)
      if (!allAnswered) {
        alert('Пожалуйста, выберите ответы на все вопросы!')
        return
      }
      router.push('/survey/block3')
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