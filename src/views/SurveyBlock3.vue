<template>
  <div class="survey-view">
    <div class="back-button">
      <router-link to="/survey/block2" class="btn-back">
        <i class="fas fa-arrow-left"></i>
      </router-link>
    </div>
    <div class="survey-container">
      <div class="survey-content">
        <div class="block-header">
          <h2>БЛОК 3. СОЦИАЛЬНАЯ АТМОСФЕРА И ЛИЧНЫЕ ХАРАКТЕРИСТИКИ</h2>
        </div>
        <div class="questions">
          <div class="question-block">
            <div class="question-title">Как вы обычно ведёте себя в стрессовых ситуациях?</div>
            <div class="answer-list">
              <label class="answer-item">
                <input type="radio" name="q3_1" value="calm" v-model="answers.q3_1" />
                <span>Остаюсь спокойным, анализирую ситуацию.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q3_1" value="fast" v-model="answers.q3_1" />
                <span>Стараюсь быстро найти решение и действую.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q3_1" value="positive" v-model="answers.q3_1" />
                <span>Я чувствую стресс, но стараюсь поддерживать позитивный настрой.</span>
              </label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Вы предпочитаете работу:</div>
            <div class="answer-list">
              <label class="answer-item">
                <input type="radio" name="q3_2" value="predictable" v-model="answers.q3_2" />
                <span>С предсказуемыми задачами, где не нужно много импровизировать.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q3_2" value="decisions" v-model="answers.q3_2" />
                <span>С возможностью принятия решений и самостоятельной работы.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q3_2" value="changes" v-model="answers.q3_2" />
                <span>С частыми изменениями и новыми вызовами.</span>
              </label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Что для вас важнее в общении с коллегами?</div>
            <div class="answer-list">
              <label class="answer-item">
                <input type="radio" name="q3_3" value="friendly" v-model="answers.q3_3" />
                <span>Дружелюбная атмосфера и поддержка.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q3_3" value="clarity" v-model="answers.q3_3" />
                <span>Ясность в коммуникации и чёткое выполнение задач.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q3_3" value="ideas" v-model="answers.q3_3" />
                <span>Возможность обмениваться идеями и обучать других.</span>
              </label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Как вы относитесь к рутинным задачам?</div>
            <div class="answer-list">
              <label class="answer-item">
                <input type="radio" name="q3_4" value="like" v-model="answers.q3_4" />
                <span>Мне нравится выполнять монотонную работу, если она нужна.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q3_4" value="variety" v-model="answers.q3_4" />
                <span>Я предпочитаю, чтобы работа была разнообразной.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q3_4" value="notfor" v-model="answers.q3_4" />
                <span>Рутинная работа не для меня, мне нужно что-то новое и интересное.</span>
              </label>
            </div>
          </div>
        </div>
        <div class="navigation-buttons">
          <router-link to="/survey/block2" class="nav-button prev">
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
  name: 'SurveyBlock3',
  setup() {
    const router = useRouter()
    const answers = ref({
      q3_1: '', q3_2: '', q3_3: '', q3_4: ''
    })

    const handleNext = () => {
      const allAnswered = Object.values(answers.value).every(val => val)
      if (!allAnswered) {
        alert('Пожалуйста, выберите ответы на все вопросы!')
        return
      }
      
      // Сохраняем ответы в localStorage
      localStorage.setItem('survey_block3', JSON.stringify(answers.value))
      
      router.push('/survey/block4')
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