<template>
  <div class="professions">
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <button @click="$router.go(-1)" class="btn btn-link p-0 me-3">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h1 class="navbar-brand mb-0">Профессии</h1>
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

      <div class="profession-list">
        <button 
          v-for="profession in professions" 
          :key="profession.id"
          class="profession-button"
          @click="selectProfession(profession.id)"
        >
          {{ profession.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Professions',
  data() {
    return {
      professions: [
        { id: 'law', name: 'Юриспруденция и право' },
        { id: 'transport', name: 'Транспорт и логистика' },
        { id: 'hospitality', name: 'Общественное питание и гостиничный бизнес' },
        { id: 'security', name: 'Безопасность и охрана' },
        { id: 'science', name: 'Наука и исследования' },
        { id: 'culture', name: 'Культура и искусство' },
        { id: 'sports', name: 'Спорт и фитнес' },
        { id: 'it', name: 'Информационные технологии (IT)' },
        { id: 'medicine', name: 'Здравоохранение и медицина' },
        { id: 'education', name: 'Образование и наука' },
        { id: 'finance', name: 'Финансы и бухгалтерия' },
        { id: 'engineering', name: 'Техническая и инженерная сфера' },
        { id: 'business', name: 'Бизнес и управление' },
        { id: 'creative', name: 'Креативные индустрии и искусство' },
        { id: 'agriculture', name: 'Сельское хозяйство и экология' }
      ]
    }
  },
  methods: {
    selectProfession(id) {
      if (id === 'law') {
        this.$router.push('/law-professions')
      } else {
        this.$router.push(`/profession/${id}`)
      }
    }
  }
}
</script>

<style scoped>
.professions {
  min-height: 100vh;
  background-color: #ffffff;
}

.navbar {
  padding: 1rem;
  background-color: #fff;
}

.navbar-brand {
  font-size: 1.25rem;
  margin-bottom: 0;
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
}

.profession-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.profession-button {
  background-color: #98a3b3;
  border: none;
  border-radius: 15px;
  padding: 1rem;
  color: white;
  text-align: center;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  line-height: 1.3;
  white-space: normal;
  height: auto;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profession-button:hover {
  background-color: #7a8699;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.btn-link {
  color: #333;
  text-decoration: none;
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
  
  .profession-button {
    font-size: 0.9rem;
    padding: 0.75rem;
  }
}
</style> 