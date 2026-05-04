"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
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

function OrderForm({ locationData }: { locationData: LocationData }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    line1: locationData.address ?? "",
    city: locationData.city ?? "",
    state: locationData.state ?? "",
    zip: locationData.zip ?? "",
  });

  function updateField(field: keyof ShippingAddress, value: string) {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
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

      if (error) {
        throw new Error(error.message);
      }

      const res = await fetch("/api/onboarding/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingAddress,
          paymentMethodId: paymentMethod?.id,
          screenId: locationData.screenId,
          locationId: locationData.locationId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to place order");
      }

      toast.success("Order placed! Your device is on the way.");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Order Your Device</h2>
        <p className="text-sm text-muted-foreground mt-1">Enter your shipping address and payment details to complete your order.</p>
      </div>

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

      <Button type="submit" className="w-full" disabled={isSubmitting || !stripe}>
        {isSubmitting ? "Placing Order..." : "Place Order"}
      </Button>
    </form>
  );
}

export function StepDeviceOrder() {
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
      <OrderForm locationData={locationData} />
    </Elements>
  );
}
