import dotenv from "dotenv";

dotenv.config({ path: ".env.local", override: true });
dotenv.config();

const config = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

export default config;
