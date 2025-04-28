<template>
    <div class="profren-view">
      <div class="back-button">
        <router-link to="/" class="btn-back">
          <i class="fas fa-home"></i>
        </router-link>
      </div>
      <div class="profren-container">
        <div class="profren-content">
          <div class="block-header">
            <h2>ЗАЯВКИ ПРОФРЕНТОЛОГОВ (НИША)</h2>
          </div>
  
          <section class="requests-section">
            <h3>Доступные заявки</h3>
            <div v-if="loadingRequests" class="loading">
              <p>Загрузка заявок...</p>
            </div>
            <div v-else-if="errorRequests" class="error">
              <p>{{ errorRequests }}</p>
            </div>
            <ul v-else class="requests-list">
              <li v-for="request in requests" :key="request.id" class="request-item">
                <h4>{{ request.title }}</h4>
                <p><strong>Описание:</strong> {{ request.description }}</p>
                <p><strong>Место:</strong> {{ request.location }}</p>
                <button class="nav-button send-request-btn" @click="sendRequest(request.id)">Отправить запрос</button>
              </li>
              <li v-if="requests.length === 0">
                <p>На данный момент нет доступных заявок.</p>
              </li>
            </ul>
          </section>
  
          <section class="advice-section">
            <h3>Советы профрентологов</h3>
            <div v-if="loadingAdvice" class="loading">
              <p>Загрузка советов...</p>
            </div>
            <div v-else-if="errorAdvice" class="error">
              <p>{{ errorAdvice }}</p>
            </div>
            <ul v-else class="advice-list">
              <li v-for="advice in adviceList" :key="advice.id" class="advice-item">
                <h4>{{ advice.title }}</h4>
                <p class="advice-author">От: {{ advice.author }}</p>
                <p>{{ advice.content }}</p>
              </li>
              <li v-if="adviceList.length === 0">
                <p>Пока нет советов от профрентологов.</p>
              </li>
            </ul>
          </section>
  
          <section class="add-advice-section">
            <h3>Добавить свой совет (для профрентологов)</h3>
            <textarea v-model="newAdvice.content" placeholder="Ваш совет"></textarea>
            <button class="nav-button add-advice-btn" @click="addAdvice">Добавить совет</button>
          </section>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  // import { yourApiService } from '@/services/api'; // Замените на ваш сервис API
  
  export default {
    name: 'ProfrenRequests',
    setup() {
      const requests = ref([]);
      const loadingRequests = ref(true);
      const errorRequests = ref(null);
  
      const adviceList = ref([]);
      const loadingAdvice = ref(true);
      const errorAdvice = ref(null);
  
      const newAdvice = ref({ content: '' });
  
      onMounted(async () => {
        // Загрузка заявок
        try {
          // const response = await yourApiService.getProfrenRequests();
          // requests.value = response.data;
          // Имитация данных
          requests.value = [
            { id: 1, title: 'Помощь в выборе карьерного пути', description: 'Нужна консультация для студента.', location: 'Актау' },
            { id: 2, title: 'Профориентация для взрослого', description: 'Хочу сменить сферу деятельности.', location: 'Алматы' },
          ];
        } catch (error) {
          console.error('Ошибка загрузки заявок:', error);
          errorRequests.value = 'Не удалось загрузить заявки.';
        } finally {
          loadingRequests.value = false;
        }
  
        // Загрузка советов
        try {
          // const response = await yourApiService.getProfrenAdvice();
          // adviceList.value = response.data;
          // Имитация данных
          adviceList.value = [
            { id: 1, title: 'Первые шаги в карьере', author: 'Иван Петров', content: 'Не бойтесь пробовать новое и развивать свои навыки.' },
            { id: 2, title: 'Как найти свое призвание', author: 'Анна Смирнова', content: 'Анализируйте свои интересы и сильные стороны.' },
          ];
        } catch (error) {
          console.error('Ошибка загрузки советов:', error);
          errorAdvice.value = 'Не удалось загрузить советы.';
        } finally {
          loadingAdvice.value = false;
        }
      });
  
      const sendRequest = (requestId) => {
        // Логика отправки запроса
        console.log(`Запрос отправлен на заявку с ID: ${requestId}`);
        alert(`Запрос отправлен на заявку с ID: ${requestId}`); // Простое уведомление
        // await yourApiService.sendProfrenRequest(requestId);
      };
  
      const addAdvice = async () => {
        if (newAdvice.value.content.trim() !== '') {
          // Логика добавления совета
          console.log('Добавлен совет:', newAdvice.value.content);
          // await yourApiService.addProfrenAdvice({ content: newAdvice.value.content });
          adviceList.value.push({
            id: Date.now(), // Временный ID
            title: 'Новый совет', // Можно добавить поле для заголовка
            author: 'Аноним', // Или брать имя пользователя
            content: newAdvice.value.content,
          });
          newAdvice.value.content = ''; // Очистить поле ввода
        } else {
          alert('Пожалуйста, введите текст совета.');
        }
      };
  
      return {
        requests,
        loadingRequests,
        errorRequests,
        adviceList,
        loadingAdvice,
        errorAdvice,
        newAdvice,
        sendRequest,
        addAdvice,
      };
    },
  };
  </script>
  
  <style scoped>
  @import '@/assets/styles/survey.css';
  
  .profren-view {
    min-height: 100vh;
    background-color: #f5f7fa;
    padding: 2rem 0;
  }
  
  .profren-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .profren-content {
    background-color: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .block-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .block-header h2 {
    color: #333;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .requests-section,
  .advice-section,
  .add-advice-section {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .requests-section:last-child,
  .advice-section:last-child,
  .add-advice-section:last-child {
    border-bottom: none;
  }
  
  .requests-section h3,
  .advice-section h3,
  .add-advice-section h3 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .requests-list {
    list-style-type: none;
    padding: 0;
  }
  
  .request-item {
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 15px;
    margin-bottom: 1rem;
  }
  
  .request-item h4 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .request-item p {
    color: #555;
    margin-bottom: 0.3rem;
  }
  
  .send-request-btn {
    margin-top: 1rem;
    background-color: #5cb85c; /* Зеленый цвет для действия */
  }
  
  .send-request-btn:hover {
    background-color: #4cae4c;
  }
  
  .advice-list {
    list-style-type: none;
    padding: 0;
  }
  
  .advice-item {
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 15px;
    margin-bottom: 1rem;
  }
  
  .advice-item h4 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .advice-author {
    color: #777;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }
  
  .advice-item p {
    color: #555;
    line-height: 1.6;
  }
  
  .add-advice-section textarea {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
    font-family: inherit;
    font-size: inherit;
  }
  
  .add-advice-btn {
    background-color: #007bff; /* Синий цвет для добавления */
  }
  
  .add-advice-btn:hover {
    background-color: #0056b3;
  }
  
  .loading, .error {
    text-align: center;
    padding: 2rem;
  }
  
  .error {
    color: #dc3545;
  }
  
  .back-button {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
  }
  
  .btn-back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #98a3b3;
    color: white;
    border-radius: 50%;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }
  
  .btn-back:hover {
    background-color: #7a8699;
  }
  
  .nav-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    color: white;
    border: none;
    border-radius: 25px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  </style>