import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getApiBaseUrl } from "@/lib/api";
import { readJsonResponse } from "@/lib/http";

type VerifyResponse = {
  success?: boolean;
  message?: string;
  data?: {
    amount?: number;
    currency?: string;
    payment_method?: string;
    channel?: string;
    description?: string;
  };
};

const DonateCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "failed" | "error">("loading");
  const [details, setDetails] = useState<{
    amount?: number;
    currency?: string;
    payment_method?: string;
    order_tracking_id?: string;
    message?: string;
  }>({});

  const apiBaseUrl = getApiBaseUrl();

  useEffect(() => {
    const orderTrackingId = searchParams.get("OrderTrackingId");
    const paystackReference = searchParams.get("reference");
    const intasendInvoiceId =
      searchParams.get("invoice_id") || searchParams.get("invoice") || searchParams.get("id");
    const intasendApiRef = searchParams.get("api_ref") || searchParams.get("tracking_id");
    const provider = searchParams.get("provider");

    if (!orderTrackingId && !paystackReference && !intasendInvoiceId && !intasendApiRef) {
      setStatus("error");
      setDetails({ message: "Missing payment reference." });
      return;
    }

    const verifyPayment = async () => {
      try {
        const isPaystack = Boolean(paystackReference) && (provider === "paystack" || !orderTrackingId);
        const isIntasend =
          provider === "intasend" || Boolean(intasendInvoiceId) || Boolean(intasendApiRef);
        const intasendQuery = new URLSearchParams();
        if (intasendInvoiceId) intasendQuery.set("invoice_id", intasendInvoiceId);
        if (intasendApiRef) intasendQuery.set("api_ref", intasendApiRef);
        const verifyUrl = isIntasend
          ? `${apiBaseUrl}/api/donations/intasend/verify?${intasendQuery.toString()}`
          : isPaystack
          ? `${apiBaseUrl}/api/donations/paystack/verify?reference=${encodeURIComponent(paystackReference!)}`
          : `${apiBaseUrl}/api/donations/pesapal/verify?order_tracking_id=${encodeURIComponent(orderTrackingId!)}`;

        const response = await fetch(verifyUrl);
        const data = await readJsonResponse<VerifyResponse>(response);

        setDetails({
          amount: data.data?.amount,
          currency: data.data?.currency,
          payment_method: data.data?.payment_method || data.data?.channel,
          order_tracking_id:
            orderTrackingId ||
            intasendInvoiceId ||
            intasendApiRef ||
            paystackReference ||
            undefined,
          message: data.data?.description || data.message,
        });

        if (response.ok && data.success) {
          setStatus("success");
          return;
        }

        setStatus("failed");
      } catch {
        setStatus("error");
        setDetails({
          message: "Could not verify your payment. Please contact us if you were charged.",
        });
      }
    };

    verifyPayment();
  }, [searchParams, apiBaseUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
          {status === "loading" && (
            <>
              <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
              <CardTitle>Verifying your payment...</CardTitle>
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-green-700">Thank you for your donation!</CardTitle>
            </>
          )}
          {(status === "failed" || status === "error") && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-red-700">Payment not completed</CardTitle>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          {status === "loading" && (
            <p className="text-sm text-muted-foreground">
              Please wait while we confirm your payment.
            </p>
          )}

          {status === "success" && (
            <>
              <p className="text-muted-foreground">
                Your generous gift helps us educate, inspire, and empower girls in Kibera.
              </p>
              {details.amount ? (
                <p className="text-lg font-semibold text-primary">
                  {details.currency || "KES"} {Number(details.amount).toLocaleString()}
                </p>
              ) : null}
              {details.payment_method ? (
                <p className="text-sm text-muted-foreground">Paid via {details.payment_method}</p>
              ) : null}
              {details.order_tracking_id ? (
                <p className="text-xs text-muted-foreground">
                  Reference: {details.order_tracking_id}
                </p>
              ) : null}
            </>
          )}

          {(status === "failed" || status === "error") && (
            <p className="text-sm text-muted-foreground">
              {details.message ||
                "Your payment was not completed. You can try again or use another payment method."}
            </p>
          )}

          <div className="flex flex-col gap-2 pt-2">
            <Button onClick={() => navigate("/donate")}>
              {status === "success" ? "Make another donation" : "Back to donate page"}
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Return to homepage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonateCallback;
