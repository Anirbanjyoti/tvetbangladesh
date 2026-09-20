import { Router } from "express";
import { HealthController } from "../controllers/health.controller.js";

const router = Router();

router.get("/health", HealthController.getHealth);
router.get("/live", HealthController.getLive);
router.get("/ready", HealthController.getReady);

export const healthRoutes = router;
