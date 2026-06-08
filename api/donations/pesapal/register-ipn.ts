import type { VercelRequest, VercelResponse } from "@vercel/node";
import { BACKEND_URL, registerPesapalIpn } from "../../_lib/pesapal";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const ipnUrl =
      req.body?.url ||
      process.env.PESAPAL_IPN_URL ||
      `${BACKEND_URL}/api/donations/pesapal/ipn`;

    const data = await registerPesapalIpn(ipnUrl);

    return res.status(200).json({
      success: true,
      message: "IPN registered. Save ipn_id as PESAPAL_IPN_ID in your environment variables.",
      data,
    });
  } catch (error) {
    console.error("Register IPN error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error.",
    });
  }
}
