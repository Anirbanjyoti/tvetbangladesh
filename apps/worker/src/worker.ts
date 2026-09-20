import { createLogger } from "@tvet/logger";
import { env } from "./config/env.js";
import { startWorkerHealthServer } from "./probes/health.js";

const logger = createLogger({
  name: "tvet-worker",
  level: env.LOG_LEVEL,
  isDevelopment: env.NODE_ENV === "development",
});

logger.info(
  { env: env.NODE_ENV },
  "⚡ TVET Bangladesh Worker process initialized (Phase 1 Skeleton)"
);

// Start container health probe server
const healthServer = startWorkerHealthServer(env.PORT, logger);

// Graceful shutdown handling
const shutdown = (signal: string) => {
  logger.info({ signal }, `Worker received ${signal}. Terminating jobs and health probe...`);
  healthServer.close(() => {
    logger.info("Worker health server closed.");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error("Forcefully shutting down worker process");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
