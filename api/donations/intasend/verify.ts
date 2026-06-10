import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const invoice_id = String(req.query.invoice_id ?? "");
    const api_ref = String(req.query.api_ref ?? "");

    if (!invoice_id && !api_ref) {
      return res.status(400).json({
        success: false,
        message: "invoice_id or api_ref is required.",
      });
    }

    const { verifyIntaSendPayment } = await import("../../_utils/intasend.js");
    const result = await verifyIntaSendPayment({ invoice_id, api_ref });
    return res.status(200).json(result);
  } catch (error) {
    console.error("IntaSend verify error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error.",
    });
  }
}
