const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/gptController');
const auth = require('../middleware/auth');

router.post('/chat', auth, sendMessage);

module.exports = router; 