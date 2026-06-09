import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { amount, currency, email, donorName, phone, callback_url } = req.body ?? {};

    const { initializePaystackPayment } = await import("../../_utils/paystack.js");
    const result = await initializePaystackPayment({
      amount: Number(amount),
      currency,
      email,
      donorName,
      phone,
      callback_url,
    });

    return res.status(200).json({
      success: true,
      message: "Paystack payment initialized.",
      authorization_url: result.authorization_url,
      access_code: result.access_code,
      reference: result.reference,
    });
  } catch (error) {
    console.error("Paystack initialize error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error.",
    });
  }
}
