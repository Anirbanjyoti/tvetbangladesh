import { NextResponse } from "next/server";
import { HealthCheckResponse } from "@tvet/types";

const startTime = Date.now();

export async function GET() {
  const healthData: HealthCheckResponse = {
    status: "ok",
    service: "tvet-web",
    version: "1.0.0",
    uptime: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
    checks: {
      nextjs: {
        status: "ok",
        message: "Next.js App Router operational",
      },
    },
  };

  return NextResponse.json(healthData, { status: 200 });
}
