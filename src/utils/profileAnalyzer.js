// Константы для категорий профилей
export const PROFILE_TYPES = {
  ANALYST: 'A',      // Аналитик
  COMMUNICATOR: 'K', // Коммуникатор
  CREATOR: 'T',      // Творец
  LEADER: 'L',       // Лидер
  EXECUTOR: 'I',     // Исполнитель
  ENTREPRENEUR: 'P'  // Предприниматель
}

// Маппинг ответов на баллы
const ANSWER_SCORES = {
  // Блок 1
  q1_1: {
    '9-18': { [PROFILE_TYPES.EXECUTOR]: 2 },
    'flexible': { [PROFILE_TYPES.ENTREPRENEUR]: 2, [PROFILE_TYPES.CREATOR]: 1 },
    'evening': { [PROFILE_TYPES.CREATOR]: 2, [PROFILE_TYPES.ANALYST]: 1 }
  },
  q1_2: {
    'income': { [PROFILE_TYPES.ENTREPRENEUR]: 2 },
    'growth': { [PROFILE_TYPES.ANALYST]: 1, [PROFILE_TYPES.ENTREPRENEUR]: 1, [PROFILE_TYPES.CREATOR]: 1 },
    'help': { [PROFILE_TYPES.COMMUNICATOR]: 2 },
    'stability': { [PROFILE_TYPES.EXECUTOR]: 2 }
  },
  q1_3: {
    'leader': { [PROFILE_TYPES.LEADER]: 2 },
    'specialist': { [PROFILE_TYPES.ANALYST]: 1, [PROFILE_TYPES.EXECUTOR]: 1 },
    'support': { [PROFILE_TYPES.COMMUNICATOR]: 2 }
  },
  q1_4: {
    'people': { [PROFILE_TYPES.COMMUNICATOR]: 2 },
    'tech': { [PROFILE_TYPES.ANALYST]: 2 },
    'data': { [PROFILE_TYPES.ANALYST]: 2 },
    'creative': { [PROFILE_TYPES.CREATOR]: 2 }
  },
  // Блок 2
  q2_1: {
    'alone': { [PROFILE_TYPES.ANALYST]: 2 },
    'team': { [PROFILE_TYPES.COMMUNICATOR]: 2 },
    'group': { [PROFILE_TYPES.EXECUTOR]: 1, [PROFILE_TYPES.ANALYST]: 1 }
  },
  q2_2: {
    'result': { [PROFILE_TYPES.ENTREPRENEUR]: 2 },
    'recognition': { [PROFILE_TYPES.LEADER]: 2 },
    'benefit': { [PROFILE_TYPES.COMMUNICATOR]: 2 }
  },
  q2_3: {
    'expert': { [PROFILE_TYPES.ANALYST]: 2 },
    'organizer': { [PROFILE_TYPES.LEADER]: 2 },
    'helper': { [PROFILE_TYPES.COMMUNICATOR]: 2 }
  },
  q2_4: {
    'oneplace': { [PROFILE_TYPES.EXECUTOR]: 2 },
    'travel': { [PROFILE_TYPES.ENTREPRENEUR]: 2 },
    'ready': { [PROFILE_TYPES.EXECUTOR]: 1, [PROFILE_TYPES.ENTREPRENEUR]: 1 }
  },
  // Блок 3
  q3_1: {
    'calm': { [PROFILE_TYPES.ANALYST]: 2 },
    'fast': { [PROFILE_TYPES.LEADER]: 2 },
    'positive': { [PROFILE_TYPES.COMMUNICATOR]: 2 }
  },
  q3_2: {
    'predictable': { [PROFILE_TYPES.EXECUTOR]: 2 },
    'decisions': { [PROFILE_TYPES.ENTREPRENEUR]: 2 },
    'changes': { [PROFILE_TYPES.CREATOR]: 2, [PROFILE_TYPES.ENTREPRENEUR]: 1 }
  },
  q3_3: {
    'friendly': { [PROFILE_TYPES.COMMUNICATOR]: 2 },
    'clarity': { [PROFILE_TYPES.EXECUTOR]: 2 },
    'ideas': { [PROFILE_TYPES.CREATOR]: 2 }
  },
  q3_4: {
    'like': { [PROFILE_TYPES.EXECUTOR]: 2 },
    'variety': { [PROFILE_TYPES.CREATOR]: 2 },
    'notfor': { [PROFILE_TYPES.ENTREPRENEUR]: 1, [PROFILE_TYPES.CREATOR]: 1 }
  },
  // Блок 4
  q4_1: {
    'lead': { [PROFILE_TYPES.LEADER]: 2 },
    'clear': { [PROFILE_TYPES.EXECUTOR]: 2 },
    'own': { [PROFILE_TYPES.EXECUTOR]: 1 }
  },
  q4_2: {
    'act': { [PROFILE_TYPES.LEADER]: 2 },
    'analyze': { [PROFILE_TYPES.ANALYST]: 2 },
    'together': { [PROFILE_TYPES.COMMUNICATOR]: 2 }
  },
  q4_3: {
    'very': { [PROFILE_TYPES.ENTREPRENEUR]: 2 },
    'goals': { [PROFILE_TYPES.ENTREPRENEUR]: 1, [PROFILE_TYPES.EXECUTOR]: 1 },
    'instructions': { [PROFILE_TYPES.EXECUTOR]: 2 }
  },
  // Блок 5
  q5_1: {
    'lifetime': { [PROFILE_TYPES.ANALYST]: 2, [PROFILE_TYPES.ENTREPRENEUR]: 1 },
    'courses': { [PROFILE_TYPES.EXECUTOR]: 1, [PROFILE_TYPES.ENTREPRENEUR]: 1 },
    'practice': { [PROFILE_TYPES.EXECUTOR]: 2 }
  },
  q5_2: {
    'career': { [PROFILE_TYPES.ENTREPRENEUR]: 2, [PROFILE_TYPES.LEADER]: 1 },
    'business': { [PROFILE_TYPES.ENTREPRENEUR]: 3 },
    'calm': { [PROFILE_TYPES.EXECUTOR]: 2 }
  }
}

