import { Router, Request, Response } from "express";

const router = Router();

const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY ?? "";
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET ?? "";
const PESAPAL_IPN_ID = process.env.PESAPAL_IPN_ID ?? "";
const PESAPAL_BASE_URL =
  process.env.PESAPAL_ENV === "production"
    ? "https://pay.pesapal.com/v3"
    : "https://cybqa.pesapal.com/pesapalv3";

const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:8080";
const BACKEND_URL = process.env.BACKEND_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;

interface PesapalTokenResponse {
  token?: string;
  message?: string;
  error?: unknown;
}

interface PesapalOrderResponse {
  order_tracking_id?: string;
  merchant_reference?: string;
  redirect_url?: string;
  message?: string;
  error?: unknown;
}

interface PesapalStatusResponse {
  payment_method?: string;
  amount?: number;
  currency?: string;
  payment_status_description?: string;
  description?: string;
  message?: string;
  merchant_reference?: string;
  confirmation_code?: string;
  status_code?: number;
  error?: unknown;
}

async function getPesapalToken(): Promise<string> {
  if (!PESAPAL_CONSUMER_KEY || !PESAPAL_CONSUMER_SECRET) {
    throw new Error("Pesapal credentials are not configured on the server.");
  }

  const res = await fetch(`${PESAPAL_BASE_URL}/api/Auth/RequestToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      consumer_key: PESAPAL_CONSUMER_KEY,
      consumer_secret: PESAPAL_CONSUMER_SECRET,
    }),
  });

  const data = (await res.json()) as PesapalTokenResponse;

  if (!res.ok || !data.token) {
    console.error("Pesapal token error:", data);
    throw new Error(data.message || "Failed to get Pesapal token.");
  }

  return data.token;
}

function createMerchantReference(): string {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `KGSA-${Date.now()}-${suffix}`;
}

// POST /api/donations/pesapal/register-ipn
// Run once after deployment to obtain PESAPAL_IPN_ID
router.post("/register-ipn", async (req: Request, res: Response) => {
  try {
    const token = await getPesapalToken();
    const ipnUrl =
      req.body.url ||
      process.env.PESAPAL_IPN_URL ||
      `${BACKEND_URL}/api/donations/pesapal/ipn`;

    const response = await fetch(`${PESAPAL_BASE_URL}/api/URLSetup/RegisterIPN`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: ipnUrl,
        ipn_notification_type: "GET",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: "Failed to register IPN URL with Pesapal.",
        error: data,
      });
    }

    return res.json({
      success: true,
      message: "IPN registered. Save ipn_id as PESAPAL_IPN_ID in your environment variables.",
      data,
    });
  } catch (error) {
    console.error("Register IPN error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error.",
    });
  }
});

// POST /api/donations/pesapal/initialize
router.post("/initialize", async (req: Request, res: Response) => {
  try {
    const {
      amount,
      currency = "KES",
      description = "Donation to Kibera Girls Soccer Academy",
      callback_url,
      cancellation_url,
      billing_address,
    } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid donation amount is required.",
      });
    }

    if (!PESAPAL_IPN_ID) {
      return res.status(500).json({
        success: false,
        message:
          "Pesapal IPN is not configured. Register your IPN URL and set PESAPAL_IPN_ID on the server.",
      });
    }

    const email = billing_address?.email_address?.trim();
    const phone = billing_address?.phone_number?.trim();

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        message: "Email or phone number is required for card payment.",
      });
    }

    const token = await getPesapalToken();
    const merchantReference = createMerchantReference();

    const orderPayload = {
      id: merchantReference,
      currency,
      amount: Number(amount),
      description: String(description).slice(0, 100),
      callback_url: callback_url || `${FRONTEND_URL}/donate/callback`,
      cancellation_url: cancellation_url || `${FRONTEND_URL}/donate`,
      notification_id: PESAPAL_IPN_ID,
      billing_address: {
        email_address: email,
        phone_number: phone,
        country_code: billing_address?.country_code || "KE",
        first_name: billing_address?.first_name || "Donor",
        middle_name: billing_address?.middle_name || "",
        last_name: billing_address?.last_name || "",
        line_1: billing_address?.line_1 || "",
        line_2: billing_address?.line_2 || "",
        city: billing_address?.city || "",
        state: billing_address?.state || "",
        postal_code: billing_address?.postal_code || "",
        zip_code: billing_address?.zip_code || "",
      },
    };

    const response = await fetch(`${PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    const data = (await response.json()) as PesapalOrderResponse;

    if (!response.ok || !data.redirect_url) {
      console.error("Pesapal initialize error:", data);
      return res.status(response.status || 502).json({
        success: false,
        message: data.message || "Failed to initialize Pesapal payment.",
        error: data,
      });
    }

    return res.json({
      success: true,
      message: "Pesapal payment initialized.",
      redirect_url: data.redirect_url,
      order_tracking_id: data.order_tracking_id,
      merchant_reference: data.merchant_reference,
    });
  } catch (error) {
    console.error("Initialize error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error.",
    });
  }
});

