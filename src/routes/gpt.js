const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { saveChatMessage, getUserChats, getChatMessages } = require('../controllers/gptController');
const authMiddleware = require('../middleware/auth');

// Маршрут для сохранения сообщения и ответа
router.post('/chat', authMiddleware, saveChatMessage);
=======
const { sendMessage, getUserChats, getChatMessages } = require('../controllers/gptController');
const authMiddleware = require('../middleware/auth');

// Маршрут для отправки сообщения
router.post('/chat', authMiddleware, sendMessage);
>>>>>>> 311bf360a75f1dc041340ab150ff600905c319e0

// Маршрут для получения истории чатов
router.get('/chats', authMiddleware, getUserChats);

// Маршрут для получения сообщений конкретного чата
router.get('/chats/:chatId/messages', authMiddleware, getChatMessages);

module.exports = router; 