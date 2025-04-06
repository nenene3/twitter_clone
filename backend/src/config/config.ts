import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/demo_123',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  JWT_COOKIE_EXPIRES: parseInt(process.env.JWT_COOKIE_EXPIRES as string)  || 90,
  NODE_ENV:process.env.NODE_ENV || 'development',
};