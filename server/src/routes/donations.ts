import { Router, Request, Response } from "express";

const INTASEND_BASE_URL = "https://payment.intasend.com/api/v1";
const INTASEND_PUBLIC_KEY = process.env.INTASEND_PUBLIC_KEY;
const INTASEND_SECRET_KEY = process.env.INTASEND_SECRET_KEY;
const FLUTTERWAVE_BASE_URL = "https://api.flutterwave.com/v3";
const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;

export const donationRoutes = Router();

async function readProviderJson(response: globalThis.Response) {
  const text = await response.text();

  if (!text.trim()) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      response.ok
        ? "Payment provider returned an invalid response."
        : `Payment provider returned an invalid response (${response.status}).`
    );
  }
}

// GET - Retrieve donation information
donationRoutes.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Donation endpoint",
    data: {
      acceptedPaymentMethods: ["mpesa", "bank", "paypal", "intasend", "flutterwave"],
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

// POST - Initialize IntaSend payment
donationRoutes.post("/intasend/initialize", async (req: Request, res: Response) => {
  try {
    const { amount, currency, email, donorName, phone, callback_url } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid donation amount"
      });
      return;
    }

    if (!email?.trim()) {
      res.status(400).json({
        success: false,
        message: "Email address is required for IntaSend payment."
      });
      return;
    }

    if (!INTASEND_PUBLIC_KEY || !INTASEND_SECRET_KEY) {
      res.status(500).json({
        success: false,
        message: "IntaSend keys are not configured"
      });
      return;
    }

    const reference = `KGSA-IS-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const nameParts = String(donorName || "").trim().split(/\s+/).filter(Boolean);

    const payload = {
      public_key: INTASEND_PUBLIC_KEY,
      amount: Number(amount),
      currency: String(currency || "KES").toUpperCase(),
      email: email.trim(),
      first_name: nameParts[0] || "Donor",
      last_name: nameParts.slice(1).join(" ") || "Guest",
      phone_number: phone?.trim() || undefined,
      api_ref: reference,
      redirect_url:
        callback_url ||
        `${process.env.FRONTEND_URL || "http://localhost:8080"}/donate/callback?provider=intasend`,
      comment: "Donation to Kibera Girls Soccer Academy",
      host: process.env.FRONTEND_URL || "http://localhost:8080"
    };

    const response = await fetch(`${INTASEND_BASE_URL}/checkout/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${INTASEND_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await readProviderJson(response);
    const checkoutUrl = data.url || data.redirect_url || data.checkout_url || data.invoice?.url;

    if (!response.ok || !checkoutUrl) {
      res.status(response.status || 502).json({
        success: false,
        message: data.message || data.detail || "IntaSend initialization failed",
        error: data
      });
      return;
    }

    res.json({
      success: true,
      message: "IntaSend payment initialized",
      checkout_url: checkoutUrl,
      invoice_id: data.invoice_id || data.invoice?.invoice_id || data.invoice?.id || data.id,
      api_ref: data.api_ref || reference
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error initializing IntaSend payment",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// GET - Verify IntaSend payment
donationRoutes.get("/intasend/verify", async (req: Request, res: Response) => {
  try {
    const invoice_id = String(req.query.invoice_id ?? "");
    const api_ref = String(req.query.api_ref ?? "");

    if (!invoice_id && !api_ref) {
      res.status(400).json({
        success: false,
        message: "IntaSend invoice_id or api_ref is required"
      });
      return;
    }

    if (!INTASEND_SECRET_KEY) {
      res.status(500).json({
        success: false,
        message: "IntaSend secret key is not configured"
      });
      return;
    }

    const response = await fetch(`${INTASEND_BASE_URL}/payment/status/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${INTASEND_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        invoice_id: invoice_id || undefined,
        api_ref: api_ref || undefined
      })
    });

    const data = await readProviderJson(response);
    if (!response.ok) {
      res.status(response.status || 502).json({
        success: false,
        message: data.message || data.detail || "IntaSend verification failed",
        error: data
      });
      return;
    }

    const invoice = data.invoice || data;
    const paymentStatus = String(invoice.state || data.state || "");
    const isCompleted = ["COMPLETE", "COMPLETED", "PAID", "SUCCESS", "SUCCESSFUL"].includes(
      paymentStatus.toUpperCase()
    );

    res.json({
      success: isCompleted,
      message: isCompleted ? "IntaSend payment verified" : `Payment status: ${paymentStatus || "unknown"}`,
      data: {
        payment_status: paymentStatus,
        reference: invoice.invoice_id || invoice.id || data.invoice_id || data.id || invoice_id || api_ref,
        amount: invoice.amount ?? invoice.value ?? data.amount ?? data.value,
        currency: invoice.currency || data.currency || "KES",
        payment_method: invoice.provider || data.provider || "IntaSend",
        api_ref
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying IntaSend payment",
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
