import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { healthRoutes } from "./routes/health.js";
import { donationRoutes } from "./routes/donations.js";
import { contactRoutes } from "./routes/contact.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8080";

// Middleware
app.use(cors({
  origin: frontendUrl,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/contact", contactRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`CORS enabled for: ${frontendUrl}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
