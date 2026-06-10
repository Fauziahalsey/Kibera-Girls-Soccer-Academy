import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { amount, currency, email, donorName, phone, callback_url } = req.body ?? {};

    const { initializeIntaSendPayment } = await import("../../_utils/intasend.js");
    const result = await initializeIntaSendPayment({
      amount: Number(amount),
      currency,
      email,
      donorName,
      phone,
      callback_url,
    });

    return res.status(200).json({
      success: true,
      message: "IntaSend payment initialized.",
      checkout_url: result.checkout_url,
      invoice_id: result.invoice_id,
      api_ref: result.api_ref,
    });
  } catch (error) {
    console.error("IntaSend initialize error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error.",
    });
  }
}
