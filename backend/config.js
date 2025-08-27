import dotenv from 'dotenv';
import { cleanEnv, str, port, num } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  MONGO_URI: str(),
  JWT_SECRET: str(),
  SALT_ROUNDS: num({ default: 10 }),
});

export default env;
