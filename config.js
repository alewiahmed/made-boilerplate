import dotenvSafe from 'dotenv-safe';

dotenvSafe.config({
  allowEmptyValues: true
});

export const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_NAME,
  NODE_ENV,
  JWT_SECRET,
  DB_PASSWORD,
  SERVER_PORT
} = process.env;
