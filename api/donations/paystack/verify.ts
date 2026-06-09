import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const reference = String(req.query.reference ?? "");

    if (!reference) {
      return res.status(400).json({
        success: false,
        message: "reference is required.",
      });
    }

    const { verifyPaystackPayment } = await import("../../_utils/paystack.js");
    const result = await verifyPaystackPayment(reference);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Paystack verify error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error.",
    });
  }
}
