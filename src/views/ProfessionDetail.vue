<template>
  <div class="profession-detail">
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <button @click="$router.go(-1)" class="btn btn-link p-0 me-3">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h1 class="navbar-brand mb-0">{{ title }}</h1>
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
        <div v-for="(item, index) in professionItems" :key="index" class="profession-item">
          <h3>{{ item.title }}</h3>
          <div class="description-list">
            <p v-for="(desc, i) in item.descriptions" :key="i">{{ desc }}</p>
          </div>
        </div>
      </div>

      <div class="navigation-buttons">
        <button class="nav-button" @click="$router.go(-1)">
          <i class="fas fa-chevron-left"></i>
          Предыдущий
        </button>
        <button class="nav-button" @click="goToNext">
          Следующий
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfessionDetail',
  data() {
    return {
      title: 'Информационные технологии (IT)',
      professionItems: [
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
        },
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
            '- соединяет разработку и администрирование, автоматизирует процессы.'
          ]
        }
      ]
    }
  },
  methods: {
    goToNext() {
      // Handle navigation to next profession
      console.log('Navigate to next profession')
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