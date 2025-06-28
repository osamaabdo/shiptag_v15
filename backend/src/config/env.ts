import dotenv from 'dotenv';

dotenv.config();

export const config = {
  server: {
    port: parseInt(process.env.PORT || '3050', 10),
    host: process.env.HOST || '0.0.0.0',
  },
  environment: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  api: {
    prefix: process.env.API_PREFIX || '/api/v1',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
} as const;