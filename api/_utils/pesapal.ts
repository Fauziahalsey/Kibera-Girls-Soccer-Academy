const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY ?? "";
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET ?? "";
const PESAPAL_IPN_ID = process.env.PESAPAL_IPN_ID ?? "";

export const PESAPAL_BASE_URL =
  process.env.PESAPAL_ENV === "production"
    ? "https://pay.pesapal.com/v3"
    : "https://cybqa.pesapal.com/pesapalv3";

export const FRONTEND_URL =
  process.env.FRONTEND_URL ?? "https://www.kiberagirlssocceracademy.co.ke";

export const BACKEND_URL =
  process.env.BACKEND_URL ?? "https://www.kiberagirlssocceracademy.co.ke";

interface PesapalTokenResponse {
  token?: string;
  message?: string;
}

interface PesapalOrderResponse {
  order_tracking_id?: string;
  merchant_reference?: string;
  redirect_url?: string;
  message?: string;
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
  line_1?: string;
  line_2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  zip_code?: string;
}

export async function getPesapalToken(): Promise<string> {
  if (!PESAPAL_CONSUMER_KEY || !PESAPAL_CONSUMER_SECRET) {
    throw new Error(
      "Pesapal is not set up yet. Add PESAPAL_CONSUMER_KEY and PESAPAL_CONSUMER_SECRET in Vercel environment variables."
    );
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
    throw new Error(data.message || "Failed to get Pesapal token.");
  }

  return data.token;
}

export function createMerchantReference(): string {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `KGSA-${Date.now()}-${suffix}`;
}

interface PesapalIpnResponse {
  ipn_id?: string;
  url?: string;
  message?: string;
}

function getDefaultIpnUrl(): string {
  return (
    process.env.PESAPAL_IPN_URL ||
    `${BACKEND_URL}/api/donations/pesapal/ipn`
  );
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

  const data = (await response.json()) as PesapalIpnResponse;

  if (!response.ok || !data.ipn_id) {
    console.error("Pesapal register IPN error:", data);
    throw new Error(data.message || "Failed to register IPN URL with Pesapal.");
  }

  return data;
}

async function getNotificationId(): Promise<string> {
  if (PESAPAL_IPN_ID) {
    return PESAPAL_IPN_ID;
  }

  const ipnUrl = getDefaultIpnUrl();
  const data = await registerPesapalIpn(ipnUrl);

  console.log(
    `Pesapal IPN registered. Add this to Vercel as PESAPAL_IPN_ID: ${data.ipn_id}`
  );

  return data.ipn_id!;
}

export async function initializePesapalPayment(body: {
  amount: number;
  currency?: string;
  description?: string;
  callback_url?: string;
  cancellation_url?: string;
  billing_address?: BillingAddress;
}) {
  const notificationId = await getNotificationId();

  const email = body.billing_address?.email_address?.trim();
  const phone = body.billing_address?.phone_number?.trim();

  if (!email && !phone) {
    throw new Error("Email or phone number is required for card payment.");
  }

  const token = await getPesapalToken();
  const merchantReference = createMerchantReference();

  const orderPayload = {
    id: merchantReference,
    currency: body.currency || "KES",
    amount: Number(body.amount),
    description: String(body.description || "Donation to Kibera Girls Soccer Academy").slice(0, 100),
    callback_url: body.callback_url || `${FRONTEND_URL}/donate/callback`,
    cancellation_url: body.cancellation_url || `${FRONTEND_URL}/donate`,
    notification_id: notificationId,
    billing_address: {
      email_address: email,
      phone_number: phone,
      country_code: body.billing_address?.country_code || "KE",
      first_name: body.billing_address?.first_name || "Donor",
      middle_name: body.billing_address?.middle_name || "",
      last_name: body.billing_address?.last_name || "",
      line_1: body.billing_address?.line_1 || "",
      line_2: body.billing_address?.line_2 || "",
      city: body.billing_address?.city || "",
      state: body.billing_address?.state || "",
      postal_code: body.billing_address?.postal_code || "",
      zip_code: body.billing_address?.zip_code || "",
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
    throw new Error(data.message || "Failed to initialize Pesapal payment.");
  }

  return {
    redirect_url: data.redirect_url,
    order_tracking_id: data.order_tracking_id,
    merchant_reference: data.merchant_reference,
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
