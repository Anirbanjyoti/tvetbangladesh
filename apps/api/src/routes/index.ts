import { Router } from "express";
import { healthRoutes } from "./health.routes.js";

const apiV1Router = Router();

apiV1Router.use("/", healthRoutes);

export { apiV1Router };
