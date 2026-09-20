import http from "http";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./middlewares/request-logger.js";

const app = createApp();
const server = http.createServer(app);

const PORT = env.PORT;

server.listen(PORT, () => {
  logger.info(
    { port: PORT, env: env.NODE_ENV },
    `🚀 TVET API Gateway listening on http://localhost:${PORT}`
  );
});

// Graceful shutdown handling
const shutdown = (signal: string) => {
  logger.info({ signal }, `Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    logger.info("HTTP server closed.");
    process.exit(0);
  });

  // Force close if graceful shutdown exceeds 10 seconds
  setTimeout(() => {
    logger.error("Could not close connections in time, forcefully shutting down");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
