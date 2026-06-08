// Production Pesapal configuration for Kibera Girls Soccer Academy
const PESAPAL_CONSUMER_KEY = "X4e369i6izufetR8Y6R2drAfeFZ74pvh";
const PESAPAL_CONSUMER_SECRET = "6PhHqPDc0fobS93yyKjom5y+CJE=";
const PESAPAL_IPN_ID = "b950f3ed-8445-421e-a00f-da49e9823757";
const PESAPAL_BASE_URL = "https://pay.pesapal.com/v3";
const FRONTEND_URL = "https://www.kiberagirlssocceracademy.co.ke";
const BACKEND_URL = "https://www.kiberagirlssocceracademy.co.ke";

interface PesapalTokenResponse {
  token?: string;
  message?: string;
  error?: { message?: string };
}

interface PesapalOrderResponse {
  order_tracking_id?: string;
  merchant_reference?: string;
  redirect_url?: string;
  message?: string;
  error?: { message?: string };
}

export interface PesapalStatusResponse {
  payment_method?: string;
  amount?: number;
  currency?: string;
  payment_status_description?: string;
  description?: string;
  message?: string;
  merchant_reference?: string;
  confirmation_code?: string;
  status_code?: number;
}

export interface BillingAddress {
  email_address?: string;
  phone_number?: string;
  country_code?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
}

export { FRONTEND_URL, BACKEND_URL };

async function getPesapalToken(): Promise<string> {
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
    const msg = data.error?.message || data.message || "Failed to get Pesapal token.";
    throw new Error(msg);
  }

  return data.token;
}

function createMerchantReference(): string {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `KGSA-${Date.now()}-${suffix}`;
}

function buildBillingAddress(billing?: BillingAddress) {
  const email = billing?.email_address?.trim() || "";
  const phone = billing?.phone_number?.trim() || "";
  const firstName = billing?.first_name?.trim() || "Donor";
  const lastName = billing?.last_name?.trim() || "Guest";

  if (!email && !phone) {
    throw new Error("Email or phone number is required for card payment.");
  }

  return {
    email_address: email || undefined,
    phone_number: phone || "0700000000",
    country_code: "KE",
    first_name: firstName,
    middle_name: "",
    last_name: lastName,
  };
}

export async function initializePesapalPayment(body: {
  amount: number;
  currency?: string;
  description?: string;
  callback_url?: string;
  cancellation_url?: string;
  billing_address?: BillingAddress;
}) {
  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("A valid donation amount is required.");
  }

  const token = await getPesapalToken();
  const merchantReference = createMerchantReference();
  const billing = buildBillingAddress(body.billing_address);

  const orderPayload = {
    id: merchantReference,
    currency: body.currency || "KES",
    amount,
    description: String(body.description || "Donation to Kibera Girls Soccer Academy").slice(0, 100),
    callback_url: body.callback_url || `${FRONTEND_URL}/donate/callback`,
    cancellation_url: body.cancellation_url || `${FRONTEND_URL}/donate`,
    notification_id: PESAPAL_IPN_ID,
    billing_address: billing,
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
    const msg =
      data.error?.message ||
      data.message ||
      `Pesapal rejected the payment request (status ${response.status}).`;
    console.error("Pesapal SubmitOrderRequest failed:", data);
    throw new Error(msg);
  }

  return {
    redirect_url: data.redirect_url,
    order_tracking_id: data.order_tracking_id,
    merchant_reference: data.merchant_reference || merchantReference,
  };
}

export async function verifyPesapalPayment(orderTrackingId: string) {
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
    throw new Error(data.message || "Failed to verify Pesapal payment.");
  }

  const paymentStatus = (data.payment_status_description || "").toUpperCase();
  const isCompleted = paymentStatus === "COMPLETED" || data.status_code === 1;

  return {
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
  };
}

export async function registerPesapalIpn(ipnUrl: string) {
  const token = await getPesapalToken();

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

  if (!response.ok || !data.ipn_id) {
    throw new Error(data.message || "Failed to register IPN URL with Pesapal.");
  }

  return data;
}

export async function handlePesapalIpn(query: Record<string, string | string[] | undefined>) {
  const orderTrackingId = String(query.OrderTrackingId ?? "");
  const orderMerchantReference = String(query.OrderMerchantReference ?? "");
  const orderNotificationType = String(query.OrderNotificationType ?? "IPNCHANGE");

  if (!orderTrackingId) {
    return {
      orderNotificationType,
      orderTrackingId,
      orderMerchantReference,
      status: 500,
      message: "Missing OrderTrackingId",
    };
  }

  try {
    await verifyPesapalPayment(orderTrackingId);
  } catch (error) {
    console.error("Pesapal IPN status check failed:", error);
  }

  return {
    orderNotificationType,
    orderTrackingId,
    orderMerchantReference,
    status: 200,
  };
}
