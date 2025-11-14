import axios from 'axios';
import { auth, db } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const api = axios.create({
  baseURL: 'https://easycar.kz:3000/',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Добавляем interceptor для автоматической вставки токена (пока оставим для остальных API)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // ЛОГИН через Firebase Auth
  async login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    const idToken = await user.getIdToken();

    // Пытаемся вытащить доп. данные из Firestore (name, role)
    let profile = { name: user.displayName || '', role: 'user' };
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) {
        const data = snap.data();
        profile = {
          name: data.name || profile.name,
          role: data.role || profile.role
        };
      }
    } catch (e) {
      // игнорируем, если нет профиля
    }

    const response = {
      user: {
        id: user.uid,
        name: profile.name,
        email: user.email,
        role: profile.role
      },
      token: idToken
    };

    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response;
  },

  // РЕГИСТРАЦИЯ через Firebase Auth
  async register(name, email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    const idToken = await user.getIdToken();

    const response = {
      user: {
        id: user.uid,
        name,
        email: user.email,
        role: 'user'
      },
      token: idToken
    };

    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response;
  },

  // Получение текущего пользователя из Firebase
  async getMe() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        async (user) => {
          unsubscribe();
          if (!user) {
            return resolve(null);
          }

          let profile = { name: user.displayName || '', role: 'user' };
          try {
            const snap = await getDoc(doc(db, 'users', user.uid));
            if (snap.exists()) {
              const data = snap.data();
              profile = {
                name: data.name || profile.name,
                role: data.role || profile.role
              };
            }
          } catch (e) {
            // ignore
          }

          resolve({
            id: user.uid,
            name: profile.name,
            email: user.email,
            role: profile.role
          });
        },
        (error) => {
          unsubscribe();
          reject(error);
        }
      );
    });
  },

  async logout() {
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Сервис для работы с Gemini API
export const geminiService = {
    async sendMessage(message) {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
            {
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            },
            {
                params: {
                    key: import.meta.env.VITE_GEMINI_KEY
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.data || !response.data.candidates || !response.data.candidates[0]) {
            throw new Error('No response received from Gemini');
        }

        return response.data.candidates[0].content.parts[0].text;
    }
};

// Локальный сервис для работы с чатами (без запроса на бэкенд)
const LOCAL_CHAT_KEY = 'ai_chats';

function loadLocalChats() {
  try {
    const raw = localStorage.getItem(LOCAL_CHAT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalChats(chats) {
  try {
    localStorage.setItem(LOCAL_CHAT_KEY, JSON.stringify(chats));
  } catch {
    // ignore
  }
}

export const gptService = {
  async saveChat(message, response, chatId = null) {
    const now = new Date().toISOString();
    let chats = loadLocalChats();

    // Находим текущий чат или создаём новый
    let chat = chats.find((c) => c.id === chatId);
    if (!chat) {
      chat = {
        id: chatId || `chat_${Date.now()}`,
        messages: [],
        lastMessage: null,
        messageCount: 0,
        updatedAt: now,
      };
      chats.push(chat);
    }

    // Добавляем сообщения
    const userMessage = {
      type: 'user',
      text: message,
      timestamp: now,
    };
    const aiMessage = {
      type: 'ai',
      text: response,
      timestamp: now,
    };

    chat.messages.push(userMessage, aiMessage);
    chat.lastMessage = { message, response, createdAt: now };
    chat.messageCount = chat.messages.length;
    chat.updatedAt = now;

    saveLocalChats(chats);

    return { chatId: chat.id };
  },

  async getUserChats() {
    const chats = loadLocalChats();
    return { chats };
  },

  async getChatMessages(chatId) {
    const chats = loadLocalChats();
    const chat = chats.find((c) => c.id === chatId);
    return {
      messages: chat ? chat.messages : [],
    };
  },
};

// Сервис для работы с результатами опроса
export const surveyService = {
    async saveResults(profile, answers) {
        const response = await api.post('/api/survey/results', { profile, answers });
        return response.data;
    },

    async getResults() {
        const response = await api.get('/api/survey/results');
        return response.data;
    },

    async saveTestResults(results) {
        const response = await api.post('/api/test/save-results', results);
        return response.data;
    },

    async getTestResults(userId) {
        const response = await api.get(`/api/test/results/${userId}`);
        return response.data;
    }
};

export default api; 