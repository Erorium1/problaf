```vue
<template>
  <div class="ai-assistant">
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <!-- Новая кнопка для открытия сайдбара -->
          <button class="btn btn-sidebar me-2" @click="toggleSidebar" title="Открыть чаты">
            <i class="fas fa-comment"></i>
          </button>
          <!-- Существующая кнопка меню -->
          <button class="btn btn-link p-0 me-3" @click="toggleSidebar">
            <i class="fas fa-bars"></i>
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

    <!-- Боковое меню -->
    <div class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <div class="sidebar-header">
        <h3>История чатов</h3>
        <button class=" bg-black btn btn-close-sidebar p-0" @click="closeSidebar" title="Закрыть">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="chat-list">
        <div v-for="chat in userChats"
             :key="chat.id"
             class="chat-item"
             :class="{ 'active': selectedChatId === chat.id }"
             @click="selectChat(chat.id)">
          <div class="chat-preview">
            <div class="chat-title">
              {{ chat.lastMessage?.message || 'Новый чат' }}
            </div>
            <div class="chat-date">
              {{ formatDate(chat.updatedAt) }}
            </div>
          </div>
          <div class="message-count">
            {{ chat.messageCount }}
          </div>
        </div>
      </div>
    </div>

    <div class="container py-4">
      <div class="home-button mb-4">
        <router-link to="/dashboard" class="btn btn-home">
          <i class="fas fa-home"></i>
        </router-link>
      </div>

      <div class="ai-content text-center" v-if="!showChat">
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

      <div class="chat-messages" v-else>
        <div v-for="(message, index) in currentChatMessages" :key="index"
             :class="['message', message.type === 'user' ? 'user-message' : 'ai-message']">
          <div class="message-content">
            {{ message.text }}
          </div>
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
            :disabled="isLoading"
          >
          <button
            class="btn btn-send"
            @click="sendMessage"
            :disabled="isLoading || !userInput.trim()"
          >
            <i class="fas" :class="isLoading ? 'fa-spinner fa-spin' : 'fa-paper-plane'"></i>
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
import { ref, onMounted, computed } from 'vue'
import { gptService } from '@/services/api'
import { authService } from '@/services/api'

export default {
  name: 'AIAssistant',
  setup() {
    const userInput = ref('')
    const isLoading = ref(false)
    const messages = ref([])
    const showChat = ref(false)
    const isSidebarOpen = ref(false)
    const userChats = ref([])
    const selectedChatId = ref(null)
    const allMessages = ref([])

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const loadUserChats = async () => {
      try {
        const response = await gptService.getUserChats()
        userChats.value = response.chats
      } catch (error) {
        console.error('Error loading chats:', error)
      }
    }

    const selectChat = async (chatId) => {
      selectedChatId.value = chatId
      showChat.value = true
      isSidebarOpen.value = false
      try {
        const response = await gptService.getChatMessages(chatId)
        allMessages.value = response.messages
      } catch (error) {
        console.error('Error loading chat messages:', error)
      }
    }

    const currentChatMessages = computed(() => {
      return allMessages.value.filter(msg => msg.chatId === selectedChatId.value)
    })

    const handleAction = (action) => {
      console.log('Selected action:', action)
    }

    const sendMessage = async () => {
      if (!userInput.value.trim() || isLoading.value) return

      const userMessage = userInput.value.trim()
      userInput.value = ''
      isLoading.value = true
      showChat.value = true

      try {
        const response = await gptService.sendMessage(userMessage)
        
        // Добавляем сообщения в текущий чат
        allMessages.value.push({
          type: 'user',
          text: userMessage,
          chatId: response.chatId
        })
        
        allMessages.value.push({
          type: 'ai',
          text: response.response,
          chatId: response.chatId
        })

        // Обновляем список чатов
        await loadUserChats()
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error)
      } finally {
        isLoading.value = false
      }
    }

    onMounted(() => {
      loadUserChats()
    })

    return {
      userInput,
      isLoading,
      messages,
      showChat,
      isSidebarOpen,
      userChats,
      selectedChatId,
      currentChatMessages,
      toggleSidebar,
      formatDate,
      selectChat,
      handleAction,
      sendMessage
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

/* Стили для новой кнопки сайдбара */
.btn-sidebar {
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.btn-sidebar:hover {
  background-color: #7a8699;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.btn-sidebar i {
  font-size: 1.2rem;
}

/* Обновление стилей для btn-link */
.btn-link {
  color: white;
  text-decoration: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-link:hover {
  color: #f0f0f0;
  transform: translateY(-2px);
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

.btn-send:hover:not(:disabled) {
  background-color: #7a8699;
  transform: translateY(-2px);
}

.btn-send:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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
  .btn-sidebar {
    width: 36px;
    height: 36px;
  }
  .btn-link {
    width: 36px;
    height: 36px;
  }
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 100px;
}

.message {
  max-width: 80%;
  padding: 1rem;
  border-radius: 1rem;
  animation: fadeIn 0.3s ease;
}

.user-message {
  align-self: flex-end;
  background-color: white;
  color: #98a3b3;
  border-bottom-right-radius: 0.25rem;
}

.ai-message {
  align-self: flex-start;
  background-color: white;
  color: #333;
  border-bottom-left-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100%;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  transition: left 0.3s ease;
  z-index: 1000;
}

.sidebar-open {
  left: 0;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h3 {
  margin: 0;
  color: #98a3b3;
}

.chat-list {
  padding: 1rem;
  overflow-y: auto;
  height: calc(100vh - 60px);
}

.chat-item {
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.chat-item:hover {
  background-color: #f8f9fa;
}

.chat-item.active {
  background-color: #98a3b3;
  color: white;
}

.chat-preview {
  flex: 1;
  margin-right: 1rem;
}

.chat-title {
  font-weight: 500;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-date {
  font-size: 0.8rem;
  color: #6c757d;
}

.chat-item.active .chat-date {
  color: rgba(255,255,255,0.8);
}

.message-count {
  background-color: #98a3b3;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.8rem;
}

.chat-item.active .message-count {
  background-color: white;
  color: #98a3b3;
}

</style>
