const app = require('./app');
const config = require('./config');
const fs = require('fs');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(config.UPLOAD_DIR)) {
    fs.mkdirSync(config.UPLOAD_DIR);
}

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
}); 