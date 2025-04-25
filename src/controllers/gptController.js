const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const HISTORY_FILE = path.join(__dirname, '../../data/history.json');
const CHATS_FILE = path.join(__dirname, '../../data/chats.json');

const saveToHistory = async (userId, message, response, chatId) => {
    try {
        const history = await fs.readFile(HISTORY_FILE, 'utf8')
            .then(data => JSON.parse(data))
            .catch(() => []);

        const newEntry = {
            userId,
            chatId,
            message,
            response,
            timestamp: new Date().toISOString()
        };

        history.push(newEntry);
        await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
    } catch (error) {
        console.error('Error saving to history:', error);
    }
};

const createOrGetChat = async (userId) => {
    try {
        const chats = await fs.readFile(CHATS_FILE, 'utf8')
            .then(data => JSON.parse(data))
            .catch(() => []);

        // Ищем активный чат пользователя
        let activeChat = chats.find(chat => 
            chat.userId === userId && chat.isActive === true
        );

        // Если нет активного чата, создаем новый
        if (!activeChat) {
            const newChat = {
                id: Date.now().toString(),
                userId,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            chats.push(newChat);
            await fs.writeFile(CHATS_FILE, JSON.stringify(chats, null, 2));
            return newChat.id;
        }

        return activeChat.id;
    } catch (error) {
        console.error('Error managing chat:', error);
        throw error;
    }
};

const saveChatMessage = async (req, res) => {
    try {
        const { message, response } = req.body;
        const userId = req.user.id;

        if (!message || !response) {
            return res.status(400).json({ message: 'Message and response are required' });
        }

        // Получаем или создаем чат
        const chatId = await createOrGetChat(userId);

        // Сохраняем в историю
        await saveToHistory(userId, message, response, chatId);

        res.json({
            success: true,
            chatId: chatId
        });
    } catch (error) {
        console.error('Error saving chat message:', error);
        res.status(500).json({ 
            message: 'Error saving chat message',
            error: error.message 
        });
    }
};

const getUserChats = async (req, res) => {
    try {
        const userId = req.user.id;

        // Читаем файлы
        const [chats, history] = await Promise.all([
            fs.readFile(CHATS_FILE, 'utf8').then(data => JSON.parse(data)).catch(() => []),
            fs.readFile(HISTORY_FILE, 'utf8').then(data => JSON.parse(data)).catch(() => [])
        ]);

        // Фильтруем чаты пользователя
        const userChats = chats.filter(chat => chat.userId === userId);

        // Для каждого чата добавляем последнее сообщение
        const chatsWithLastMessage = userChats.map(chat => {
            const chatMessages = history.filter(msg => msg.chatId === chat.id);
            const lastMessage = chatMessages[chatMessages.length - 1];
            
            return {
                ...chat,
                lastMessage: lastMessage ? {
                    message: lastMessage.message,
                    timestamp: lastMessage.timestamp
                } : null,
                messageCount: chatMessages.length
            };
        });

        // Сортируем чаты по дате обновления (новые сверху)
        const sortedChats = chatsWithLastMessage.sort((a, b) => 
            new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        res.json({
            chats: sortedChats
        });
    } catch (error) {
        console.error('Error getting user chats:', error);
        res.status(500).json({ 
            message: 'Error retrieving chat history',
            error: error.message 
        });
    }
};

const getChatMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user.id;

        // Читаем файл с историей
        const history = await fs.readFile(HISTORY_FILE, 'utf8')
            .then(data => JSON.parse(data))
            .catch(() => []);

        // Фильтруем сообщения по chatId и userId
        const chatMessages = history.filter(msg => 
            msg.chatId === chatId && msg.userId === userId
        );

        // Форматируем сообщения для фронтенда
        const formattedMessages = chatMessages.map(msg => ({
            type: 'user',
            text: msg.message,
            timestamp: msg.timestamp
        })).concat(chatMessages.map(msg => ({
            type: 'ai',
            text: msg.response,
            timestamp: msg.timestamp
        }))).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        res.json({
            messages: formattedMessages
        });
    } catch (error) {
        console.error('Error getting chat messages:', error);
        res.status(500).json({ 
            message: 'Error retrieving chat messages',
            error: error.message 
        });
    }
};

module.exports = {
    saveChatMessage,
    getUserChats,
    getChatMessages
};