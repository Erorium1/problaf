<template>
  <div class="directions">
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <button @click="$router.go(-1)" class="btn btn-link p-0 me-3">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h1 class="navbar-brand mb-0">Направления</h1>
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

      <div class="direction-list">
        <button 
          v-for="(direction, id) in directions" 
          :key="id"
          class="direction-button"
          @click="selectDirection(id)"
        >
          {{ direction.title }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Directions',
  data() {
    return {
      directions: {
        'physics-math': { title: 'Физико-математическое' },
        'chemistry-biology': { title: 'Химико-биологическое' },
        'natural-sciences': { title: 'Естественные науки' },
        'engineering': { title: 'Инженерное' },
        'it': { title: 'Информационные технологии (IT)' },
        'socio-economic': { title: 'Социально-экономическое' },
        'humanitarian': { title: 'Гуманитарное' },
        'law': { title: 'Право и юриспруденция' },
        'technical': { title: 'Техническое обслуживание и технологии производства' },
        'military': { title: 'Военное и оборонное' },
        'ecology': { title: 'Экология и охрана природы' }
      }
    }
  },
  methods: {
    selectDirection(id) {
      this.$router.push(`/direction/${id}`)
    }
  }
}
</script>

<style scoped>
.directions {
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

.direction-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.direction-button {
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

.direction-button:hover {
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
  
  .direction-button {
    font-size: 0.9rem;
    padding: 0.75rem;
  }
}
</style> 