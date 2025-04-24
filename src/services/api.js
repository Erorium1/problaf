import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Добавляем interceptor для автоматической вставки токена
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    async login(email, password) {
        const response = await api.post('/api/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    async register(name, email, password) {
        const response = await api.post('api/auth/register', { name, email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    async getMe() {
        const response = await api.get('/auth/me');
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
    }
};

export const gptService = {
    async sendMessage(message) {
        const response = await api.post('api/gpt/chat', { message });
        return response.data;
    },
    getUserChats: async () => {
        const response = await api.get('/gpt/chats');
        return response.data;
    },
    getChatMessages: async (chatId) => {
        const response = await api.get(`/gpt/chats/${chatId}/messages`);
        return response.data;
    }
};

export default api; 