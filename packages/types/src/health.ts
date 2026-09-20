export type HealthStatus = "ok" | "degraded" | "down";

export interface HealthCheckResponse {
  status: HealthStatus;
  service: string;
  version: string;
  uptime: number;
  timestamp: string;
  checks?: Record<string, {
    status: HealthStatus;
    latencyMs?: number;
    message?: string;
  }>;
}

export interface ProbeResponse {
  alive: boolean;
  timestamp: string;
}

export interface ReadinessResponse {
  ready: boolean;
  timestamp: string;
  dependencies?: Record<string, boolean>;
}
