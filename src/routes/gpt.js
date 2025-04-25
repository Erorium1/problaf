const express = require('express');
const router = express.Router();
const { saveChatMessage, getUserChats, getChatMessages } = require('../controllers/gptController');
const authMiddleware = require('../middleware/auth');

// Маршрут для сохранения сообщения и ответа
router.post('/chat', authMiddleware, saveChatMessage);

// Маршрут для получения истории чатов
router.get('/chats', authMiddleware, getUserChats);

// Маршрут для получения сообщений конкретного чата
router.get('/chats/:chatId/messages', authMiddleware, getChatMessages);

module.exports = router; 