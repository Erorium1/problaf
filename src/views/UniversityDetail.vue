<template>
  <div class="university-detail">
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <button @click="$router.go(-1)" class="btn btn-link p-0 me-3">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h1 class="navbar-brand mb-0">{{ university?.name || 'Университет' }}</h1>
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

      <div v-if="loading">
        Загрузка данных об университете...
      </div>
      <div v-else-if="error">
        Ошибка загрузки данных: {{ error.message }}
      </div>
      <div v-else-if="university" class="university-info-card">
        <h2>{{ university.name }}</h2>

        <div v-if="university.directions && university.directions.length > 0" class="info-section">
          <h3>Направления:</h3>
          <ul>
            <li v-for="direction in university.directions" :key="direction">{{ direction }}</li>
          </ul>
        </div>

        <div v-if="university.requirements && university.requirements.length > 0" class="info-section">
          <h3>Требования:</h3>
          <ul>
            <li v-for="requirement in university.requirements" :key="requirement">{{ requirement }}</li>
          </ul>
        </div>

        <div v-if="university.documents && university.documents.length > 0" class="info-section">
          <h3>Документы:</h3>
          <ul>
            <li v-for="document in university.documents" :key="document">{{ document }}</li>
          </ul>
        </div>

        <div v-if="university.features && university.features.length > 0" class="info-section">
          <h3>Особенности:</h3>
          <ul>
            <li v-for="feature in university.features" :key="feature">{{ feature }}</li>
          </ul>
        </div>
      </div>
      <div v-else>
        Информация об университете не найдена.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UniversityDetail',
  data() {
    return {
      universityData: null,
      loading: true,
      error: null
    };
  },
  async created() {
    try {
      const response = await fetch('/universities.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.universityData = await response.json();
      this.loading = false;
    } catch (e) {
      this.error = e;
      this.loading = false;
      console.error("Could not load university data:", e);
    }
  },
  computed: {
    university() {
      if (!this.universityData) {
        return null;
      }
      const code = this.$route.params.code;
      const universityId = this.$route.params.universityId;
      const universities = this.universityData[code] || [];
      return universities.find(uni => uni.id === universityId);
    }
  }
};
</script>

<style scoped>
.university-detail {
  min-height: 100vh;
  background-color: #ffffff; /* White background */
}

.navbar {
  padding: 1rem;
  background-color: #fff;
}

.navbar-brand {
  font-size: 1.25rem;
  margin-bottom: 0;
  color: #333;
}

.btn-home {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #98a3b3; /* Grey-blue home button */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.3s ease;
}

.btn-home:hover {
  background-color: #7a8699; /* Darker grey-blue on hover */
  transform: translateY(-2px);
}

.university-info-card {
  background-color: #98a3b3; /* Grey-blue card background */
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  color: white; /* Set default text color to white for better contrast */
}

.university-info-card h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white !important; /* Ensure white color for the title */
}

.info-section {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: #e9ecef; /* Light grey section background */
  color: #333; /* Set text color for the sections */
}

.info-section h3 {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: #555;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.25rem;
}

.info-section ul {
  padding-left: 1.5rem;
  list-style-type: disc;
  color: #333;
}

.info-section li {
  margin-bottom: 0.3rem;
  font-size: 0.95rem;
}

.btn-link {
  color: #333;
  text-decoration: none;
}

.dropdown-menu {
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  padding: 0.5rem 1.5rem;
  color: #333;
}

/* Remove specific accent colors as they are now driven by the main card */
/* .university-info-card h2 {
  color: #7a8699;
}

.info-section h3 {
  color: #98a3b3;
} */

@media (max-width: 576px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .university-info-card {
    padding: 1rem;
  }

  .university-info-card h2 {
    font-size: 1.25rem;
  }

  .info-section h3 {
    font-size: 1rem;
  }

  .info-section ul {
    padding-left: 1rem;
  }

  .info-section li {
    font-size: 0.9rem;
  }
}
</style>