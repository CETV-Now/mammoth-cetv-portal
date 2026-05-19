"use client";

import { useState, useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CheckCircle2, Loader2, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface ShippingAddress {
  line1: string;
  city: string;
  state: string;
  zip: string;
}

interface LocationData {
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  screenId?: string;
  locationId?: string;
}

type PromoStatus = "idle" | "checking" | "valid" | "invalid";

function OrderForm({ locationData, alwaysCharge }: { locationData: LocationData; alwaysCharge: boolean }) {
  const stripe = useStripe();
  const elements = useElements();
  const ph = usePostHog();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    line1: locationData.address ?? "",
    city: locationData.city ?? "",
    state: locationData.state ?? "",
    zip: locationData.zip ?? "",
  });

  const [promoInput, setPromoInput] = useState("");
  const [promoStatus, setPromoStatus] = useState<PromoStatus>("idle");
  const [promoCodeId, setPromoCodeId] = useState<string | null>(null);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);

  const hasPromo = promoStatus === "valid" && promoCodeId !== null;

  function updateField(field: keyof ShippingAddress, value: string) {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  }

  async function handleApplyPromo() {
    const code = promoInput.trim();
    if (!code) return;
    setPromoStatus("checking");
    try {
      const res = await fetch("/api/onboarding/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.valid) {
        setPromoStatus("valid");
        setPromoCodeId(data.promoCodeId);
        setAppliedCode(code.toUpperCase());
      } else {
        setPromoStatus("invalid");
        setPromoCodeId(null);
      }
    } catch {
      setPromoStatus("invalid");
      setPromoCodeId(null);
    }
  }

  function handleRemovePromo() {
    setPromoInput("");
    setPromoStatus("idle");
    setPromoCodeId(null);
    setAppliedCode(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!hasPromo && (!stripe || !elements)) return;

    setIsSubmitting(true);

    try {
      let paymentMethodId: string | undefined;

      if (!hasPromo) {
        const cardElement = elements!.getElement(CardElement);
        if (!cardElement) return;

        const { paymentMethod, error } = await stripe!.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            address: {
              line1: shippingAddress.line1,
              city: shippingAddress.city,
              state: shippingAddress.state,
              postal_code: shippingAddress.zip,
            },
          },
        });

        if (error) throw new Error(error.message);
        paymentMethodId = paymentMethod?.id;
      }

      const res = await fetch("/api/onboarding/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingAddress,
          paymentMethodId,
          promoCodeId: promoCodeId ?? undefined,
          screenId: locationData.screenId,
          locationId: locationData.locationId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to place order");
      }

      ph?.capture("onboarding_completed", { used_promo: hasPromo });
      toast.success("Order placed! Your device is on the way.");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  const devicePriceCents = parseInt(process.env.NEXT_PUBLIC_DEVICE_PRICE ?? "0", 10);
  const devicePriceDisplay = `$${(devicePriceCents / 100).toFixed(2)}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Order Your Device</h2>
        <p className="text-sm text-muted-foreground mt-1">Enter your shipping address and payment details to complete your order.</p>
      </div>

      <div className="rounded-md border bg-muted/50 px-4 py-3 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">CETV Device (1×)</span>
        <span className="font-semibold">{devicePriceDisplay}</span>
      </div>

      {!alwaysCharge && (
        <p className="text-sm text-muted-foreground">
          We will not charge you for the device if you activate within 15 days of receiving it and keep it online for 30 days.
        </p>
      )}

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Shipping Address</h3>
        <div className="space-y-2">
          <Label htmlFor="line1">Street Address</Label>
          <Input
            id="line1"
            value={shippingAddress.line1}
            onChange={(e) => updateField("line1", e.target.value)}
            placeholder="123 Main St"
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1 space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={shippingAddress.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="Phoenix"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={shippingAddress.state}
              onChange={(e) => updateField("state", e.target.value)}
              placeholder="AZ"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP</Label>
            <Input
              id="zip"
              value={shippingAddress.zip}
              onChange={(e) => updateField("zip", e.target.value)}
              placeholder="85001"
              required
            />
          </div>
        </div>
      </div>

      {/* Promo code */}
      <div className="space-y-2">
        <Label htmlFor="promo-code">Promo Code</Label>
        {hasPromo ? (
          <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            <CheckCircle2 className="size-4 shrink-0" />
            <span className="flex-1 font-mono font-medium">{appliedCode}</span>
            <button
              type="button"
              onClick={handleRemovePromo}
              className="text-green-600 hover:text-green-800"
              aria-label="Remove promo code"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="promo-code"
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value);
                  if (promoStatus === "invalid") setPromoStatus("idle");
                }}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleApplyPromo(); } }}
                placeholder="Enter code"
                className="pl-8 uppercase"
                disabled={promoStatus === "checking"}
                autoCapitalize="characters"
                autoComplete="off"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleApplyPromo}
              disabled={!promoInput.trim() || promoStatus === "checking"}
            >
              {promoStatus === "checking" ? <Loader2 className="size-4 animate-spin" /> : "Apply"}
            </Button>
          </div>
        )}
        {promoStatus === "invalid" && (
          <p className="text-xs text-destructive">Invalid or unavailable promo code.</p>
        )}
      </div>

      {!hasPromo && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Payment Information</h3>
          <p className="text-xs text-muted-foreground">Your card will be saved for future billing when the device is installed.</p>
          <div className="border border-input rounded-md px-3 py-2.5 bg-transparent">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "14px",
                    color: "#000",
                    "::placeholder": { color: "#a1a1aa" },
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting || (!hasPromo && !stripe)}>
        {isSubmitting ? "Placing Order..." : "Place Order"}
      </Button>
    </form>
  );
}

export function StepDeviceOrder({ alwaysCharge }: { alwaysCharge: boolean }) {
  const [locationData, setLocationData] = useState<LocationData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/onboarding/location-data")
      .then((r) => r.json())
      .then((data) => {
        setLocationData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-8 text-center text-muted-foreground text-sm">Loading...</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <OrderForm locationData={locationData} alwaysCharge={alwaysCharge} />
    </Elements>
  );
}
