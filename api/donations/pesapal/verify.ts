import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyPesapalPayment } from "../../../lib/pesapal";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const orderTrackingId = String(req.query.order_tracking_id ?? "");

    if (!orderTrackingId) {
      return res.status(400).json({
        success: false,
        message: "order_tracking_id is required.",
      });
    }

    const result = await verifyPesapalPayment(orderTrackingId);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Verify error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error.",
    });
  }
}
