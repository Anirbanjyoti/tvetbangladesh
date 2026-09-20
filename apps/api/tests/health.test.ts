import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp();

describe("Health & Liveness Probes", () => {
  it("GET /health should return 200 and standard API response envelope", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.message).toBe("Service healthy");
    expect(res.body.data.status).toBe("ok");
    expect(res.body.data.service).toBe("tvet-api");
    expect(res.headers["x-request-id"]).toBeDefined();
  });

  it("GET /live should return 200 with alive: true", async () => {
    const res = await request(app).get("/live");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.alive).toBe(true);
  });

  it("GET /ready should return 200 with ready: true", async () => {
    const res = await request(app).get("/ready");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.ready).toBe(true);
  });

  it("GET /api/v1/health should also return 200 via API gateway router", async () => {
    const res = await request(app).get("/api/v1/health");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("ok");
  });

  it("GET /unknown-route should return 404 with standard error envelope", async () => {
    const res = await request(app).get("/unknown-route");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("NOT_FOUND");
    expect(res.headers["x-request-id"]).toBeDefined();
  });
});
