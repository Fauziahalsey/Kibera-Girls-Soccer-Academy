import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { handlePesapalIpn } = await import("../../_utils/pesapal.js");
    const result = await handlePesapalIpn(req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error("IPN error:", error);
    return res.status(500).json({
      orderNotificationType: "IPNCHANGE",
      status: 500,
      message: "IPN processing error",
    });
  }
}
