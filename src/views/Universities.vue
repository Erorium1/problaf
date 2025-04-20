<template>
  <div class="universities">
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <button @click="$router.go(-1)" class="btn btn-link p-0 me-3">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h1 class="navbar-brand mb-0">Страны по топ ВУЗам</h1>
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

      <div class="country-list">
        <button 
          v-for="country in countries" 
          :key="country.code"
          class="country-button"
          @click="selectCountry(country.code)"
        >
          <span class="country-code">{{ country.code }}</span>
          {{ country.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Universities',
  data() {
    return {
      countries: [
        { code: 'US', name: 'США' },
        { code: 'CA', name: 'Канада' },
        { code: 'KR', name: 'Южная Корея' },
        { code: 'CN', name: 'Китай' },
        { code: 'HK', name: 'Гонконг' },
        { code: 'JP', name: 'Япония' },
        { code: 'DE', name: 'Германия' },
        { code: 'FR', name: 'Франция' },
        { code: 'MY', name: 'Малайзия' },
        { code: 'SG', name: 'Сингапур' }
      ]
    }
  },
  methods: {
    selectCountry(code) {
      // В будущем здесь будет переход на страницу конкретной страны
      console.log('Selected country:', code)
    }
  }
}
</script>

<style scoped>
.universities {
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

.country-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.country-button {
  background-color: #98a3b3;
  border: none;
  border-radius: 15px;
  padding: 1rem;
  color: white;
  text-align: left;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.country-button:hover {
  background-color: #7a8699;
  transform: translateY(-2px);
}

.country-code {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  margin-right: 1rem;
  font-size: 0.9rem;
  min-width: 45px;
  text-align: center;
  text-transform: uppercase;
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
}
</style> 