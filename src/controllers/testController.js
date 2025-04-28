const TestResult = require('../models/testResult');

const saveTestResults = async (req, res) => {
    try {
        // Используем userId из аутентифицированного пользователя
        const userId = req.user.id || req.user._id;
        const { block1, block2, block3, block4, block5 } = req.body;

        console.log('Received data:', {
            userId,
            block1,
            block2,
            block3,
            block4,
            block5
        });

        // Проверяем наличие всех необходимых полей
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Проверяем, что все блоки содержат данные
        const blocks = [block1, block2, block3, block4, block5];
        const emptyBlocks = blocks.filter(block => !block || Object.keys(block).length === 0);
        
        if (emptyBlocks.length > 0) {
            return res.status(400).json({ 
                message: 'All blocks must be filled',
                emptyBlocks: emptyBlocks.length
            });
        }

        const results = {
            block1,
            block2,
            block3,
            block4,
            block5
        };

        const testResult = await TestResult.save(userId, results);
        const analysis = testResult.analyzeResults();

        res.json({
            success: true,
            message: 'Test results saved successfully',
            analysis
        });
    } catch (error) {
        console.error('Error saving test results:', error);
        res.status(500).json({ 
            message: 'Error saving test results',
            error: error.message 
        });
    }
};

const getTestResults = async (req, res) => {
    try {
        const { userId } = req.params;
        const testResult = await TestResult.getByUserId(userId);
        
        if (!testResult) {
            return res.status(404).json({ message: 'Test results not found' });
        }

        const analysis = testResult.analyzeResults();
        
        res.json({
            success: true,
            results: testResult,
            analysis
        });
    } catch (error) {
        console.error('Error getting test results:', error);
        res.status(500).json({ 
            message: 'Error getting test results',
            error: error.message 
        });
    }
};

module.exports = {
    saveTestResults,
    getTestResults
}; 