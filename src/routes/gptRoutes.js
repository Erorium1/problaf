const express = require('express');
const router = express.Router();
const { sendMessage, getUserChats, getChatMessages } = require('../controllers/gptController');
const authMiddleware = require('../middleware/authMiddleware');

// Маршрут для отправки сообщения
router.post('/chat', authMiddleware, sendMessage);

// Маршрут для получения истории чатов
router.get('/chats', authMiddleware, getUserChats);

// Маршрут для получения сообщений конкретного чата
router.get('/chats/:chatId/messages', authMiddleware, getChatMessages);

module.exports = router; 