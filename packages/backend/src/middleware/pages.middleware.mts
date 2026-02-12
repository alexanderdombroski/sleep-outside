import type { Request, Response, NextFunction } from "express";
import { sanitize } from "../js/utils.mts";

export const sanitizeQueryMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.query = sanitize(req.query);
  next();
};
