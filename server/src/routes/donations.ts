import { Router, Request, Response } from "express";

export const donationRoutes = Router();

// GET - Retrieve donation information
donationRoutes.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Donation endpoint",
    data: {
      acceptedPaymentMethods: ["stripe", "paypal"],
      currency: "USD"
    }
  });
});

// POST - Process a donation
donationRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { amount, donorName, email, message } = req.body;

    // Validation
    if (!amount || amount <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid donation amount"
      });
      return;
    }

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required"
      });
      return;
    }

    // TODO: Process payment through Stripe/PayPal
    // TODO: Save donation record to database
    
    res.json({
      success: true,
      message: "Donation received successfully",
      data: {
        transactionId: `TXN-${Date.now()}`,
        amount,
        donorName,
        email,
        status: "pending",
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing donation",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
