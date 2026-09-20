import dotenv from "dotenv";
import { apiEnvSchema, ApiEnv } from "@tvet/validation";

dotenv.config();

function loadEnvironment(): ApiEnv {
  const result = apiEnvSchema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.format());
    process.exit(1);
  }
  return result.data;
}

export const env = loadEnvironment();
