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
              <label class="answer-item">
                <input type="radio" name="q5_1" value="lifetime" v-model="answers.q5_1" />
                <span>Я готов учиться всю жизнь, это важно для моей карьеры.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q5_1" value="courses" v-model="answers.q5_1" />
                <span>Я готов пройти несколько курсов и тренингов.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q5_1" value="practice" v-model="answers.q5_1" />
                <span>Мне важнее практическая работа, а не обучение.</span>
              </label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Что вас больше привлекает в будущем?</div>
            <div class="answer-list">
              <label class="answer-item">
                <input type="radio" name="q5_2" value="career" v-model="answers.q5_2" />
                <span>Возможности карьерного роста.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q5_2" value="business" v-model="answers.q5_2" />
                <span>Возможности начать собственное дело.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q5_2" value="calm" v-model="answers.q5_2" />
                <span>Спокойная работа, где можно развивать свои навыки.</span>
              </label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Как вы относитесь к работе с большими объёмами информации?</div>
            <div class="answer-list">
              <label class="answer-item">
                <input type="radio" name="q5_1" value="like" v-model="answers.q5_1" />
                <span>Мне нравится анализировать и систематизировать информацию.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q5_1" value="prefer" v-model="answers.q5_1" />
                <span>Я предпочитаю работать с конкретными задачами, а не с большими массивами данных.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q5_1" value="avoid" v-model="answers.q5_1" />
                <span>Я стараюсь избегать работы с большими объёмами информации.</span>
              </label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Как вы относитесь к публичным выступлениям?</div>
            <div class="answer-list">
              <label class="answer-item">
                <input type="radio" name="q5_2" value="comfortable" v-model="answers.q5_2" />
                <span>Мне комфортно выступать перед аудиторией.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q5_2" value="prepare" v-model="answers.q5_2" />
                <span>Я могу выступать, если хорошо подготовлюсь.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q5_2" value="avoid" v-model="answers.q5_2" />
                <span>Я предпочитаю избегать публичных выступлений.</span>
              </label>
            </div>
          </div>
          <div class="question-block">
            <div class="question-title">Как вы относитесь к работе в условиях неопределённости?</div>
            <div class="answer-list">
              <label class="answer-item">
                <input type="radio" name="q5_3" value="adapt" v-model="answers.q5_3" />
                <span>Я легко адаптируюсь к изменениям и неопределённости.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q5_3" value="plan" v-model="answers.q5_3" />
                <span>Я предпочитаю иметь чёткий план и стабильные условия.</span>
              </label>
              <label class="answer-item">
                <input type="radio" name="q5_3" value="stress" v-model="answers.q5_3" />
                <span>Неопределённость вызывает у меня стресс.</span>
              </label>
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
import { analyzeProfile } from '@/utils/profileAnalyzer'
import { surveyService } from '@/services/api'

export default {
  name: 'SurveyBlock5',
  setup() {
    const router = useRouter()
    const answers = ref({
      q5_1: '', q5_2: '', q5_3: ''
    })

    const handleNext = async () => {
      const allAnswered = Object.values(answers.value).every(val => val)
      if (!allAnswered) {
        alert('Пожалуйста, выберите ответы на все вопросы!')
        return
      }

      // Сохраняем текущие ответы
      localStorage.setItem('survey_block5', JSON.stringify(answers.value))

      // Получаем все ответы из localStorage
      const allAnswers = {}
      for (let i = 1; i <= 5; i++) {
        const blockAnswers = JSON.parse(localStorage.getItem(`survey_block${i}`) || '{}')
        Object.assign(allAnswers, blockAnswers)
      }

      try {
        // Анализируем профиль
        const profileResult = analyzeProfile(allAnswers)

        // Сохраняем результат
        localStorage.setItem('profile_result', JSON.stringify(profileResult))

        // Получаем информацию о пользователе
        const userData = JSON.parse(localStorage.getItem('user') || '{}')

        // Отправляем результаты через сервис
        await surveyService.saveResults(profileResult, allAnswers, userData)
        
        // Перенаправляем на страницу профиля
        router.push('/profile')
      } catch (error) {
        console.error('Error saving results:', error)
        alert('Произошла ошибка при сохранении результатов')
      }
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