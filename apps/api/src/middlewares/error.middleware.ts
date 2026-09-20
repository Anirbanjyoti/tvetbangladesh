import { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/app-error.js";
import { ResponseFormatter } from "../common/response/api-response.js";
import { logger } from "./request-logger.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const requestId = req.headers["x-request-id"] as string | undefined;

  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error({ err, requestId }, err.message);
    } else {
      logger.warn({ err, requestId }, err.message);
    }

    ResponseFormatter.error(
      res,
      err.message,
      err.statusCode,
      err.errorCode,
      err.details
    );
    return;
  }

  // Unhandled internal errors
  logger.error({ err, requestId }, "Unhandled application error occurred");

  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Internal server error";

  ResponseFormatter.error(res, message, 500, "INTERNAL_SERVER_ERROR");
}