// GET /api/donations/pesapal/verify?order_tracking_id=xxx
router.get("/verify", async (req: Request, res: Response) => {
  try {
    const orderTrackingId = String(req.query.order_tracking_id ?? "");

    if (!orderTrackingId) {
      return res.status(400).json({
        success: false,
        message: "order_tracking_id is required.",
      });
    }

    const token = await getPesapalToken();

    const response = await fetch(
      `${PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${encodeURIComponent(orderTrackingId)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await response.json()) as PesapalStatusResponse;

    if (!response.ok) {
      return res.status(response.status || 502).json({
        success: false,
        message: data.message || "Failed to verify Pesapal payment.",
        error: data,
      });
    }

    const paymentStatus = (data.payment_status_description || "").toUpperCase();
    const isCompleted = paymentStatus === "COMPLETED" || data.status_code === 1;

    return res.json({
      success: isCompleted,
      message: data.description || data.message || "Payment status retrieved.",
      data: {
        payment_status: paymentStatus,
        amount: data.amount,
        currency: data.currency,
        payment_method: data.payment_method,
        order_tracking_id: orderTrackingId,
        merchant_reference: data.merchant_reference,
        confirmation_code: data.confirmation_code,
        description: data.description,
      },
    });
  } catch (error) {
    console.error("Verify error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error.",
    });
  }
});

// GET /api/donations/pesapal/ipn
router.get("/ipn", async (req: Request, res: Response) => {
  try {
    const orderTrackingId = String(req.query.OrderTrackingId ?? "");
    const orderMerchantReference = String(req.query.OrderMerchantReference ?? "");
    const orderNotificationType = String(req.query.OrderNotificationType ?? "IPNCHANGE");

    if (!orderTrackingId) {
      return res.status(400).json({
        orderNotificationType,
        orderTrackingId,
        orderMerchantReference,
        status: 500,
        message: "Missing OrderTrackingId",
      });
    }

    const token = await getPesapalToken();

    const statusResponse = await fetch(
      `${PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${encodeURIComponent(orderTrackingId)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const statusData = (await statusResponse.json()) as PesapalStatusResponse;

    if (statusResponse.ok) {
      console.log("Pesapal IPN payment update:", {
        orderTrackingId,
        orderMerchantReference,
        status: statusData.payment_status_description,
        amount: statusData.amount,
        currency: statusData.currency,
      });
      // TODO: persist donation record in database when payment is COMPLETED
    } else {
      console.error("Pesapal IPN status check failed:", statusData);
    }

    return res.json({
      orderNotificationType,
      orderTrackingId,
      orderMerchantReference,
      status: 200,
    });
  } catch (error) {
    console.error("IPN error:", error);
    return res.status(500).json({
      orderNotificationType: "IPNCHANGE",
      status: 500,
      message: "IPN processing error",
    });
  }
});

export default router;
