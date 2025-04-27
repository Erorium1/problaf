const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

// Сохранение результатов теста
router.post('/results', surveyController.saveSurveyResult);

// Получение результатов теста
router.get('/results', surveyController.getSurveyResults);

module.exports = router; 