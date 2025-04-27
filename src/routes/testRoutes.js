const express = require('express');
const router = express.Router();
const { saveTestResults } = require('../controllers/testController');
const authMiddleware = require('../middleware/auth');

router.post('/save-results', authMiddleware, saveTestResults);

module.exports = router; 