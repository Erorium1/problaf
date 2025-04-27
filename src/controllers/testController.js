const fs = require('fs').promises;
const path = require('path');

const TEST_RESULTS_FILE = path.join(__dirname, '../../data/test_results.json');

const saveTestResults = async (req, res) => {
    try {
        const { userId, block1, block2, block3, block4, block5 } = req.body;

        if (!userId || !block1 || !block2 || !block3 || !block4 || !block5) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let results = [];
        try {
            const data = await fs.readFile(TEST_RESULTS_FILE, 'utf8');
            results = JSON.parse(data).results;
        } catch (error) {
            // Если файл не существует или пустой, начинаем с пустого массива
            results = [];
        }

        const newResult = {
            userId,
            block1,
            block2,
            block3,
            block4,
            block5,
            timestamp: new Date().toISOString()
        };

        results.push(newResult);
        await fs.writeFile(TEST_RESULTS_FILE, JSON.stringify({ results }, null, 2));

        res.json({
            success: true,
            message: 'Test results saved successfully'
        });
    } catch (error) {
        console.error('Error saving test results:', error);
        res.status(500).json({ 
            message: 'Error saving test results',
            error: error.message 
        });
    }
};

module.exports = {
    saveTestResults
}; 