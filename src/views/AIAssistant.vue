<template>
  <div class="ai-assistant">
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <button @click="$router.go(-1)" class="btn btn-link p-0 me-3">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h1 class="navbar-brand mb-0">ИИ-помощник</h1>
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

      <div class="ai-content text-center">
        <div class="ai-icon mb-4">
          <!-- <img src="@/assets/magnifier.png" alt="AI Assistant" class="img-fluid"> -->
        </div>
        <h2 class="mb-4">Выбери что хочешь сделать</h2>
        <div class="action-buttons">
          <button class="action-button mb-3" @click="handleAction('test')">
            Пройти тест
          </button>
          <button class="action-button mb-3" @click="handleAction('survey')">
            Заполнить опрос
          </button>
          <button class="action-button mb-3" @click="handleAction('career')">
            Создать карьерный план
          </button>
          <button class="action-button" @click="handleAction('games')">
            Играть в мини игры
          </button>
        </div>
      </div>

      <div class="input-container">
        <div class="input-group">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Напишите ваш вопрос..."
            v-model="userInput"
            @keyup.enter="sendMessage"
          >
          <button 
            class="btn btn-send" 
            @click="sendMessage"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <div class="voice-controls">
        <button class="voice-button">
          <i class="fas fa-search"></i>
        </button>
        <button class="voice-button">
          <i class="fas fa-microphone"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AIAssistant',
  data() {
    return {
      userInput: ''
    }
  },
  methods: {
    handleAction(action) {
      console.log('Selected action:', action)
      // Handle different actions here
    },
    sendMessage() {
      if (this.userInput.trim()) {
        console.log('Sending message:', this.userInput)
        // Here you would handle sending the message
        this.userInput = '' // Clear input after sending
      }
    }
  }
}
</script>

<style scoped>
.ai-assistant {
  min-height: 100vh;
  background-color: #98a3b3;
}

.navbar {
  padding: 1rem;
  background-color: #98a3b3;
}

.navbar-brand {
  font-size: 1.25rem;
  margin-bottom: 0;
  color: white;
}

.btn-link {
  color: white;
  text-decoration: none;
}

.btn-home {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  color: #98a3b3;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.3s ease;
}

.btn-home:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}

.ai-content {
  color: white;
}

.ai-icon {
  max-width: 150px;
  margin: 0 auto;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 400px;
  margin: 0 auto;
}

.action-button {
  background-color: white;
  border: none;
  border-radius: 15px;
  padding: 1rem;
  color: #98a3b3;
  text-align: center;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  line-height: 1.3;
}

.action-button:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.input-container {
  position: fixed;
  bottom: 90px;
  left: 0;
  right: 0;
  padding: 0 1rem;
}

.input-group {
  background-color: white;
  border-radius: 25px;
  padding: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
}

.form-control {
  border: none;
  background: transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #333;
}

.form-control:focus {
  outline: none;
  box-shadow: none;
}

.btn-send {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #98a3b3;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-send:hover {
  background-color: #7a8699;
  transform: translateY(-2px);
}

.voice-controls {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

.voice-button {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: white;
  border: none;
  color: #98a3b3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.voice-button:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
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
  
  .action-button {
    font-size: 0.9rem;
    padding: 0.75rem;
  }
}
</style> 