import type { VercelRequest, VercelResponse } from "@vercel/node";

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

    const { initializePesapalPayment } = await import("../../_utils/pesapal.js");
    const result = await initializePesapalPayment({
      amount: Number(amount),
      currency,
      description,
      callback_url,
      cancellation_url,
      billing_address,
    });

    if (!result.redirect_url) {
      return res.status(502).json({
        success: false,
        message: "Pesapal did not return a payment link. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pesapal payment initialized.",
      redirect_url: result.redirect_url,
      order_tracking_id: result.order_tracking_id,
      merchant_reference: result.merchant_reference,
    });
  } catch (error) {
    console.error("Initialize error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error.",
    });
  }
}
