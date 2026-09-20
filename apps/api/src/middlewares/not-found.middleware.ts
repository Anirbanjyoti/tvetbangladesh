import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../common/errors/app-error.js";

export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(new NotFoundError(`Path ${req.originalUrl || req.url} not found`));
}