// Рекомендации для каждого профиля
export const PROFILE_RECOMMENDATIONS = {
  [PROFILE_TYPES.ANALYST]: {
    name: 'Аналитик',
    suitableProfessions: ['программист', 'аналитик данных', 'инженер', 'экономист'],
    advice: 'Ищите роли с задачами, где важны логика и структура'
  },
  [PROFILE_TYPES.COMMUNICATOR]: {
    name: 'Коммуникатор',
    suitableProfessions: ['психолог', 'преподаватель', 'HR', 'врач', 'соцработник'],
    advice: 'Выбирайте профессии, где важны эмоции и взаимодействие'
  },
  [PROFILE_TYPES.CREATOR]: {
    name: 'Творец',
    suitableProfessions: ['дизайнер', 'журналист', 'художник', 'маркетолог'],
    advice: 'Вам важна свобода и вдохновение – ищите креативные проекты'
  },
  [PROFILE_TYPES.LEADER]: {
    name: 'Лидер',
    suitableProfessions: ['менеджер', 'директор', 'проектный координатор'],
    advice: 'Развивайте навыки управления и принятия решений'
  },
  [PROFILE_TYPES.EXECUTOR]: {
    name: 'Исполнитель',
    suitableProfessions: ['бухгалтер', 'архивист', 'лаборант', 'диспетчер'],
    advice: 'Выбирайте стабильную работу с чёткими правилами'
  },
  [PROFILE_TYPES.ENTREPRENEUR]: {
    name: 'Предприниматель',
    suitableProfessions: ['бизнесмен', 'стартапер', 'маркетолог', 'менеджер проектов'],
    advice: 'Ищите гибкие направления с возможностью роста и свободы'
  }
}

// Функция для анализа ответов и определения профиля
export function analyzeProfile(answers) {
  // Инициализация счетчиков для каждого профиля
  const scores = {
    [PROFILE_TYPES.ANALYST]: 0,
    [PROFILE_TYPES.COMMUNICATOR]: 0,
    [PROFILE_TYPES.CREATOR]: 0,
    [PROFILE_TYPES.LEADER]: 0,
    [PROFILE_TYPES.EXECUTOR]: 0,
    [PROFILE_TYPES.ENTREPRENEUR]: 0
  }

  // Подсчет баллов для каждого ответа
  Object.entries(answers).forEach(([question, answer]) => {
    const questionScores = ANSWER_SCORES[question]?.[answer]
    if (questionScores) {
      Object.entries(questionScores).forEach(([profile, score]) => {
        scores[profile] += score
      })
    }
  })

  // Определение максимального балла
  const maxScore = Math.max(...Object.values(scores))
  
  // Находим профили с максимальным баллом
  const topProfiles = Object.entries(scores)
    .filter(([_, score]) => score === maxScore)
    .map(([profile]) => profile)

  // Если есть два профиля с одинаковым максимальным баллом
  if (topProfiles.length === 2) {
    return {
      type: 'hybrid',
      profiles: topProfiles.map(profile => ({
        type: profile,
        ...PROFILE_RECOMMENDATIONS[profile]
      })),
      scores
    }
  }

  // Если есть один доминирующий профиль
  return {
    type: 'single',
    profile: {
      type: topProfiles[0],
      ...PROFILE_RECOMMENDATIONS[topProfiles[0]]
    },
    scores
  }
} 