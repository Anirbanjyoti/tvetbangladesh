import dotenv from "dotenv";
import { workerEnvSchema, WorkerEnv } from "@tvet/validation";

dotenv.config();

function loadWorkerEnvironment(): WorkerEnv {
  const result = workerEnvSchema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ Invalid worker environment variables:", result.error.format());
    process.exit(1);
  }
  return result.data;
}

export const env = loadWorkerEnvironment();
