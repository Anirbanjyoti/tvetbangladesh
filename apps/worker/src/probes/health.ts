import http from "http";
import { Logger } from "@tvet/logger";

export function startWorkerHealthServer(port: number, logger: Logger): http.Server {
  const startTime = Date.now();

  const server = http.createServer((req, res) => {
    if (req.url === "/health" || req.url === "/live") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "ok",
          service: "tvet-worker",
          uptime: Math.floor((Date.now() - startTime) / 1000),
          timestamp: new Date().toISOString(),
        })
      );
      return;
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  });

  server.listen(port, () => {
    logger.info(`🩺 Worker health probe listening on http://localhost:${port}/health`);
  });

  return server;
}
