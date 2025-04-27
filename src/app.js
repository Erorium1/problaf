const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const https = require('https');
const config = require('./config');
const authRoutes = require('./routes/auth');
const gptRoutes = require('./routes/gpt');
const testRoutes = require('./routes/testRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const app = express();

const privateKeyPath = '/etc/letsencrypt/live/easycar.kz/privkey.pem';
const certificatePath = '/etc/letsencrypt/live/easycar.kz/fullchain.pem';
let httpsServer = null;

console.log('Проверка сертификатов...');
console.log('privateKeyPath exists:', fs.existsSync(privateKeyPath));
console.log('certificatePath exists:', fs.existsSync(certificatePath));

if (fs.existsSync(privateKeyPath) && fs.existsSync(certificatePath)) {
    try {
        const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
        const certificate = fs.readFileSync(certificatePath, 'utf8');
        const credentials = { key: privateKey, cert: certificate };
        httpsServer = https.createServer(credentials, app);
        console.log('HTTPS-сервер успешно создан');
    } catch (err) {
        console.error('Ошибка при создании HTTPS-сервера:', err.message);
        httpsServer = null;
    }
} else {
    console.error('HTTPS сертификаты не найдены:');
    console.error(`privateKeyPath: ${privateKeyPath}, exists: ${fs.existsSync(privateKeyPath)}`);
    console.error(`certificatePath: ${certificatePath}, exists: ${fs.existsSync(certificatePath)}`);
}

app.use(cors({
    origin: '*',
    credentials: true
}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/gpt', gptRoutes);
app.use('/api/test', testRoutes);
app.use('/api/survey', surveyRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the backend API' });
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: 'File uploaded successfully', file: req.file });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = config.PORT || 3000;

if (httpsServer) {
    httpsServer.listen(PORT, '0.0.0.0', () => {
        console.log(`HTTPS server running on port ${PORT}`);
    });
} else {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`HTTP server running on port ${PORT}`);
    });
}

module.exports = app;
