import { Router, Request, Response } from "express";

const PAYSTACK_BASE_URL = "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export const donationRoutes = Router();

// GET - Retrieve donation information
donationRoutes.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Donation endpoint",
    data: {
      acceptedPaymentMethods: ["mpesa", "bank", "paypal", "paystack"],
      currency: "KES"
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

// POST - Initialize Paystack payment
donationRoutes.post("/paystack/initialize", async (req: Request, res: Response) => {
  try {
    const { amount, email, donorName, message } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid donation amount"
      });
      return;
    }

    if (!PAYSTACK_SECRET_KEY) {
      res.status(500).json({
        success: false,
        message: "Paystack secret key is not configured"
      });
      return;
    }

    const reference = `KGSA-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const emailToUse = email?.trim()
      ? email.trim()
      : `donation+${reference}@noreply.kiberagirlssocceracademy.co.ke`;

    const payload = {
      email: emailToUse,
      amount: Math.round(amount * 100),
      currency: "KES",
      reference,
      metadata: {
        donorName,
        message
      }
    };

    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok || !data.status) {
      res.status(response.status || 502).json({
        success: false,
        message: data.message || "Paystack initialization failed",
        error: data
      });
      return;
    }

    res.json({
      success: true,
      message: "Paystack transaction initialized",
      data: {
        authorization_url: data.data.authorization_url,
        access_code: data.data.access_code,
        reference: data.data.reference,
        amount: data.data.amount,
        currency: data.data.currency
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error initializing Paystack payment",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// GET - Verify Paystack payment
donationRoutes.get("/paystack/verify", async (req: Request, res: Response) => {
  try {
    const reference = String(req.query.reference ?? "");

    if (!reference) {
      res.status(400).json({
        success: false,
        message: "Paystack reference is required"
      });
      return;
    }

    if (!PAYSTACK_SECRET_KEY) {
      res.status(500).json({
        success: false,
        message: "Paystack secret key is not configured"
      });
      return;
    }

    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    if (!response.ok || !data.status) {
      res.status(response.status || 502).json({
        success: false,
        message: data.message || "Paystack verification failed",
        error: data
      });
      return;
    }

    res.json({
      success: true,
      message: "Paystack payment verified",
      data: {
        status: data.data.status,
        reference: data.data.reference,
        amount: data.data.amount,
        currency: data.data.currency,
        paidAt: data.data.paid_at,
        channel: data.data.channel,
        customer: data.data.customer
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying Paystack payment",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
