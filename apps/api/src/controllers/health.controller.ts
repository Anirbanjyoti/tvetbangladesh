import { Request, Response } from "express";
import { HealthCheckResponse, ProbeResponse, ReadinessResponse } from "@tvet/types";
import { ResponseFormatter } from "../common/response/api-response.js";

const startTime = Date.now();

export class HealthController {
  public static getHealth(_req: Request, res: Response): Response {
    const data: HealthCheckResponse = {
      status: "ok",
      service: "tvet-api",
      version: "1.0.0",
      uptime: Math.floor((Date.now() - startTime) / 1000),
      timestamp: new Date().toISOString(),
      checks: {
        server: {
          status: "ok",
          message: "API server is operational",
        },
      },
    };
    return ResponseFormatter.success(res, data, "Service healthy");
  }

  public static getLive(_req: Request, res: Response): Response {
    const data: ProbeResponse = {
      alive: true,
      timestamp: new Date().toISOString(),
    };
    return ResponseFormatter.success(res, data, "Liveness probe passed");
  }

  public static getReady(_req: Request, res: Response): Response {
    const data: ReadinessResponse = {
      ready: true,
      timestamp: new Date().toISOString(),
      dependencies: {
        memory: process.memoryUsage().heapUsed > 0,
      },
    };
    return ResponseFormatter.success(res, data, "Readiness probe passed");
  }
}
