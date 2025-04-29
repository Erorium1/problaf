<template>
  <div class="test-view">
    <div class="back-button">
      <router-link to="/test/block4" class="btn-back">
        <i class="fas fa-arrow-left"></i>
      </router-link>
    </div>
    
    <div class="test-container">
      <div class="test-content">
        <div class="block-header">
          <h2>БЛОК 5: МОЁ ПОВЕДЕНИЕ В ЖИЗНИ</h2>
          <p class="block-description">
            В этом блоке мы определим, как ты
            обычно ведёшь себя в различных
            ситуациях. Ответь на вопросы, исходя
            из своих привычек и того, как ты
            воспринимаешь повседневные задачи
            и взаимодействие с другими
          </p>
        </div>

        <div class="questions">
          <div class="question-item">
            <p class="question-text">Я люблю быть в центре внимания и когда меня замечают.</p>
            <div class="rating-buttons">
              <button v-for="n in 5" 
                      :key="n" 
                      class="rating-button"
                      :class="{ active: ratings['q1'] === n }"
                      @click="setRating('q1', n)">
                {{ n }}
              </button>
            </div>
          </div>

          <div class="question-item">
            <p class="question-text">В компаниях я часто становлюсь душой коллектива.</p>
            <div class="rating-buttons">
              <button v-for="n in 5" 
                      :key="n" 
                      class="rating-button"
                      :class="{ active: ratings['q2'] === n }"
                      @click="setRating('q2', n)">
                {{ n }}
              </button>
            </div>
          </div>

          <div class="question-item">
            <p class="question-text">У меня бывает быстрое изменение настроения.</p>
            <div class="rating-buttons">
              <button v-for="n in 5" 
                      :key="n" 
                      class="rating-button"
                      :class="{ active: ratings['q3'] === n }"
                      @click="setRating('q3', n)">
                {{ n }}
              </button>
            </div>
          </div>

          <div class="question-item">
            <p class="question-text">Я стараюсь выполнять задачи сразу, не откладывая.</p>
            <div class="rating-buttons">
              <button v-for="n in 5" 
                      :key="n" 
                      class="rating-button"
                      :class="{ active: ratings['q4'] === n }"
                      @click="setRating('q4', n)">
                {{ n }}
              </button>
            </div>
          </div>

          <div class="question-item">
            <p class="question-text">Я часто беру инициативу в свои руки.</p>
            <div class="rating-buttons">
              <button v-for="n in 5" 
                      :key="n" 
                      class="rating-button"
                      :class="{ active: ratings['q5'] === n }"
                      @click="setRating('q5', n)">
                {{ n }}
              </button>
            </div>
          </div>

          <div class="question-item">
            <p class="question-text">Мне нужно время, чтобы войти в рабочий ритм.</p>
            <div class="rating-buttons">
              <button v-for="n in 5" 
                      :key="n" 
                      class="rating-button"
                      :class="{ active: ratings['q6'] === n }"
                      @click="setRating('q6', n)">
                {{ n }}
              </button>
            </div>
          </div>

          <div class="question-item">
            <p class="question-text">Я легко устаю от однообразия и стремлюсь к переменам.</p>
            <div class="rating-buttons">
              <button v-for="n in 5" 
                      :key="n" 
                      class="rating-button"
                      :class="{ active: ratings['q7'] === n }"
                      @click="setRating('q7', n)">
                {{ n }}
              </button>
            </div>
          </div>

          <div class="question-item">
            <p class="question-text">Я могу полностью погрузиться в дело и забыть о времени.</p>
            <div class="rating-buttons">
              <button v-for="n in 5" 
                      :key="n" 
                      class="rating-button"
                      :class="{ active: ratings['q8'] === n }"
                      @click="setRating('q8', n)">
                {{ n }}
              </button>
            </div>
          </div>

          <div class="question-item">
            <p class="question-text">Я стараюсь избегать конфликтов и поддерживать мирную обстановку.</p>
            <div class="rating-buttons">
              <button v-for="n in 5" 
                      :key="n" 
                      class="rating-button"
                      :class="{ active: ratings['q9'] === n }"
                      @click="setRating('q9', n)">
                {{ n }}
              </button>
            </div>
          </div>

          <div class="question-item">
            <p class="question-text">Мне трудно сосредоточиться, если вокруг шумно или много людей.</p>
            <div class="rating-buttons">
              <button v-for="n in 5" 
                      :key="n" 
                      class="rating-button"
                      :class="{ active: ratings['q10'] === n }"
                      @click="setRating('q10', n)">
                {{ n }}
              </button>
            </div>
          </div>
        </div>

        <div class="navigation-buttons">
          <router-link to="/test/block4" class="nav-button prev">
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
import { useAuthStore } from '@/stores/auth'
import { useTestStore } from '@/stores/test'
import { surveyService } from '@/services/api'

export default {
  name: 'TestBlock5',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const testStore = useTestStore()
    const ratings = ref({
      q1: null,
      q2: null,
      q3: null,
      q4: null,
      q5: null,
      q6: null,
      q7: null,
      q8: null,
      q9: null,
      q10: null
    })

    const setRating = (question, rating) => {
      ratings.value[question] = rating
    }

    const handleNext = async () => {
      // Проверяем, все ли поля заполнены
      const allFilled = Object.values(ratings.value).every(rating => rating !== null)
      
      if (!allFilled) {
        alert('Пожалуйста, ответьте на все вопросы перед тем как продолжить')
        return
      }

      // Проверяем авторизацию
      if (!authStore.isAuthenticated) {
        alert('Для сохранения результатов необходимо авторизоваться')
        router.push('/auth')
        return
      }

      try {
        // Сохраняем результаты текущего блока
        testStore.saveBlockResults(5, ratings.value)

        // Получаем все результаты из store
        const allResults = testStore.testResults

        // Проверяем, что все блоки заполнены
        const allBlocksFilled = Object.values(allResults).every(block => 
          block && Object.keys(block).length > 0
        )

        if (!allBlocksFilled) {
          alert('Пожалуйста, заполните все блоки теста')
          return
        }

        console.log('Sending results:', {
          userId: authStore.user?.id || authStore.user?._id,
          block1: allResults.block1,
          block2: allResults.block2,
          block3: allResults.block3,
          block4: allResults.block4,
          block5: allResults.block5
        })

        // Отправляем все результаты на сервер
        await surveyService.saveTestResults({
          block1: allResults.block1,
          block2: allResults.block2,
          block3: allResults.block3,
          block4: allResults.block4,
          block5: allResults.block5
        })

        // Очищаем store после успешной отправки
        testStore.clearResults()
        
        // Переходим на страницу результатов
        router.push('/test/results')
      } catch (error) {
        console.error('Error saving test results:', error)
        alert('Произошла ошибка при сохранении результатов. Пожалуйста, попробуйте позже.')
      }
    }

    return {
      ratings,
      setRating,
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
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin-top: 2rem;
}

.test-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.block-header {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

.block-header h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.block-description {
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
}

.questions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  padding-right: 1rem;
}

.questions::-webkit-scrollbar {
  width: 8px;
}

.questions::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.questions::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.questions::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.question-item {
  background-color: #98a3b3;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.question-text {
  color: white;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.rating-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.rating-button {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.rating-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.rating-button.active {
  background-color: white;
  color: #98a3b3;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.nav-button {
  background-color: white;
  color: #98a3b3;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.nav-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.nav-button.next {
  padding-right: 1.5rem;
}

.nav-button i {
  font-size: 0.9rem;
}
</style> 