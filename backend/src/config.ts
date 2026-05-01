import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.string().transform(Number).default(5000),
  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI must be a valid connection string"),
  JWT_SECRET: z.string().min(8, "JWT_SECRET must be at least 8 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  LOG_LEVEL: z.enum(["info", "error", "debug", "warn"]).default("info"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables:", _env.error);
  process.exit(1);
}

export const config = _env.data;
