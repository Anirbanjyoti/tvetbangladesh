import express, { Express } from "express";
import corsMiddleware from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { requestLogger } from "./middlewares/request-logger.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { notFoundHandler } from "./middlewares/not-found.middleware.js";
import { healthRoutes } from "./routes/health.routes.js";
import { apiV1Router } from "./routes/index.js";

export function createApp(): Express {
  const app = express();

  // Basic security and parsing
  app.use(helmet());

  const allowedOrigins = env.CORS_ORIGINS.split(",").map((o) => o.trim());
  app.use(
    corsMiddleware({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          // Allow subdomains in local dev
          if (env.NODE_ENV !== "production" && origin.includes("localhost")) {
            callback(null, true);
          } else {
            callback(new Error("CORS not allowed"));
          }
        }
      },
      credentials: true,
    })
  );

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Tracing and Request Logging
  app.use(requestLogger);

  // Top-level Health Probes (for Docker, K8s, Load Balancers)
  app.use("/", healthRoutes);

  // Modular API Gateway v1
  app.use("/api/v1", apiV1Router);

  // Error handling pipeline
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
