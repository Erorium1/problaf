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
              <label class="answer-item">
                <input type="radio" name="q2_1" value="alone" v-model="answers.q2_1" />
                <span>В одиночку, в тишине и сосредоточенности.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q2_1" value="team" v-model="answers.q2_1" />
                <span>В команде, обсуждая идеи и задачи.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q2_1" value="group" v-model="answers.q2_1" />
                <span>Мне нравится работать в коллективе, но без лишних разговоров.</span>
              </label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Что вас мотивирует на работе?</div>
            <div class="answer-list">
              <label class="answer-item">
                <input type="radio" name="q2_2" value="result" v-model="answers.q2_2" />
                <span>Результат и успех.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q2_2" value="recognition" v-model="answers.q2_2" />
                <span>Признание со стороны коллег и руководства.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q2_2" value="benefit" v-model="answers.q2_2" />
                <span>Возможность приносить пользу людям и обществу.</span>
              </label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Какую роль в жизни вы хотите занимать?</div>
            <div class="answer-list">
              <label class="answer-item">
                <input type="radio" name="q2_3" value="expert" v-model="answers.q2_3" />
                <span>Ведущий специалист в своей области.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q2_3" value="organizer" v-model="answers.q2_3" />
                <span>Организатор проектов, создатель.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q2_3" value="helper" v-model="answers.q2_3" />
                <span>Человек, который помогает и поддерживает других.</span>
              </label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Как вы относитесь к поездкам и командировкам в работе?</div>
            <div class="answer-list">
              <label class="answer-item">
                <input type="radio" name="q2_4" value="oneplace" v-model="answers.q2_4" />
                <span>Я предпочитаю работать на одном месте.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q2_4" value="travel" v-model="answers.q2_4" />
                <span>Мне нравятся командировки, особенно за границу.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q2_4" value="ready" v-model="answers.q2_4" />
                <span>Я готов к командировкам, если это необходимо для работы.</span>
              </label>
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
      
      // Сохраняем ответы в localStorage
      localStorage.setItem('survey_block2', JSON.stringify(answers.value))
      
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