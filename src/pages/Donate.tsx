import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  CreditCard,
  Building,
  GraduationCap,
  BookOpen,
  Utensils,
  Trophy,
  CheckCircle,
  Loader2,
  Shield,
  Globe,
  Copy,
  Check,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { getApiBaseUrl } from "@/lib/api";

type Currency = "KES" | "USD" | "EUR";

const CURRENCIES: Record<
  Currency,
  { label: string; symbol: string; flag: string; cardMax: number | null }
> = {
  KES: { label: "Kenyan Shilling", symbol: "KSh", flag: "🇰🇪", cardMax: 2000 },
  USD: { label: "US Dollar", symbol: "$", flag: "🇺🇸", cardMax: null },
  EUR: { label: "Euro", symbol: "€", flag: "🇪🇺", cardMax: null },
};

const DONATION_PRESETS: Record<Currency, { amount: number; impact: string }[]> = {
  KES: [
    { amount: 2000, impact: "Meals for 1 student for a week" },
    { amount: 5000, impact: "Textbooks for 5 students" },
    { amount: 25000, impact: "One student's full term education" },
    { amount: 50000, impact: "Computer equipment for the lab" },
    { amount: 100000, impact: "Laboratory equipment upgrade" },
  ],
  USD: [
    { amount: 20, impact: "Meals for 1 student for a week" },
    { amount: 50, impact: "Textbooks for 5 students" },
    { amount: 200, impact: "One student's full term education" },
    { amount: 500, impact: "Computer equipment for the lab" },
    { amount: 1000, impact: "Laboratory equipment upgrade" },
  ],
  EUR: [
    { amount: 20, impact: "Meals for 1 student for a week" },
    { amount: 50, impact: "Textbooks for 5 students" },
    { amount: 180, impact: "One student's full term education" },
    { amount: 450, impact: "Computer equipment for the lab" },
    { amount: 900, impact: "Laboratory equipment upgrade" },
  ],
};

const IMPACT_BASE_KES = [
  { icon: GraduationCap, title: "Student Scholarships", target: 1_500_000, raised: 800_000 },
  { icon: BookOpen, title: "Library Enhancement", target: 500_000, raised: 350_000 },
  { icon: Utensils, title: "Nutrition Program", target: 800_000, raised: 450_000 },
  { icon: Trophy, title: "Sports Equipment", target: 300_000, raised: 180_000 },
];

const KES_PER: Record<Currency, number> = { KES: 1, USD: 130, EUR: 140 };

const bankAccountNumber = "2023525383";

type PaymentMethod = "Credit Card" | "Paystack" | "Bank Transfer";

function formatMoney(amount: number, currency: Currency): string {
  const { symbol } = CURRENCIES[currency];
  const formatted = amount.toLocaleString(undefined, {
    minimumFractionDigits: currency === "KES" ? 0 : 0,
    maximumFractionDigits: currency === "KES" ? 0 : 2,
  });
  if (currency === "USD") return `${symbol}${formatted}`;
  if (currency === "EUR") return `${symbol}${formatted}`;
  return `${symbol} ${formatted}`;
}

function convertFromKes(kes: number, currency: Currency): number {
  if (currency === "KES") return kes;
  return Math.round(kes / KES_PER[currency]);
}

