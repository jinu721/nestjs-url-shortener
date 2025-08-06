import { config } from 'dotenv';

config();

function getEnv(name: string, fallback?: string): string {
  const value = process.env[name];
  if (value) return value;
  if (fallback) return fallback;
  throw new Error(`Missing environment variable: ${name}`);
}

export const env = {
  MONGO_URL: getEnv('MONGO_URL', 'mongodb://localhost:27017/CodeMaze'),
  PORT: getEnv('PORT', '5000'),
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  FRONTEND_URL:
    process.env.NODE_ENV === 'production'
      ? getEnv('FRONTEND_URL')
      : 'http://localhost:3000',
  BASE_URL: getEnv('BASE_URL', 'http://localhost:5000'),
  ACCESS_TOKEN_SECRET: getEnv('ACCESS_TOKEN_SECRET', 'access_token@123'),
  REFRESH_TOKEN_SECRET: getEnv('REFRESH_TOKEN_SECRET', 'refresh_token@123'),
  EMAIL_USER: getEnv('EMAIL_USER'),
  EMAIL_PASS: getEnv('EMAIL_PASS'),
};
