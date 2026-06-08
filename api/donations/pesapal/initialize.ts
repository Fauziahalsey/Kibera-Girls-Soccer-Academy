import type { VercelRequest, VercelResponse } from "@vercel/node";
import { initializePesapalPayment } from "../../lib/pesapal";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { amount, currency, description, callback_url, cancellation_url, billing_address } =
      req.body ?? {};

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid donation amount is required.",
      });
    }

    const result = await initializePesapalPayment({
      amount: Number(amount),
      currency,
      description,
      callback_url,
      cancellation_url,
      billing_address,
    });

    return res.status(200).json({
      success: true,
      message: "Pesapal payment initialized.",
      ...result,
    });
  } catch (error) {
    console.error("Initialize error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error.",
    });
  }
}
