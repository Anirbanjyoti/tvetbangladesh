import { Response } from "express";
import { ApiResponse } from "@tvet/types";

export class ResponseFormatter {
  public static success<T>(
    res: Response,
    data?: T,
    message = "Success",
    statusCode = 200,
    meta?: ApiResponse["meta"]
  ): Response {
    const payload: ApiResponse<T> = {
      success: true,
      statusCode,
      message,
      data,
      meta,
      timestamp: new Date().toISOString(),
      requestId: res.req.headers["x-request-id"] as string | undefined,
    };
    return res.status(statusCode).json(payload);
  }

  public static error(
    res: Response,
    message: string,
    statusCode = 500,
    errorCode = "INTERNAL_SERVER_ERROR",
    details?: unknown
  ): Response {
    const payload: ApiResponse = {
      success: false,
      statusCode,
      message,
      error: {
        code: errorCode,
        details,
      },
      timestamp: new Date().toISOString(),
      requestId: res.req.headers["x-request-id"] as string | undefined,
    };
    return res.status(statusCode).json(payload);
  }
}
