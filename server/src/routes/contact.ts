import { Router, Request, Response } from "express";

export const contactRoutes = Router();

// POST - Handle contact form submissions
contactRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      res.status(400).json({
        success: false,
        message: "All fields are required"
      });
      return;
    }

    // TODO: Save contact message to database
    // TODO: Send confirmation email to user
    // TODO: Send notification email to admin

    res.json({
      success: true,
      message: "Contact message received successfully",
      data: {
        messageId: `MSG-${Date.now()}`,
        name,
        email,
        subject,
        status: "received",
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing contact message",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
