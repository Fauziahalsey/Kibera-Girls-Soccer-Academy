import { Router, Request, Response } from "express";

export const healthRoutes = Router();

healthRoutes.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString()
  });
});
