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
        <button class="bg-black btn btn-close-sidebar p-0" @click="closeSidebar" title="Закрыть">
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
        </div>
      </div>

      <div class="chat-messages" v-if="showChat">
        <div
          v-for="(message, index) in currentChatMessages"
          :key="index"
          :class="['message', message.type === 'user' ? 'user-message' : 'ai-message']"
        >
          <div class="message-content">
            {{ message.text }}
          </div>
        </div>

        <!-- Прелоадер в виде печатающего ИИ -->
        <div v-if="isLoading" class="message ai-message typing-indicator">
          <div class="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

   
      <div class="voice-controls" >
        <div class="search-input-container">
          <div class="search-input-wrapper">
            <input
              type="text"
              class="search-input"
              placeholder="Введите текст..."
              v-model="userInput"
              @keyup.enter="sendMessage"
              :disabled="isLoading"
            >
            <div class="search-icons">
              <button 
                class="search-icon-button" 
                @click="sendMessage"
                :disabled="isLoading || !userInput.trim()"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Сообщения об ошибках -->
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { gptService, geminiService } from '@/services/api'
import { authService } from '@/services/api'
import { useRouter } from 'vue-router'

export default {
  name: 'AIAssistant',
  setup() {
    const router = useRouter()
    const userInput = ref('')
    const isLoading = ref(false)
    const error = ref(null)
    const showChat = ref(false)
    const isSidebarOpen = ref(false)
    const userChats = ref([])
    const selectedChatId = ref(null)
    const allMessages = ref([])

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value
    }

    const closeSidebar = () => {
      isSidebarOpen.value = false
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

    const currentChatMessages = computed(() => allMessages.value)

    const handleAction = (action) => {
      if (action === 'test') {
        router.push('/test')
      } else if (action === 'survey') {
        router.push('/survey/block1')
      } else if (action === 'career') {
        userInput.value = 'Помоги мне создать карьерный план'
        showChat.value = true
      }
    }

    const sendMessage = async () => {
      if (!userInput.value.trim() || isLoading.value) return

      const userMessage = userInput.value.trim()
      userInput.value = ''
      isLoading.value = true
      error.value = null
      showChat.value = true

      try {
        // Сначала отправляем сообщение в Gemini API
        const aiResponse = await geminiService.sendMessage(userMessage)
        
        // Затем сохраняем сообщение и ответ локально (в localStorage), без запроса на бэкенд
        const response = await gptService.saveChat(userMessage, aiResponse, selectedChatId.value)
        // Устанавливаем/обновляем ID чата
        selectedChatId.value = response.chatId
        
        // Добавляем сообщения в текущий чат
        allMessages.value.push({
          type: 'user',
          text: userMessage,
          timestamp: new Date().toISOString()
        })
        
        allMessages.value.push({
          type: 'ai',
          text: aiResponse,
          timestamp: new Date().toISOString()
        })

        // Обновляем список чатов
        await loadUserChats()
      } catch (err) {
        error.value = 'Ошибка при отправке сообщения: ' + (err.message || 'Неизвестная ошибка')
        console.error('Ошибка при отправке сообщения:', err)
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
      error,
      showChat,
      isSidebarOpen,
      userChats,
      selectedChatId,
      currentChatMessages,
      toggleSidebar,
      closeSidebar,
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
  background: radial-gradient(circle at top, #e0f2fe 0, #eef2ff 45%, #f9fafb 100%);
  position: relative;
  overflow: hidden;
}

.navbar {
  padding: 1rem;
  background: linear-gradient(to right, rgba(15, 23, 42, 0.92), rgba(30, 64, 175, 0.9));
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.35);
}

.navbar-brand {
  font-size: 1.25rem;
  margin-bottom: 0;
  color: #f9fafb;
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
  color: #0f172a;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 2rem 1.5rem;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
}

.ai-content h2 {
  font-size: 1.4rem;
  font-weight: 600;
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
  background: linear-gradient(135deg, #4f46e5, #06b6d4);
  border: none;
  border-radius: 15px;
  padding: 1rem;
  color: #f9fafb;
  text-align: center;
  font-size: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  cursor: pointer;
  line-height: 1.3;
}

.action-button:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 14px 30px rgba(59, 130, 246, 0.35);
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
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  position: relative;
}

.form-control {
  border: none;
  background: transparent;
  padding: 0.5rem;
  font-size: 1rem;
  color: #333;
  flex: 1;
  padding-right: 100px; /* Место для иконок */
}

.form-control:focus {
  outline: none;
  box-shadow: none;
}

.input-icons {
  position: absolute;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
}

.icon-button {
  background: none;
  border: none;
  padding: 0.5rem;
  color: #98a3b3;
  cursor: pointer;
  transition: color 0.3s ease;
}

.icon-button:hover {
  color: #7a8699;
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
  margin-left: 0.5rem;
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
  padding: 1rem;
}

.search-input-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;
}

.search-input-wrapper {
  background-color: #0f172a;
  border-radius: 999px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  position: relative;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.28);
}

.search-input {
  border: none;
  background: transparent;
  padding: 0.5rem;
  font-size: 1rem;
  color: #e5e7eb;
  flex: 1;
  padding-right: 100px;
}

.search-input:focus {
  outline: none;
  box-shadow: none;
}

.search-icons {
  position: absolute;
  right: 1rem;
  display: flex;
  gap: 0.75rem;
}

.search-icon-button {
  background: none;
  border: none;
  padding: 0.5rem;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-icon-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.search-icon-button:hover:not(:disabled) {
  color: #7a8699;
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
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 110px;
}

.message {
  max-width: 82%;
  padding: 1rem;
  border-radius: 1rem;
  animation: fadeIn 0.3s ease;
}

.user-message {
  align-self: flex-end;
  background: linear-gradient(135deg, #4f46e5, #06b6d4);
  color: #f9fafb;
  border-bottom-right-radius: 0.25rem;
  box-shadow: 0 10px 22px rgba(37, 99, 235, 0.35);
}

.ai-message {
  align-self: flex-start;
  background-color: #ffffff;
  color: #111827;
  border-bottom-left-radius: 0.25rem;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
  border: 1px solid rgba(148, 163, 184, 0.35);
}

.typing-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
}

.typing-indicator .dots {
  display: flex;
  gap: 4px;
}

.typing-indicator .dots span {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background-color: #6b7280;
  animation: blink 1s infinite ease-in-out;
}

.typing-indicator .dots span:nth-child(2) {
  animation-delay: 0.15s;
}

.typing-indicator .dots span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes blink {
  0%, 80%, 100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  40% {
    opacity: 1;
    transform: translateY(-2px);
  }
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

/* Добавим стили для индикатора загрузки и сообщений об ошибках */
.loading-indicator {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.error-message {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}
</style>
