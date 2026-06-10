const INTASEND_BASE_URL = "https://payment.intasend.com/api/v1";
const INTASEND_PUBLIC_KEY = process.env.INTASEND_PUBLIC_KEY;
const INTASEND_SECRET_KEY = process.env.INTASEND_SECRET_KEY;
const FRONTEND_URL = "https://www.kiberagirlssocceracademy.co.ke";

interface IntaSendCheckoutResponse {
  url?: string;
  redirect_url?: string;
  checkout_url?: string;
  invoice?: {
    invoice_id?: string;
    id?: string;
    url?: string;
    state?: string;
    amount?: number;
    value?: number;
    currency?: string;
  };
  invoice_id?: string;
  id?: string;
  api_ref?: string;
  state?: string;
  message?: string;
  detail?: string;
  errors?: unknown;
}

interface IntaSendStatusResponse {
  invoice?: {
    invoice_id?: string;
    id?: string;
    state?: string;
    amount?: number;
    value?: number;
    currency?: string;
    provider?: string;
    mpesa_reference?: string;
  };
  invoice_id?: string;
  id?: string;
  state?: string;
  amount?: number;
  value?: number;
  currency?: string;
  provider?: string;
  message?: string;
  detail?: string;
  errors?: unknown;
}

function getPublicKey(): string {
  if (!INTASEND_PUBLIC_KEY?.trim()) {
    throw new Error(
      "IntaSend is not configured yet. Add INTASEND_PUBLIC_KEY to your environment variables."
    );
  }
  return INTASEND_PUBLIC_KEY.trim();
}

function getSecretKey(): string {
  if (!INTASEND_SECRET_KEY?.trim()) {
    throw new Error(
      "IntaSend is not configured yet. Add INTASEND_SECRET_KEY to your environment variables."
    );
  }
  return INTASEND_SECRET_KEY.trim();
}

function createReference(): string {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `KGSA-IS-${Date.now()}-${suffix}`;
}

function splitName(name?: string) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  return {
    firstName: parts[0] || "Donor",
    lastName: parts.slice(1).join(" ") || "Guest",
  };
}

function isCompletedState(state?: string): boolean {
  return ["COMPLETE", "COMPLETED", "PAID", "SUCCESS", "SUCCESSFUL"].includes(
    (state || "").toUpperCase()
  );
}

function getCheckoutUrl(data: IntaSendCheckoutResponse): string | undefined {
  return data.url || data.redirect_url || data.checkout_url || data.invoice?.url;
}

function getErrorMessage(data: IntaSendCheckoutResponse | IntaSendStatusResponse, fallback: string) {
  return data.message || data.detail || fallback;
}

async function readProviderJson<T>(response: Response): Promise<T> {
  const text = await response.text();

  if (!text.trim()) {
    return {} as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      response.ok
        ? "IntaSend returned an invalid response."
        : `IntaSend returned an invalid response (${response.status}).`
    );
  }
}

export async function initializeIntaSendPayment(body: {
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
    throw new Error("Email address is required for IntaSend payment.");
  }

  const currency = (body.currency || "KES").toUpperCase();
  const reference = createReference();
  const { firstName, lastName } = splitName(body.donorName);

  const payload = {
    public_key: getPublicKey(),
    amount,
    currency,
    email,
    first_name: firstName,
    last_name: lastName,
    phone_number: body.phone?.trim() || undefined,
    api_ref: reference,
    redirect_url: body.callback_url || `${FRONTEND_URL}/donate/callback?provider=intasend`,
    comment: "Donation to Kibera Girls Soccer Academy",
    host: "https://www.kiberagirlssocceracademy.co.ke",
  };

  const response = await fetch(`${INTASEND_BASE_URL}/checkout/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await readProviderJson<IntaSendCheckoutResponse>(response);
  const checkoutUrl = getCheckoutUrl(data);

  if (!response.ok || !checkoutUrl) {
    console.error("IntaSend initialize failed:", data);
    throw new Error(getErrorMessage(data, "IntaSend rejected the payment request."));
  }

  return {
    checkout_url: checkoutUrl,
    invoice_id: data.invoice_id || data.invoice?.invoice_id || data.invoice?.id || data.id,
    api_ref: data.api_ref || reference,
  };
}

export async function verifyIntaSendPayment(params: { invoice_id?: string; api_ref?: string }) {
  const invoiceId = params.invoice_id?.trim();
  const apiRef = params.api_ref?.trim();

  if (!invoiceId && !apiRef) {
    throw new Error("Payment reference is required.");
  }

  const response = await fetch(`${INTASEND_BASE_URL}/payment/status/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      invoice_id: invoiceId || undefined,
      api_ref: apiRef || undefined,
    }),
  });

  const data = await readProviderJson<IntaSendStatusResponse>(response);
  const invoice = data.invoice || data;
  const state = invoice.state || data.state;

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Failed to verify IntaSend payment."));
  }

  const isCompleted = isCompletedState(state);
  const amount = invoice.amount ?? invoice.value ?? data.amount ?? data.value ?? 0;
  const currency = invoice.currency || data.currency || "KES";

  return {
    success: isCompleted,
    message: isCompleted ? "Payment verified successfully." : `Payment status: ${state || "unknown"}.`,
    data: {
      payment_status: state,
      amount,
      currency,
      payment_method: invoice.provider || data.provider || "IntaSend",
      reference: invoice.invoice_id || invoice.id || data.invoice_id || data.id || invoiceId || apiRef,
      api_ref: apiRef,
    },
  };
}
