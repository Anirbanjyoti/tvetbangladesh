import { pino, Logger, LoggerOptions } from "pino";

export interface CreateLoggerOptions {
  name: string;
  level?: string;
  isDevelopment?: boolean;
}

export function createLogger(options: CreateLoggerOptions): Logger {
  const isDev = options.isDevelopment ?? process.env.NODE_ENV !== "production";
  const level = options.level ?? process.env.LOG_LEVEL ?? (isDev ? "debug" : "info");

  const config: LoggerOptions = {
    name: options.name,
    level,
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => ({ level: label }),
    },
    redact: {
      paths: [
        "req.headers.authorization",
        "req.headers.cookie",
        "password",
        "token",
        "nid",
        "secret",
      ],
      censor: "[REDACTED]",
    },
  };

  return pino(config);
}

export { Logger } from "pino";
