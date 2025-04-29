<template>
  <div class="profile-view">
    <div class="back-button">
      <router-link to="/" class="btn-back">
        <i class="fas fa-home"></i>
      </router-link>
    </div>
    <div class="survey-container">
      <div class="survey-content">
        <div class="block-header">
          <h2>ВАШ ПРОФИЛЬ</h2>
        </div>
        
        <div v-if="loading" class="loading">
          <p>Загрузка результатов...</p>
        </div>
        
        <div v-else-if="error" class="error">
          <p>{{ error }}</p>
          <router-link to="/survey/block1" class="nav-button next">
            <span>Пройти тест</span>
          </router-link>
        </div>
        
        <div v-else-if="profileResult.type === 'single'" class="single-profile">
          <div class="profile-header">
            <h3>{{ profileResult.profile.name }}</h3>
            <div class="profile-score">
              Баллы: {{ scores[profileResult.profile.type] }}
            </div>
          </div>
          
          <div class="profile-section">
            <h4>Тип личности:</h4>
            <p>{{ getPersonalityType(profileResult.profile.type) }}</p>
          </div>
          
          <div class="profile-section">
            <h4>Подходящие профессии:</h4>
            <ul class="professions-list">
              <li v-for="profession in profileResult.profile.suitableProfessions" :key="profession">
                {{ profession }}
              </li>
            </ul>
          </div>
          
          <div class="profile-section">
            <h4>Сильные стороны:</h4>
            <ul class="strengths-list">
              <li v-for="strength in getStrengths(profileResult.profile.type)" :key="strength">
                {{ strength }}
              </li>
            </ul>
          </div>
          
          <div class="profile-section">
            <h4>Советы:</h4>
            <p>{{ profileResult.profile.advice }}</p>
          </div>
          
          <div class="profile-section">
            <h4>Мотивация:</h4>
            <p>{{ getMotivation(profileResult.profile.type) }}</p>
          </div>
        </div>

        <div v-else-if="profileResult.type === 'hybrid'" class="hybrid-profile">
          <h3>Гибридный профиль</h3>
          <div class="profiles-grid">
            <div v-for="profile in profileResult.profiles" :key="profile.type" class="profile-card">
              <h4>{{ profile.name }}</h4>
              <div class="profile-score">
                Баллы: {{ scores[profile.type] }}
              </div>
              
              <div class="profile-section">
                <h5>Тип личности:</h5>
                <p>{{ getPersonalityType(profile.type) }}</p>
              </div>
              
              <div class="profile-section">
                <h5>Подходящие профессии:</h5>
                <ul class="professions-list">
                  <li v-for="profession in profile.suitableProfessions" :key="profession">
                    {{ profession }}
                  </li>
                </ul>
              </div>
              
              <div class="profile-section">
                <h5>Сильные стороны:</h5>
                <ul class="strengths-list">
                  <li v-for="strength in getStrengths(profile.type)" :key="strength">
                    {{ strength }}
                  </li>
                </ul>
              </div>
              
              <div class="profile-section">
                <h5>Советы:</h5>
                <p>{{ profile.advice }}</p>
              </div>
              
              <div class="profile-section">
                <h5>Мотивация:</h5>
                <p>{{ getMotivation(profile.type) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="no-profile">
          <p>Профиль не найден. Пожалуйста, пройдите тест.</p>
          <router-link to="/survey/block1" class="nav-button next">
            <span>Пройти тест</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { PROFILE_TYPES } from '@/utils/profileAnalyzer'
import { surveyService } from '@/services/api'

const PROFILE_DETAILS = {
  [PROFILE_TYPES.ANALYST]: {
    personalityType: 'Спокойный, логичный, внимательный к деталям. Предпочитает факты, цифры и анализ. Часто интроверт, любит работать в одиночку, ценит порядок и структуру.',
    strengths: [
      'Аналитическое мышление',
      'Умение работать с данными',
      'Высокая концентрация',
      'Рациональность и логика',
      'Точность и аккуратность'
    ],
    motivation: 'Чёткие задачи и понятные цели, возможность погружаться в исследование, минимум отвлекающих факторов и свобода в подходах'
  },
  [PROFILE_TYPES.COMMUNICATOR]: {
    personalityType: 'Общительный, открытый, легко находит контакт с людьми. Быстро адаптируется, умеет слушать и убеждать. Чувствителен к эмоциям других, часто — эмпат.',
    strengths: [
      'Эмпатия',
      'Навыки общения',
      'Гибкость',
      'Умение договариваться',
      'Работа в команде'
    ],
    motivation: 'Возможность влиять на людей, поддержка, признание и обратная связь, живое общение и разнообразие задач'
  },
  [PROFILE_TYPES.CREATOR]: {
    personalityType: 'Креативный, мечтательный, ищущий новые формы самовыражения. Любит создавать, нарушать шаблоны, генерировать идеи. Часто не любит рутину.',
    strengths: [
      'Креативность',
      'Умение мыслить нестандартно',
      'Чувство вкуса',
      'Эстетическое восприятие',
      'Богатое воображение'
    ],
    motivation: 'Возможность самовыражения, оригинальные задачи, эмоциональная свобода и атмосфера'
  },
  [PROFILE_TYPES.LEADER]: {
    personalityType: 'Амбициозный, уверенный, инициативный. Любит принимать решения, брать ответственность, вести за собой. Ценит эффективность и результат.',
    strengths: [
      'Лидерские качества',
      'Стратегическое мышление',
      'Организаторские способности',
      'Уверенность',
      'Умение принимать решения'
    ],
    motivation: 'Власть, влияние, результат, видимый прогресс, конкуренция и признание'
  },
  [PROFILE_TYPES.EXECUTOR]: {
    personalityType: 'Надёжный, трудолюбивый, дисциплинированный. Предпочитает работать по инструкции, не любит рисков и хаоса. Хорошо чувствует себя в чётких рамках.',
    strengths: [
      'Пунктуальность',
      'Ответственность',
      'Аккуратность',
      'Соблюдение сроков',
      'Устойчивость к рутине'
    ],
    motivation: 'Чёткие инструкции и стабильность, порядок и организация, уважение за качественную работу'
  },
  [PROFILE_TYPES.ENTREPRENEUR]: {
    personalityType: 'Рискованный, энергичный, независимый. Ищет новые идеи, любит свободу и самостоятельность. Не боится неудач и легко пробует новое.',
    strengths: [
      'Инициативность',
      'Стратегическое видение',
      'Энергия',
      'Креативность',
      'Настойчивость'
    ],
    motivation: 'Возможность строить своё дело, независимость, доход без потолка, динамика и вызовы'
  }
}

export default {
  name: 'Profile',
  setup() {
    const profileResult = ref({})
    const scores = ref({})
    const loading = ref(true)
    const error = ref(null)

    const getPersonalityType = (type) => PROFILE_DETAILS[type]?.personalityType || ''
    const getStrengths = (type) => PROFILE_DETAILS[type]?.strengths || []
    const getMotivation = (type) => PROFILE_DETAILS[type]?.motivation || ''

    onMounted(() => {
      try {
        const storedResult = localStorage.getItem('profile_result')
        if (storedResult) {
          const parsedResult = JSON.parse(storedResult)
          profileResult.value = parsedResult
          scores.value = parsedResult.scores || {}
        }
      } catch (err) {
        error.value = 'Ошибка при загрузке результатов'
        console.error('Error loading profile:', err)
      } finally {
        loading.value = false
      }
    })

    return {
      profileResult,
      scores,
      loading,
      error,
      getPersonalityType,
      getStrengths,
      getMotivation
    }
  }
}
</script>

<style scoped>
@import '@/assets/styles/survey.css';

.profile-view {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 2rem 0;
}

.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
}

.btn-back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background-color: #98a3b3;
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btn-back:hover {
  background-color: #7a8699;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.survey-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.survey-content {
  background-color: white;
  border-radius: 25px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin-top: 1rem;
}

.block-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.block-header h2 {
  color: #333;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  position: relative;
  display: inline-block;
}

.block-header h2:after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #98a3b3;
  border-radius: 3px;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f0f2f5;
}

