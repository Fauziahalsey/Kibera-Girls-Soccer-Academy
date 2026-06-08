import { Router, Request, Response } from "express";

const PAYSTACK_BASE_URL = "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const FLUTTERWAVE_BASE_URL = "https://api.flutterwave.com/v3";
const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;

export const donationRoutes = Router();

// GET - Retrieve donation information
donationRoutes.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Donation endpoint",
    data: {
      acceptedPaymentMethods: ["mpesa", "bank", "paypal", "paystack", "flutterwave"],
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

// POST - Initialize Flutterwave payment

donationRoutes.post("/flutterwave/initialize", async (req: Request, res: Response) => {
  try {
    const { amount, email, donorName, donorPhone, message } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid donation amount"
      });
      return;
    }

    if (!FLUTTERWAVE_SECRET_KEY) {
      res.status(500).json({
        success: false,
        message: "Flutterwave secret key is not configured"
      });
      return;
    }

    const tx_ref = `KGSA-FLW-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const emailToUse = email?.trim()
      ? email.trim()
      : `donation+${tx_ref}@noreply.kiberagirlssocceracademy.co.ke`;

    const payload = {
      tx_ref,
      amount: Math.round(amount),
      currency: "KES",
      redirect_url: `${process.env.FRONTEND_URL || "http://localhost:8080"}/donate`,
      customer: {
        email: emailToUse,
        name: donorName || "Anonymous Donor",
        phone_number: donorPhone || undefined
      },
      customizations: {
        title: "Kibera Girls Soccer Academy",
        description: message || "Donation to support students",
        logo: "https://www.kiberagirlssocceracademy.co.ke/logo.png"
      }
    };

    const response = await fetch(`${FLUTTERWAVE_BASE_URL}/payments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      res.status(response.status || 502).json({
        success: false,
        message: data.message || "Flutterwave initialization failed",
        error: data
      });
      return;
    }

    res.json({
      success: true,
      message: "Flutterwave transaction initialized",
      data: {
        tx_ref: data.data.tx_ref,
        flw_ref: data.data.flw_ref,
        authorization_url: data.data.link || data.data.authorization?.url,
        amount: data.data.amount,
        currency: data.data.currency
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error initializing Flutterwave payment",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});


donationRoutes.get("/flutterwave/verify", async (req: Request, res: Response) => {
  try {
    const tx_ref = String(req.query.tx_ref ?? "");

    if (!tx_ref) {
      res.status(400).json({
        success: false,
        message: "Flutterwave tx_ref is required"
      });
      return;
    }

    if (!FLUTTERWAVE_SECRET_KEY) {
      res.status(500).json({
        success: false,
        message: "Flutterwave secret key is not configured"
      });
      return;
    }

    const response = await fetch(`${FLUTTERWAVE_BASE_URL}/transactions/verify_by_reference`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tx_ref })
    });

    const data = await response.json();
    if (!response.ok || data.status !== "success") {
      res.status(response.status || 502).json({
        success: false,
        message: data.message || "Flutterwave verification failed",
        error: data
      });
      return;
    }

    res.json({
      success: true,
      message: "Flutterwave payment verified",
      data: {
        status: data.data.status,
        reference: data.data.tx_ref,
        amount: data.data.amount,
        currency: data.data.currency,
        paidAt: data.data.created_at,
        customer: data.data.customer
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying Flutterwave payment",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
