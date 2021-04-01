const dotenv = require('dotenv');
const path = require('path');

process.env.MONGO_CONNECTION_STRING =
  'mongodb+srv://rs-lang-alexey_11:rs-lang-alexey_11@cluster0.db9hl.mongodb.net/learnwords?retryWrites=true&w=majority';
process.env.JWT_SECRET_KEY = 'rU_0SQVbRTGpBfOq';
process.env.JWT_REFRESH_SECRET_KEY = 'Xi.SId_JrhCn!Zz8';
process.env.PORT = '8080';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  MAX_SYMBOLS_PER_OBJECT: 10000,
  MAX_OPTIONAL_PROPERTIES: 100,
  MIN_PASSWORD_LENGTH: 8,
  LOGS_DIR: path.join(__dirname, '../../logs'),
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRE_TIME: '4h',
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
  JWT_REFRESH_EXPIRE_TIME: 4.5 * 60 * 60
};
