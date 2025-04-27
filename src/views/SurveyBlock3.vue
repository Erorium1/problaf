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
              <label class="answer-item"><input type="radio" name="q3_1" value="calm" v-model="answers.q3_1" />Остаюсь спокойным, анализирую ситуацию.</label>
              <label class="answer-item"><input type="radio" name="q3_1" value="fast" v-model="answers.q3_1" />Стараюсь быстро найти решение и действую.</label>
              <label class="answer-item"><input type="radio" name="q3_1" value="positive" v-model="answers.q3_1" />Я чувствую стресс, но стараюсь поддерживать позитивный настрой.</label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Вы предпочитаете работу:</div>
            <div class="answer-list">
              <label class="answer-item"><input type="radio" name="q3_2" value="predictable" v-model="answers.q3_2" />С предсказуемыми задачами, где не нужно много импровизировать.</label>
              <label class="answer-item"><input type="radio" name="q3_2" value="decisions" v-model="answers.q3_2" />С возможностью принятия решений и самостоятельной работы.</label>
              <label class="answer-item"><input type="radio" name="q3_2" value="changes" v-model="answers.q3_2" />С частыми изменениями и новыми вызовами.</label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Что для вас важнее в общении с коллегами?</div>
            <div class="answer-list">
              <label class="answer-item"><input type="radio" name="q3_3" value="friendly" v-model="answers.q3_3" />Дружелюбная атмосфера и поддержка.</label>
              <label class="answer-item"><input type="radio" name="q3_3" value="clarity" v-model="answers.q3_3" />Ясность в коммуникации и чёткое выполнение задач.</label>
              <label class="answer-item"><input type="radio" name="q3_3" value="ideas" v-model="answers.q3_3" />Возможность обмениваться идеями и обучать других.</label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Как вы относитесь к рутинным задачам?</div>
            <div class="answer-list">
              <label class="answer-item"><input type="radio" name="q3_4" value="like" v-model="answers.q3_4" />Мне нравится выполнять монотонную работу, если она нужна.</label>
              <label class="answer-item"><input type="radio" name="q3_4" value="variety" v-model="answers.q3_4" />Я предпочитаю, чтобы работа была разнообразной.</label>
              <label class="answer-item"><input type="radio" name="q3_4" value="notfor" v-model="answers.q3_4" />Рутинная работа не для меня, мне нужно что-то новое и интересное.</label>
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