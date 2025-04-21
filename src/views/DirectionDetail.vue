<template>
  <div class="direction-detail">
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <button @click="$router.go(-1)" class="btn btn-link p-0 me-3">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h1 class="navbar-brand mb-0">{{ currentDirection.title }}</h1>
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

      <div class="direction-content">
        <div class="info-card">
          <div class="section">
            <h3>Профильные предметы:</h3>
            <p>{{ currentDirection.subjects }}</p>
          </div>

          <div class="section">
            <h3>Профессии:</h3>
            <p>{{ currentDirection.professions }}</p>
          </div>

          <div class="section">
            <h3>Необходимые навыки:</h3>
            <p>{{ currentDirection.skills }}</p>
          </div>

          <div class="section">
            <h3>Плюсы:</h3>
            <p>{{ currentDirection.pros }}</p>
          </div>

          <div class="section">
            <h3>Минусы:</h3>
            <p>{{ currentDirection.cons }}</p>
          </div>

          <div v-if="currentDirection.whereToStudy" class="section">
            <h3>Где учиться:</h3>
            <p>{{ currentDirection.whereToStudy }}</p>
          </div>

          <div v-if="currentDirection.demand" class="section">
            <h3>Востребованность:</h3>
            <p>{{ currentDirection.demand }}</p>
          </div>
        </div>
      </div>

      <div class="navigation-buttons">
        <button class="nav-button" @click="$router.push('/directions')">
          <i class="fas fa-chevron-left"></i>
          Назад к направлениям
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DirectionDetail',
  data() {
    return {
      directions: {
        'physics-math': {
          title: 'Физико-математическое',
          subjects: 'математика, физика, информатика.',
          professions: 'Инженер, Физик, Математик, Аналитик, Программист, Исследователь',
          skills: 'Аналитическое и логическое мышление. Решение сложных задач. Моделирование процессов. Владение математическими методами и инструментами.',
          pros: 'Высокий уровень развития логики и аналитики. Широкий спектр применимости в различных отраслях. Возможность участия в инновационных проектах.',
          cons: 'Высокая сложность изучаемых дисциплин. Требуется постоянное обновление знаний.',
          whereToStudy: '',
          demand: ''
        },
        'chemistry-biology': {
          title: 'Химико-биологическое',
          subjects: 'химия, биология, экология.',
          professions: 'Врач, Фармацевт, Биохимик, Лаборант, Эколог',
          skills: 'Точность и внимательность. Умение проводить эксперименты и анализировать результаты. Знание лабораторного оборудования.',
          pros: 'Возможность работать в медицине и науке. Вклад в улучшение здоровья и экологии.',
          cons: 'Высокая ответственность. Длительный период обучения для некоторых профессий.',
          whereToStudy: 'Медицинские университеты. Биологические и химические факультеты вузов.',
          demand: 'Высокая, особенно в медицине, фармацевтике и экологии.'
        },
        'natural-sciences': {
          title: 'Естественные науки',
          subjects: 'биология, химия, география, физика.',
          professions: 'Геолог, Климатолог, Эколог, Биолог, Физик.',
          skills: 'Наблюдательность. Аналитическое мышление. Умение работать с данными и проводить исследования.',
          pros: 'Возможность участия в полевых исследованиях. Вклад в понимание и сохранение природы.',
          cons: 'Часто требуется работа в удаленных или труднодоступных местах. Зависимость от финансирования научных проектов.',
          whereToStudy: 'Факультеты естественных наук в университетах.',
          demand: 'Средняя, зависит от конкретной специализации и региона.'
        },
        'engineering': {
          title: 'Инженерное',
          subjects: 'физика, математика, черчение, информатика.',
          professions: 'Инженер-строитель, Механик, Авиастроитель, Инженер-электрик.',
          skills: 'Техническое мышление. Умение работать с чертежами и схемами. Знание специализированного программного обеспечения.',
          pros: 'Высокая востребованность на рынке труда. Возможность участия в крупных проектах.',
          cons: 'Высокая ответственность за результаты работы. Необходимость постоянного обучения и сертификации.',
          whereToStudy: 'Политехнические вузы. Технические университеты.',
          demand: 'Высокая, особенно в строительстве, энергетике и машиностроении.'
        },
        'it': {
          title: 'Информационные технологии (IT)',
          subjects: 'информатика, математика, английский язык.',
          professions: 'Программист, Тестировщик, Веб-разработчик, Аналитик данных.',
          skills: 'Владение языками программирования. Логическое мышление. Способность к быстрому обучению.',
          pros: 'Высокая зарплата. Возможность удаленной работы. Быстрый карьерный рост.',
          cons: 'Высокая конкуренция. Необходимость постоянного обновления знаний.',
          whereToStudy: 'IT-академии. Технические университеты. Онлайн-курсы.',
          demand: 'Очень высокая, особенно в сфере разработки программного обеспечения и кибербезопасности.'
        },
        'socio-economic': {
          title: 'Социально-экономическое',
          subjects: 'математика, обществознание, география, экономика.',
          professions: 'Экономист, Бухгалтер, Маркетолог, Бизнес-аналитик.',
          skills: 'Анализ данных. Понимание экономических процессов. Коммуникабельность.',
          pros: 'Широкий спектр карьерных возможностей. Возможность работы в различных отраслях.',
          cons: 'Высокая конкуренция. Зависимость от экономической ситуации в стране.',
          whereToStudy: 'Экономические факультеты университетов. Бизнес-школы.',
          demand: 'Высокая, особенно в крупных компаниях и финансовых учреждениях.'
        },
        'humanitarian': {
          title: 'Гуманитарное',
          subjects: 'литература, история, обществознание, иностранный язык.',
          professions: 'Журналист, Редактор, Переводчик, Историк, Лингвист.',
          skills: 'Критическое мышление. Владение языками. Способность к анализу текстов.',
          pros: 'Широкий спектр карьерных возможностей. Возможность работы в различных отраслях.',
          cons: 'Низкий уровень зарплат в некоторых профессиях. Высокая конкуренция.',
          whereToStudy: 'Гуманитарные факультеты университетов.',
          demand: 'Средняя, зависит от конкретной профессии и региона.'
        },
        'law': {
          title: 'Право и юриспруденция',
          subjects: 'обществознание, история, русский язык',
          professions: 'юрист, адвокат, прокурор, нотариус, следователь, судья, юрисконсульт',
          skills: 'аналитическое мышление, умение аргументировать и отстаивать позицию, знание законов и нормативных актов, письменная и устная грамотность',
          pros: 'высокий статус, широкий выбор профессий, возможность карьерного роста',
          cons: 'высокий уровень ответственности, часто стрессовые ситуации, необходимость постоянного обновления знаний',
          whereToStudy: 'юридические факультеты университетов, академии права и правосудия',
          demand: 'высокая в органах власти, компаниях, судах, нотариате и консалтинге'
        },
        'technical': {
          title: 'Техническое обслуживание и технологии производства',
          subjects: 'физика, технология, черчение, информатика',
          professions: 'техник, инженер по обслуживанию, наладчик',
          skills: 'работа с техникой, внимательность, знание механизмов',
          pros: 'стабильная работа, практичность',
          cons: 'физическая нагрузка, пыльные цеха',
          whereToStudy: 'техникумы, колледжи, вузы технического профиля',
          demand: 'техникумы, колледжи, вузы технического профиля'
        },
        'military': {
          title: 'Военное и оборонное',
          subjects: 'математика, физика, история, физическая подготовка',
          professions: 'военный, инженер-оружейник, разведчик',
          skills: 'дисциплина, физическая подготовка, технические знания',
          pros: 'престиж, льготы, стабильность',
          cons: 'опасность, строгая дисциплина',
          whereToStudy: 'военные академии, профильные училища',
          demand: 'высокая в армиях и оборонных структурах'
        },
        'ecology': {
          title: 'Экология и охрана природы',
          subjects: 'биология, химия, география',
          professions: 'эколог, инженер-эколог, исследователь окружающей среды',
          skills: 'аналитика, работа в лабораториях и на природе',
          pros: 'значимость для планеты, новые технологии',
          cons: 'не всегда высокая оплата',
          whereToStudy: 'эколого-биологические факультеты, университеты природопользования',
          demand: 'растет из-за глобальных вызовов'
        }
      }
    }
  },
  computed: {
    currentDirection() {
      return this.directions[this.$route.params.id] || {}
    }
  }
}
</script>

<style scoped>
.direction-detail {
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

.direction-content {
  margin-bottom: 2rem;
}

.info-card {
  background-color: #98a3b3;
  border-radius: 15px;
  padding: 1.5rem;
  color: white;
}

.section {
  margin-bottom: 1.5rem;
}

.section:last-child {
  margin-bottom: 0;
}

.section h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.section p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.4;
}

.navigation-buttons {
  display: flex;
  justify-content: flex-start;
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