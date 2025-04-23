require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    UPLOAD_DIR: 'uploads/',
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:8080']
}; 