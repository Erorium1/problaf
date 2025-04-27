const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Путь к файлу с результатами
const resultsPath = path.join(__dirname, '../../data/survey_results.json');

const getUserIdFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.id;
    } catch (error) {
        return null;
    }
};

exports.saveSurveyResult = async (req, res) => {
  try {
    const { profile, answers } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    let user = null;

    if (token) {
        const userId = getUserIdFromToken(token);
        if (userId) {
            user = await User.findById(userId);
        }
    }

    // Проверяем существование файла
    if (!fs.existsSync(resultsPath)) {
      return res.status(500).json({
        success: false,
        message: 'Файл с результатами не найден'
      });
    }

    // Читаем существующие результаты
    const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

    // Добавляем новый результат
    const newResult = {
      profile,
      answers,
      user: user ? {
        id: user.id,
        name: user.name,
        email: user.email
      } : {
        id: 'anonymous',
        name: 'Анонимный пользователь',
        email: 'Нет email'
      },
      createdAt: new Date().toISOString()
    };

    results.push(newResult);

    // Сохраняем обновленные результаты
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

    res.status(201).json({
      success: true,
      message: 'Результаты теста успешно сохранены',
      data: newResult
    });
  } catch (error) {
    console.error('Error saving survey results:', error);
    res.status(500).json({
      success: false,
      message: 'Произошла ошибка при сохранении результатов теста',
      error: error.message
    });
  }
};

exports.getSurveyResults = async (req, res) => {
  try {
    // Проверяем существование файла
    if (!fs.existsSync(resultsPath)) {
      return res.status(500).json({
        success: false,
        message: 'Файл с результатами не найден'
      });
    }

    // Читаем результаты из файла
    const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

    // Сортируем по дате создания (новые сверху) и берем последние 10
    const sortedResults = results
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: sortedResults
    });
  } catch (error) {
    console.error('Error fetching survey results:', error);
    res.status(500).json({
      success: false,
      message: 'Произошла ошибка при получении результатов теста',
      error: error.message
    });
  }
}; 