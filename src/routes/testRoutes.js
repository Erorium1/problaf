const express = require('express');
const router = express.Router();
const { saveTestResults, getTestResults } = require('../controllers/testController');
const authMiddleware = require('../middleware/auth');

router.post('/save-results', authMiddleware, saveTestResults);
router.get('/results/:userId', authMiddleware, getTestResults);

module.exports = router; 