const Donate = () => {
  const [currency, setCurrency] = useState<Currency>("KES");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [pesapalStatus, setPesapalStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [pesapalMessage, setPesapalMessage] = useState("");
  const [paystackStatus, setPaystackStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [paystackMessage, setPaystackMessage] = useState("");

  const donationApiUrl = `${getApiBaseUrl()}/api/donations`;
  const { cardMax } = CURRENCIES[currency];
  const presets = DONATION_PRESETS[currency];

  const getDonationAmount = () => {
    if (selectedAmount !== null) return selectedAmount;
    const custom = Number(customAmount);
    return Number.isFinite(custom) && custom > 0 ? custom : 0;
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCurrencyChange = (next: Currency) => {
    setCurrency(next);
    setSelectedAmount(null);
    setCustomAmount("");
    setPesapalStatus("idle");
    setPesapalMessage("");
    setPaystackStatus("idle");
    setPaystackMessage("");
    if (selectedPaymentMethod === "Credit Card" && CURRENCIES[next].cardMax) {
      const amount = getDonationAmount();
      if (amount > CURRENCIES[next].cardMax!) {
        setSelectedAmount(CURRENCIES[next].cardMax);
        setCustomAmount("");
      }
    }
  };

  const handlePesapalPayment = async () => {
    const amount = getDonationAmount();

    if (!amount || amount <= 0) {
      setPesapalStatus("error");
      setPesapalMessage("Please enter a valid donation amount.");
      return;
    }

    if (!donorEmail.trim()) {
      setPesapalStatus("error");
      setPesapalMessage("Email address is required for card payment.");
      return;
    }

    if (cardMax && amount > cardMax) {
      setPesapalStatus("error");
      setPesapalMessage(
        `Card payments are limited to ${formatMoney(cardMax, currency)} per transaction. Please choose a lower amount or use bank transfer.`
      );
      return;
    }

    try {
      setPesapalStatus("processing");
      setPesapalMessage("Initializing secure payment...");

      const res = await fetch(`${donationApiUrl}/pesapal/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency,
          description: "Donation to Kibera Girls Soccer Academy",
          callback_url: `${window.location.origin}/donate/callback`,
          cancellation_url: `${window.location.origin}/donate`,
          billing_address: {
            email_address: donorEmail.trim(),
            phone_number: donorPhone.trim() || "",
            country_code: currency === "KES" ? "KE" : currency === "USD" ? "US" : "EU",
            first_name: donorName.trim().split(" ")[0] || "Donor",
            last_name: donorName.trim().split(" ").slice(1).join(" ") || "Guest",
          },
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to initialize Pesapal payment.");
      }

      if (!data.redirect_url) {
        throw new Error("Payment link was not received. Please try again.");
      }

      window.location.assign(data.redirect_url);
    } catch (error) {
      setPesapalStatus("error");
      if (error instanceof TypeError) {
        setPesapalMessage("Could not reach the payment server. Please try again in a moment.");
      } else {
        setPesapalMessage(error instanceof Error ? error.message : "Payment initialization failed.");
      }
    }
  };

  const handlePaystackPayment = async () => {
    const amount = getDonationAmount();

    if (!amount || amount <= 0) {
      setPaystackStatus("error");
      setPaystackMessage("Please enter a valid donation amount.");
      return;
    }

    if (!donorEmail.trim()) {
      setPaystackStatus("error");
      setPaystackMessage("Email address is required for payment.");
      return;
    }

    try {
      setPaystackStatus("processing");
      setPaystackMessage("Initializing secure payment...");

      const res = await fetch(`${donationApiUrl}/paystack/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency,
          email: donorEmail.trim(),
          donorName: donorName.trim() || "Anonymous Donor",
          phone: donorPhone.trim() || "",
          callback_url: `${window.location.origin}/donate/callback?provider=paystack`,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to initialize Paystack payment.");
      }

      if (!data.authorization_url) {
        throw new Error("Payment link was not received. Please try again.");
      }

      window.location.assign(data.authorization_url);
    } catch (error) {
      setPaystackStatus("error");
      if (error instanceof TypeError) {
        setPaystackMessage("Could not reach the payment server. Please try again in a moment.");
      } else {
        setPaystackMessage(error instanceof Error ? error.message : "Payment initialization failed.");
      }
    }
  };

  const paymentMethods = [
    { name: "Credit Card" as const, icon: CreditCard, description: "Visa, MasterCard via Pesapal" },
    { name: "Paystack" as const, icon: Wallet, description: "Card, M-Pesa & bank via Paystack" },
    { name: "Bank Transfer" as const, icon: Building, description: "Direct transfer to our account" },
  ];

  const isPesapalLimited = selectedPaymentMethod === "Credit Card" && cardMax !== null;

  const amount = getDonationAmount();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative py-16 md:py-20 text-white overflow-hidden"
        style={{ background: "var(--hero-gradient)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
            <Heart className="h-4 w-4" />
            <span>Every gift changes a life</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Support Our Students</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Your donation provides education, nutrition, and opportunity for girls in Kibera.
            Give in Kenyan Shillings, US Dollars, or Euros.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-[var(--card-shadow)] border-0">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">Make a Donation</CardTitle>
                    <CardDescription>Choose your currency and amount</CardDescription>
                  </div>
                  {/* Currency selector */}
                  <div className="flex rounded-lg border bg-muted/50 p-1 gap-1">
                    {(Object.keys(CURRENCIES) as Currency[]).map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => handleCurrencyChange(code)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                          currency === code
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-background"
                        }`}
                      >
                        <span>{CURRENCIES[code].flag}</span>
                        <span>{code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Preset amounts */}
                <div>
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 block">
                    Select an amount ({currency})
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {presets.map((option) => {
                      const cardBlocked =
                        selectedPaymentMethod === "Credit Card" &&
                        cardMax !== null &&
                        option.amount > cardMax;
                      const isSelected = selectedAmount === option.amount;
                      return (
                        <button
                          key={option.amount}
                          type="button"
                          disabled={cardBlocked}
                          onClick={() => {
                            setSelectedAmount(option.amount);
                            setCustomAmount("");
                          }}
                          className={`text-left p-4 rounded-xl border-2 transition-all ${
                            cardBlocked
                              ? "opacity-40 cursor-not-allowed border-border"
                              : isSelected
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border hover:border-primary/50 hover:bg-muted/50"
                          }`}
                        >
                          <div className="text-lg font-bold text-primary">
                            {formatMoney(option.amount, currency)}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 leading-snug">
                            {option.impact}
                          </div>
                          {cardBlocked && (
                            <div className="text-xs text-amber-700 mt-2">Use Paystack or bank transfer</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom amount */}
                <div className="space-y-2">
                  <Label htmlFor="customAmount" className="font-semibold">
                    Or enter a custom amount
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
                      {CURRENCIES[currency].symbol}
                    </span>
                    <Input
                      id="customAmount"
                      type="number"
                      min={currency === "KES" ? 100 : 1}
                      max={
                        selectedPaymentMethod === "Credit Card" && cardMax ? cardMax : undefined
                      }
                      value={customAmount}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (
                          selectedPaymentMethod === "Credit Card" &&
                          cardMax &&
                          Number(value) > cardMax
                        ) {
                          value = String(cardMax);
                        }
                        setCustomAmount(value);
                        setSelectedAmount(null);
                      }}
                      placeholder={
                        cardMax && selectedPaymentMethod === "Credit Card"
                          ? `Up to ${formatMoney(cardMax, currency)}`
                          : `Amount in ${currency}`
                      }
                      className="pl-10 text-lg h-12"
                    />
                  </div>
                </div>

                {/* Selected total */}
                {amount > 0 && (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <span className="text-sm font-medium text-muted-foreground">Your donation</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatMoney(amount, currency)}
                    </span>
                  </div>
                )}

                {/* Payment methods */}
                <div className="space-y-4 pt-2 border-t">
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Payment method
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = selectedPaymentMethod === method.name;
                      return (
                        <button
                          key={method.name}
                          type="button"
                          onClick={() => {
                            setSelectedPaymentMethod(method.name);
                            setPesapalStatus("idle");
                            setPesapalMessage("");
                            setPaystackStatus("idle");
                            setPaystackMessage("");
                            if (method.name === "Credit Card" && cardMax && amount > cardMax) {
                              setSelectedAmount(cardMax);
                              setCustomAmount("");
                            }
                          }}
                          className={`p-5 rounded-xl border-2 text-left transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border hover:border-primary/40 hover:bg-muted/30"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-1">
                            <div
                              className={`p-2 rounded-lg ${
                                isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className="font-semibold">{method.name}</span>
                          </div>
                          <p className="text-sm text-muted-foreground pl-11">{method.description}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Credit Card */}
                  {selectedPaymentMethod === "Credit Card" && (
                    <div className="rounded-xl border bg-gradient-to-br from-muted/80 to-muted/30 p-6 space-y-5">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold">Secure card payment via Pesapal</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            You will be redirected to enter your card details. Funds settle to our
                            Absa bank account within 1–3 business days.
                          </p>
                        </div>
                      </div>

                      {cardMax && (
                        <div className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
                          Card payments in {currency} are limited to{" "}
                          <strong>{formatMoney(cardMax, currency)}</strong> per transaction. For
                          larger gifts, please use bank transfer.
                        </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <Label htmlFor="pesapalName">Full name</Label>
                          <Input
                            id="pesapalName"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            placeholder="Your full name"
                            className="mt-1.5"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="pesapalEmail">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="pesapalEmail"
                            type="email"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="mt-1.5"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="pesapalPhone">
                            Phone <span className="text-muted-foreground font-normal">(optional)</span>
                          </Label>
                          <Input
                            id="pesapalPhone"
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                            placeholder="+254 7XX XXX XXX"
                            className="mt-1.5"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={handlePesapalPayment}
                        disabled={
                          pesapalStatus === "processing" ||
                          amount <= 0 ||
                          (cardMax !== null && amount > cardMax) ||
                          !donorEmail.trim()
                        }
                        size="lg"
                        className="w-full h-12 text-base"
                      >
                        {pesapalStatus === "processing" ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Redirecting to secure checkout...
                          </>
                        ) : (
                          <>
                            <CreditCard className="h-5 w-5 mr-2" />
                            Pay {amount > 0 ? formatMoney(amount, currency) : ""} securely
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        256-bit SSL · 3D Secure · PCI DSS compliant
                      </p>

                      {pesapalMessage && (
                        <div
                          className={`rounded-lg border p-3 text-sm ${
                            pesapalStatus === "error"
                              ? "border-red-300 bg-red-50 text-red-900"
                              : "border-blue-300 bg-blue-50 text-blue-900"
                          }`}
                        >
                          {pesapalMessage}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Paystack */}
                  {selectedPaymentMethod === "Paystack" && (
                    <div className="rounded-xl border bg-gradient-to-br from-muted/80 to-muted/30 p-6 space-y-5">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold">Pay securely with Paystack</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Pay by card, M-Pesa, or bank on Paystack&apos;s secure checkout page.
                            Supports larger donations in {currency}.
                          </p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <Label htmlFor="paystackName">Full name</Label>
                          <Input
                            id="paystackName"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            placeholder="Your full name"
                            className="mt-1.5"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="paystackEmail">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="paystackEmail"
                            type="email"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="mt-1.5"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="paystackPhone">
                            Phone <span className="text-muted-foreground font-normal">(optional)</span>
                          </Label>
                          <Input
                            id="paystackPhone"
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                            placeholder="+254 7XX XXX XXX"
                            className="mt-1.5"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={handlePaystackPayment}
                        disabled={
                          paystackStatus === "processing" || amount <= 0 || !donorEmail.trim()
                        }
                        size="lg"
                        className="w-full h-12 text-base"
                      >
                        {paystackStatus === "processing" ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Redirecting to Paystack...
                          </>
                        ) : (
                          <>
                            <Wallet className="h-5 w-5 mr-2" />
                            Pay {amount > 0 ? formatMoney(amount, currency) : ""} with Paystack
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Secured by Paystack · 256-bit SSL · PCI DSS compliant
                      </p>

                      {paystackMessage && (
                        <div
                          className={`rounded-lg border p-3 text-sm ${
                            paystackStatus === "error"
                              ? "border-red-300 bg-red-50 text-red-900"
                              : "border-blue-300 bg-blue-50 text-blue-900"
                          }`}
                        >
                          {paystackMessage}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bank Transfer */}
                  {selectedPaymentMethod === "Bank Transfer" && (
                    <div className="rounded-xl border bg-gradient-to-br from-muted/80 to-muted/30 p-6 space-y-5">
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold">Bank transfer details</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Transfer in {currency}. Use the reference{" "}
                            <Badge variant="secondary" className="font-mono">
                              KGSA-DONATION
                            </Badge>{" "}
                            so we can identify your gift.
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-3">
                        {[
                          { label: "Account name", value: "Kibera Girls Soccer Academy", key: "name" },
                          { label: "Bank", value: "Absa Bank Kenya PLC", key: "bank" },
                          { label: "Account number", value: bankAccountNumber, key: "account" },
                          { label: "SWIFT / BIC", value: "BARCKENX", key: "swift" },
                          { label: "Currency", value: currency, key: "currency" },
                        ].map((row) => (
                          <div
                            key={row.key}
                            className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background border"
                          >
                            <div>
                              <div className="text-xs text-muted-foreground">{row.label}</div>
                              <div className="font-semibold text-foreground">{row.value}</div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(row.value, row.key)}
                              className="shrink-0"
                            >
                              {copiedField === row.key ? (
                                <Check className="h-4 w-4 text-green-600" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>

                      {amount > 0 && (
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
                          <div className="text-sm text-muted-foreground">Please transfer</div>
                          <div className="text-2xl font-bold text-primary mt-1">
                            {formatMoney(amount, currency)}
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground">
                        International transfers may take 3–5 business days. Email us at{" "}
                        <a
                          href="mailto:info@kiberagirlssocceracademy.co.ke"
                          className="text-primary underline"
                        >
                          info@kiberagirlssocceracademy.co.ke
                        </a>{" "}
                        once sent so we can confirm receipt.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-[var(--card-shadow)] border-0">
              <CardHeader>
                <CardTitle className="text-lg">Why donate?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Direct impact on student education and welfare",
                  "Transparent use of funds with regular updates",
                  "Building a brighter future for girls in Kibera",
                  "Supporting scholarships, meals, and sports programs",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm leading-relaxed">{point}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-[var(--card-shadow)] border-0">
              <CardHeader>
                <CardTitle className="text-lg">Where your gift goes</CardTitle>
                <CardDescription>Fundraising progress ({currency})</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {IMPACT_BASE_KES.map((area, i) => {
                  const Icon = area.icon;
                  const raised = convertFromKes(area.raised, currency);
                  const target = convertFromKes(area.target, currency);
                  const pct = Math.round((area.raised / area.target) * 100);
                  return (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold">{area.title}</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatMoney(raised, currency)} raised</span>
                        <span>{formatMoney(target, currency)} goal</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <div className="rounded-xl p-5 text-white text-center" style={{ background: "var(--section-gradient)" }}>
              <Heart className="h-8 w-8 mx-auto mb-3 opacity-90" />
              <p className="font-semibold text-lg">Thank you for believing in our girls</p>
              <p className="text-sm text-white/80 mt-2">
                100% of donations go directly to programs that support our students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
