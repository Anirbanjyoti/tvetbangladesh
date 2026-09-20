import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { createLogger } from "@tvet/logger";
import { env } from "../config/env.js";

export const logger = createLogger({
  name: "tvet-api",
  level: env.LOG_LEVEL,
  isDevelopment: env.NODE_ENV === "development",
});

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const incomingRequestId = req.header("x-request-id");
  const requestId = incomingRequestId || crypto.randomUUID();
  req.headers["x-request-id"] = requestId;
  res.setHeader("X-Request-ID", requestId);

  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info({
      requestId,
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      durationMs: duration,
      ip: req.ip,
      userAgent: req.get("user-agent"),
    }, `${req.method} ${req.originalUrl || req.url} ${res.statusCode} in ${duration}ms`);
  });

  next();
}