.profile-header h3 {
  color: #333;
  font-size: 1.8rem;
  margin: 0;
  font-weight: 600;
}

.profile-score {
  background-color: #98a3b3;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(152, 163, 179, 0.2);
}

.profile-section {
  margin-bottom: 2.5rem;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 15px;
  transition: all 0.3s ease;
}

.profile-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.profile-section h4, .profile-section h5 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.profile-section p {
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
}

.professions-list, .strengths-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.professions-list li, .strengths-list li {
  padding: 0.8rem 0;
  border-bottom: 1px solid #e2e8f0;
  color: #4a5568;
  display: flex;
  align-items: center;
}

.professions-list li:before, .strengths-list li:before {
  content: '•';
  color: #98a3b3;
  font-weight: bold;
  margin-right: 0.8rem;
}

.professions-list li:last-child, .strengths-list li:last-child {
  border-bottom: none;
}

.hybrid-profile .profiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.hybrid-profile .profile-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.hybrid-profile .profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.no-profile {
  text-align: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 20px;
}

.nav-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background-color: #98a3b3;
  color: white;
  border: none;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  box-shadow: 0 4px 15px rgba(152, 163, 179, 0.2);
}

.nav-button:hover {
  background-color: #7a8699;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(152, 163, 179, 0.3);
}

.loading, .error {
  text-align: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 20px;
}

.loading p {
  color: #4a5568;
  font-size: 1.1rem;
}

.error {
  color: #dc3545;
}

.error p {
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .survey-container {
    padding: 0 1rem;
  }

  .survey-content {
    padding: 1.5rem;
  }

  .profile-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .hybrid-profile .profiles-grid {
    grid-template-columns: 1fr;
  }
}
</style> 