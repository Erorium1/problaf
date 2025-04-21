<template>
  <div class="profession-detail">
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <button @click="$router.go(-1)" class="btn btn-link p-0 me-3">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h1 class="navbar-brand mb-0">{{ professionData.title }}</h1>
        </div>
        <div class="dropdown">
          <button class="btn btn-link p-0" type="button" data-bs-toggle="dropdown">
            <i class="fas fa-ellipsis-v"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Настройки</a></li>
            <li><a class="dropdown-item" href="#">Помощь</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container py-4">
      <div class="home-button mb-4">
        <router-link to="/dashboard" class="btn btn-home">
          <i class="fas fa-home"></i>
        </router-link>
      </div>

      <div class="profession-items">
        <div v-for="(profession, index) in professions" :key="index" class="profession-item">
          <h3>{{ profession.title }}</h3>
          <div class="description-list">
            <p v-for="(desc, i) in profession.descriptions" :key="i">{{ desc }}</p>
          </div>
        </div>
      </div>

      <div class="navigation-buttons">
        <button v-if="currentPage > 1" class="nav-button" @click="goToPrevious">
          <i class="fas fa-chevron-left"></i>
          Предыдущий
        </button>
        <button v-if="hasNextPage" class="nav-button" @click="goToNext">
          Следующий
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
    <!-- test -->
  </div>
</template>

