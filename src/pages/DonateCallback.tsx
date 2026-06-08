import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "";

  useEffect(() => {
    const orderTrackingId = searchParams.get("OrderTrackingId");

    if (!orderTrackingId) {
      setStatus("error");
      setDetails({ message: "Missing payment reference from Pesapal." });
      return;
    }

    if (!apiBaseUrl) {
      setStatus("error");
      setDetails({
        message:
          "Payment verification is not configured. Set VITE_API_BASE_URL to your backend server URL.",
      });
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/donations/pesapal/verify?order_tracking_id=${encodeURIComponent(orderTrackingId)}`
        );
        const data = await response.json();

        setDetails({
          amount: data.data?.amount,
          currency: data.data?.currency,
          payment_method: data.data?.payment_method,
          order_tracking_id: orderTrackingId,
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
              Please wait while we confirm your payment with Pesapal.
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
