<template>
  <div class="dashboard">
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <button class="navbar-toggler border-0" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="dropdown">
          <button class="btn btn-link p-0" type="button" data-bs-toggle="dropdown">
            <i class="fas fa-ellipsis-v"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Настройки</a></li>
            <li><a class="dropdown-item" href="#">Выйти</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container py-4">
      <!-- AI Assistant Card -->
      <router-link to="/ai-assistant" class="text-decoration-none">
        <div class="ai-assistant-card mb-4">
          <div class="card-content text-center">
            <div class="ai-icon">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="58" fill="none" stroke="white" stroke-width="2"/>
                <circle cx="45" cy="50" r="5" fill="white"/> <!-- Left eye -->
                <circle cx="75" cy="50" r="5" fill="white"/> <!-- Right eye -->
                <path d="M45,70 Q60,80 75,70" stroke="white" stroke-width="3" fill="none"/> <!-- Smile -->
              </svg>
            </div>
            <h3 class="text-white mb-2">ИИ-помощник</h3>
            <p class="text-white-50 mb-0">Нажмите, чтобы задать вопрос ИИ!</p>
          </div>
        </div>
      </router-link>

      <!-- Feature Cards Grid -->
      <div class="row g-4">
        <div class="col-6">
          <router-link to="/universities" class="text-decoration-none">
            <div class="feature-card">
              <div class="card-body text-center">
                <h4>ВУЗЫ</h4>
                <p class="small mb-0">Найди лучшие университеты и программы обучения</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-6">
          <router-link to="/professions" class="text-decoration-none">
            <div class="feature-card">
              <div class="card-body text-center">
                <h4>Профессии</h4>
                <p class="small mb-0">Изучи разные профессии и выбери свою!</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-6">
          <div class="feature-card">
            <div class="card-body text-center">
              <h4>Направления</h4>
              <p class="small mb-0">Определи, какие сферы тебе подходят</p>
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="feature-card">
            <div class="card-body text-center">
              <h4>Профориентологи</h4>
              <p class="small mb-0">Получай советы от экспертов</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #ffffff;
}

.navbar {
  padding: 1rem;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.ai-assistant-card {
  background-color: #98a3b3;
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ai-assistant-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.ai-icon {
  margin-bottom: 1rem;
}

.feature-card {
  background-color: #98a3b3;
  border-radius: 15px;
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.feature-card .card-body {
  padding: 1.5rem;
}

.feature-card h4 {
  color: white;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  line-height: 1.4;
}

.btn-link {
  color: #333;
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