<script>
export default {
  name: 'ProfessionDetail',
  data() {
    return {
      currentPage: 1,
      totalPages: 1,
      professions: [],
      professionData: {
        law: {
          title: 'Юриспруденция и право',
          pages: {
            1: [
              {
                title: 'Адвокат',
                descriptions: [
                  '-защита прав',
                  '-консультирует по законам, составляет документы, представляет интересы.'
                ]
              },
              {
                title: 'Судья',
                descriptions: [
                  '-принятие решений',
                  '-выносит приговоры и решения по делам.'
                ]
              },
              {
                title: 'Прокурор',
                descriptions: [
                  '-контроль закона',
                  '-поддерживает обвинение в суде, следит за законностью действий.'
                ]
              }
            ],
            2: [
              {
                title: 'Нотариус',
                descriptions: [
                  '-оформление сделок',
                  '-удостоверяет документы, завещания и договоры.'
                ]
              },
              {
                title: 'Следователь',
                descriptions: [
                  '-раскрытие преступлений',
                  '-собирает доказательства и ведёт уголовные дела.'
                ]
              }
            ]
          }
        },
        transport: {
          title: 'Транспорт и логистика',
          pages: {
            1: [
              {
                title: 'Логист',
                descriptions: [
                  '-оптимизация маршрутов',
                  '-планирует доставку товаров и контролирует логистические процессы'
                ]
              },
              {
                title: 'Водитель грузового транспорта',
                descriptions: [
                  '-стабильный доход',
                  '-перевозит грузы на дальние и ближние расстояния.'
                ]
              },
              {
                title: 'Диспетчер',
                descriptions: [
                  '-координация транспорта',
                  '-управляет движением транспорта и следит за графиками.'
                ]
              },
              {
                title: 'Механик по транспорту',
                descriptions: [
                  '-технические навыки',
                  '-обслуживает и ремонтирует транспортные средства.'
                ]
              }
            ],
            2: [
              {
                title: 'Экспедитор',
                descriptions: [
                  '-сопровождение грузов',
                  '-организует и контролирует доставку товара до клиента.'
                ]
              },
              {
                title: 'Пилот',
                descriptions: [
                  '-престиж и путешествия',
                  '-управляет самолётами и отвечает за безопасность полёта.'
                ]
              },
              {
                title: 'Капитан судна',
                descriptions: [
                  '-международные маршруты',
                  '-руководит кораблём и экипажем на водных путях.'
                ]
              },
              {
                title: 'Железнодорожник (машинист)',
                descriptions: [
                  '-высокая ответственность',
                  '-управляет поездами и следит за безопасностью движения.'
                ]
              }
            ],
            3: [
              {
                title: 'Специалист по таможне',
                descriptions: [
                  '-работа с документами и товарами',
                  '-проверяет грузы на границе и оформляет разрешения.'
                ]
              },
              {
                title: 'Инженер по логистике',
                descriptions: [
                  '-системный подход',
                  '-разрабатывает эффективные логистические схемы и процессы.'
                ]
              }
            ]
          }
        },
        hospitality: {
          title: 'Общественное питание и гостиничный бизнес',
          pages: {
            1: [
              {
                title: 'Повар',
                descriptions: [
                  '-творческая кухня',
                  '-готовит разнообразные блюда в ресторанах и кафе.'
                ]
              },
              {
                title: 'Кондитер',
                descriptions: [
                  '-сладкое искусство',
                  '-создает десерты, торты и выпечку.'
                ]
              },
              {
                title: 'Официант',
                descriptions: [
                  '-общение с людьми',
                  '-обслуживает гостей, принимает заказы и подает еду.'
                ]
              },
              {
                title: 'Бармен',
                descriptions: [
                  '-атмосфера и шоу',
                  '-готовит напитки и коктейли, обслуживает клиентов у барной стойки.'
                ]
              }
            ],
            2: [
              {
                title: 'Шеф-повар',
                descriptions: [
                  '-управление кухней',
                  '-руководит командой поваров, разрабатывает меню.'
                ]
              },
              {
                title: 'Администратор гостиницы',
                descriptions: [
                  '-организация сервиса',
                  '-встречает гостей, решает организационные вопросы и бронирования.'
                ]
              },
              {
                title: 'Горничная',
                descriptions: [
                  '- чистота и порядок',
                  '-убирает номера и следит за уютом в гостинице.'
                ]
              },
              {
                title: 'Менеджер ресторана',
                descriptions: [
                  '-контроль качества',
                  '-управляет персоналом, отвечает за сервис и финансы ресторана.'
                ]
              }
            ],
            3: [
              {
                title: 'Хостес',
                descriptions: [
                  '-гостеприимство',
                  '-встречает гостей в ресторане и помогает выбрать столик.'
                ]
              },
              {
                title: 'Портье',
                descriptions: [
                  '-первая встреча',
                  '-регистрирует гостей, помогает с багажом и навигацией в отеле.'
                ]
              }
            ]
          }
        },
        it: {
          title: 'Информационные технологии (IT)',
          pages: {
            1: [
              {
                title: 'Программист / Разработчик ПО',
                descriptions: [
                  '-высокий доход',
                  '-пишет код для создания программ и приложений.'
                ]
              },
              {
                title: 'Веб-разработчик',
                descriptions: [
                  '-гибкий график',
                  '-делает сайты и веб-приложения.'
                ]
              },
              {
                title: 'Аналитик данных',
                descriptions: [
                  '-работа с цифрами',
                  '-ищет полезную информацию в больших массивах данных.'
                ]
              },
              {
                title: 'Разработчик мобильных приложений',
                descriptions: [
                  '-высокий спрос',
                  '-создает приложения для смартфонов.'
                ]
              }
            ],
            2: [
              {
                title: 'Специалист по кибербезопасности',
                descriptions: [
                  '-важность безопасности',
                  '-защищает системы от взломов и вирусов.'
                ]
              },
              {
                title: 'Системный администратор',
                descriptions: [
                  '-стабильная работа',
                  '-настраивает и следит за работой серверов и сетей.'
                ]
              },
              {
                title: 'Тестировщик / QA-инженер',
                descriptions: [
                  '-поиск ошибок',
                  '-проверяет программы на ошибки и баги.'
                ]
              },
              {
                title: 'DevOps-инженер',
                descriptions: [
                  '-автоматизация процессов',
                  '-соединяет разработку и администрирование, автоматизирует процессы.'
                ]
              }
            ],
            3: [
              {
                title: 'Machine Learning-инженер',
                descriptions: [
                  '-искусственный интеллект',
                  '-обучает компьютеры распознавать и предсказывать данные.'
                ]
              },
              {
                title: 'IT-проект-менеджер',
                descriptions: [
                  '-управление командой',
                  '-планирует работу команды и следит за сроками проектов.'
                ]
              }
            ]
          }
        },
        healthcare: {
          title: 'Здравоохранение и медицина',
          pages: {
            1: [
              {
                title: 'Врач',
                descriptions: [
                  '-помощь людям',
                  '-ставит диагнозы, лечит и спасает жизни.'
                ]
              },
              {
                title: 'Хирург',
                descriptions: [
                  '-высокая ответственность',
                  '-проводит операции и хирургические вмешательства.'
                ]
              },
              {
                title: 'Стоматолог',
                descriptions: [
                  '-высокая оплата',
                  '-лечит зубы и занимается гигиеной полости рта.'
                ]
              },
              {
                title: 'Медсестра / Медбрат',
                descriptions: [
                  '-забота о пациентах',
                  '-ухаживает за больными и помогает врачам.'
                ]
              }
            ]
          }
        },
        education: {
          title: 'Образование и наука',
          pages: {
            1: [
              {
                title: 'Педагог дополнительного образования',
                descriptions: [
                  '-развитие талантов',
                  '-обучает детей вне школы (кружки, секции, студии).'
                ]
              },
              {
                title: 'Библиотекарь / Информационный специалист',
                descriptions: [
                  '-доступ к знаниям',
                  '-помогает находить и использовать информацию и книги.'
                ]
              }
            ]
          }
        },
        finance: {
          title: 'Финансы и бухгалтерия',
          pages: {
            1: [
              {
                title: 'Бухгалтер',
                descriptions: [
                  '-стабильность',
                  '-ведёт учёт доходов и расходов компании.'
                ]
              },
              {
                title: 'Аудитор',
                descriptions: [
                  '-финансовый аналитик',
                  '-анализирует финансовые данные и помогает принимать решения.'
                ]
              },
              {
                title: 'Экономист',
                descriptions: [
                  '-понимание рынка',
                  '-исследует экономику, разрабатывает стратегии развития'
                ]
              },
              {
                title: 'Казначей',
                descriptions: [
                  '- управление деньгами',
                  '-отвечает за движение финансов в компании.'
                ]
              }
            ],
            2: [
              {
                title: 'Финансовый консультант',
                descriptions: [
                  '-помощь клиентам',
                  '-советует, как лучше управлять личными или бизнес-финансами.'
                ]
              },
              {
                title: 'Налоговый специалист',
                descriptions: [
                  '-знание законов',
                  '-рассчитывает и контролирует уплату налогов.'
                ]
              },
              {
                title: 'Инвестиционный менеджер',
                descriptions: [
                  '-работа с капиталом',
                  '-управляет активами и инвестициями клиентов.'
                ]
              },
              {
                title: 'Кредитный эксперт',
                descriptions: [
                  '-банковская стабильность',
                  '-оценивает заявки на кредиты и риски.'
                ]
              }
            ]
          }
        },
        engineering: {
          title: 'Техническая и инженерная сфера',
          pages: {
            1: [
              {
                title: 'Архитектор',
                descriptions: [
                  '-соединение искусства и расчётов',
                  '-разрабатывает внешний вид и планировку зданий.'
                ]
              },
              {
                title: 'Инженер по автоматизации',
                descriptions: [
                  '-оптимизация процессов',
                  '-создает системы, которые заменяют ручной труд машинами.'
                ]
              },
              {
                title: 'Инженер-химик',
                descriptions: [
                  '-работа с веществами',
                  '-разрабатывает технологии и формулы в химическом производстве.'
                ]
              },
              {
                title: 'Инженер по качеству',
                descriptions: [
                  '-контроль стандартов',
                  '-следит за качеством продукции на производстве.'
                ]
              }
            ],
            2: [
              {
                title: 'Инженер-эколог',
                descriptions: [
                  '-защита природы',
                  '-решает задачи по охране окружающей среды на производствах.'
                ]
              },
              {
                title: 'Техник / Мастер по обслуживанию',
                descriptions: [
                  '-практические навыки',
                  '-ремонтирует и обслуживает оборудование и технику.'
                ]
              }
            ]
          }
        },
        business: {
          title: 'Бизнес и управление',
          pages: {
            1: [
              {
                title: 'Предприниматель',
                descriptions: [
                  '-свобода действий',
                  '-создает и развивает собственное дело.'
                ]
              },
              {
                title: 'Менеджер по продажам',
                descriptions: [
                  '-бонусы и проценты',
                  '-ищет клиентов и продаёт товары или услуги.'
                ]
              },
              {
                title: 'Маркетолог',
                descriptions: [
                  '- креатив и аналитика',
                  '-продвигает продукты и анализирует рынок.'
                ]
              },
              {
                title: 'HR-менеджер (специалист по персоналу)',
                descriptions: [
                  '- работа с людьми',
                  '-нанимает сотрудников и создает комфорт в коллективе.'
                ]
              }
            ],
            2: [
              {
                title: 'Бизнес-аналитик',
                descriptions: [
                  '-анализ процессов',
                  '-изучает бизнес-процессы и предлагает улучшения.'
                ]
              },
              {
                title: 'Руководитель проектов',
                descriptions: [
                  '-организация работы',
                  '-управляет проектами и координирует команды.'
                ]
              },
              {
                title: 'Директор по развитию',
                descriptions: [
                  '-стратегическое мышление',
                  '-определяет направление развития компании.'
                ]
              }
            ]
          }
        }
      }
    }
  },
  computed: {
    hasNextPage() {
      return this.currentPage < this.totalPages
    }
  },
  methods: {
    goToNext() {
      if (this.hasNextPage) {
        this.currentPage++
        this.updateProfessions()
      }
    },
    goToPrevious() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.updateProfessions()
      }
    },
    updateProfessions() {
      const field = this.$route.params.field
      this.professions = this.professionData[field].pages[this.currentPage]
    },
    initializeProfessionField() {
      const field = this.$route.params.field
      if (this.professionData[field]) {
        this.totalPages = Object.keys(this.professionData[field].pages).length
        this.professions = this.professionData[field].pages[this.currentPage]
      }
    }
  },
  created() {
    this.initializeProfessionField()
  },
  watch: {
    '$route.params.field': {
      handler() {
        this.currentPage = 1
        this.initializeProfessionField()
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.profession-detail {
  min-height: 100vh;
  background-color: #ffffff;
}

.navbar {
  padding: 1rem;
  background-color: #ffffff;
}

.navbar-brand {
  font-size: 1.25rem;
  color: #333;
}

.btn-link {
  color: #333;
  text-decoration: none;
}

.btn-home {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #98a3b3;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.3s ease;
}

.btn-home:hover {
  background-color: #7a8699;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.profession-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.profession-item {
  background-color: #98a3b3;
  border-radius: 15px;
  padding: 1.5rem;
  color: white;
}

.profession-item h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.description-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.description-list p {
  margin: 0;
  font-size: 1rem;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
}

.nav-button {
  background-color: #98a3b3;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: #7a8699;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.dropdown-menu {
  border: none;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.dropdown-item {
  padding: 0.5rem 1.5rem;
}

@media (max-width: 576px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style> 