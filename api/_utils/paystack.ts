const PAYSTACK_BASE_URL = "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const FRONTEND_URL = "https://www.kiberagirlssocceracademy.co.ke";

interface PaystackInitResponse {
  status?: boolean;
  message?: string;
  data?: {
    authorization_url?: string;
    access_code?: string;
    reference?: string;
  };
}

interface PaystackVerifyResponse {
  status?: boolean;
  message?: string;
  data?: {
    status?: string;
    reference?: string;
    amount?: number;
    currency?: string;
    paid_at?: string;
    channel?: string;
    customer?: { email?: string };
  };
}

function getSecretKey(): string {
  if (!PAYSTACK_SECRET_KEY?.trim()) {
    throw new Error(
      "Paystack is not configured yet. Add PAYSTACK_SECRET_KEY to your Vercel environment variables."
    );
  }
  return PAYSTACK_SECRET_KEY.trim();
}

function createReference(): string {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `KGSA-PSK-${Date.now()}-${suffix}`;
}

function toSubunitAmount(amount: number, currency: string): number {
  const zeroDecimal = ["JPY"].includes(currency);
  return zeroDecimal ? Math.round(amount) : Math.round(amount * 100);
}

function fromSubunitAmount(amount: number, currency: string): number {
  const zeroDecimal = ["JPY"].includes(currency);
  return zeroDecimal ? amount : amount / 100;
}

export async function initializePaystackPayment(body: {
  amount: number;
  currency?: string;
  email: string;
  donorName?: string;
  phone?: string;
  callback_url?: string;
}) {
  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("A valid donation amount is required.");
  }

  const email = body.email?.trim();
  if (!email) {
    throw new Error("Email address is required for Paystack payment.");
  }

  const currency = (body.currency || "KES").toUpperCase();
  const reference = createReference();
  const secretKey = getSecretKey();

  const payload = {
    email,
    amount: toSubunitAmount(amount, currency),
    currency,
    reference,
    callback_url: body.callback_url || `${FRONTEND_URL}/donate/callback`,
    metadata: {
      donor_name: body.donorName?.trim() || "Anonymous Donor",
      phone: body.phone?.trim() || "",
      purpose: "Donation to Kibera Girls Soccer Academy",
    },
  };

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as PaystackInitResponse;

  if (!response.ok || !data.status || !data.data?.authorization_url) {
    const msg = data.message || "Paystack rejected the payment request.";
    console.error("Paystack initialize failed:", data);
    throw new Error(msg);
  }

  return {
    authorization_url: data.data.authorization_url,
    access_code: data.data.access_code,
    reference: data.data.reference || reference,
  };
}

export async function verifyPaystackPayment(reference: string) {
  if (!reference.trim()) {
    throw new Error("Payment reference is required.");
  }

  const secretKey = getSecretKey();

  const response = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = (await response.json()) as PaystackVerifyResponse;

  if (!response.ok || !data.status || !data.data) {
    throw new Error(data.message || "Failed to verify Paystack payment.");
  }

  const currency = data.data.currency || "KES";
  const isCompleted = data.data.status === "success";

  return {
    success: isCompleted,
    message: isCompleted
      ? "Payment verified successfully."
      : `Payment status: ${data.data.status || "unknown"}.`,
    data: {
      payment_status: data.data.status,
      amount: fromSubunitAmount(data.data.amount ?? 0, currency),
      currency,
      payment_method: data.data.channel,
      reference: data.data.reference || reference,
      paid_at: data.data.paid_at,
      customer_email: data.data.customer?.email,
    },
  };
}
