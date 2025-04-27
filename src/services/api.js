import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
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

// Сервис для работы с чатами
export const gptService = {
    async saveChat(message, response) {
        const result = await api.post('api/gpt/chat', { message, response });
        return result.data;
    },
    getUserChats: async () => {
        const response = await api.get('api/gpt/chats');
        return response.data;
    },
    getChatMessages: async (chatId) => {
        const response = await api.get(`/gpt/chats/${chatId}/messages`);
        return response.data;
    }
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
    }
};

export default api; 