"use client";

import { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Prediction {
  place_id: string;
  description: string;
}

interface AddressData {
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  long: number;
}

export function StepLocation({ onComplete }: { onComplete: (screenId: string) => void }) {
  const [locationName, setLocationName] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mapsReady, setMapsReady] = useState(false);
  const autocompleteRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
      version: "weekly",
      libraries: ["places"],
    });
    loader.load().then(() => {
      autocompleteRef.current = new google.maps.places.AutocompleteService();
      geocoderRef.current = new google.maps.Geocoder();
      setMapsReady(true);
    });
  }, []);

  useEffect(() => {
    if (!mapsReady || !autocompleteRef.current || !addressInput || isAddressSelected) {
      if (!addressInput) setPredictions([]);
      return;
    }
    autocompleteRef.current.getPlacePredictions(
      { input: addressInput, types: ["address"] },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPredictions(results.map((r) => ({ place_id: r.place_id, description: r.description })));
        } else {
          setPredictions([]);
        }
      }
    );
  }, [addressInput, mapsReady, isAddressSelected]);

  function selectPrediction(prediction: Prediction) {
    setIsAddressSelected(true);
    setAddressInput(prediction.description);
    setPredictions([]);

    if (!geocoderRef.current) return;

    geocoderRef.current.geocode({ placeId: prediction.place_id }, (results, status) => {
      if (status !== "OK" || !results?.[0]) {
        toast.error("Could not load address details. Please try another address.");
        return;
      }

      const result = results[0];
      const get = (type: string) =>
        result.address_components.find((c) => c.types.includes(type))?.long_name ?? "";
      const getShort = (type: string) =>
        result.address_components.find((c) => c.types.includes(type))?.short_name ?? "";

      setAddressData({
        address: [get("street_number"), get("route")].filter(Boolean).join(" "),
        city: get("locality") || get("sublocality") || get("administrative_area_level_2"),
        state: getShort("administrative_area_level_1"),
        zip: get("postal_code"),
        lat: result.geometry.location.lat(),
        long: result.geometry.location.lng(),
      });
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!locationName.trim()) {
      toast.error("Please enter a location name.");
      return;
    }

    if (!addressData) {
      toast.error("Please select an address from the suggestions.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/onboarding/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: locationName.trim(),
          ...addressData,
          geo_point: { type: "Point", coordinates: [addressData.long, addressData.lat] },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save location");
      }

      const data = await res.json();
      onComplete(data.screenId);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Add Your Location</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us about the location where you'll install your CETV screen.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="locationName">Location Name</Label>
        <Input
          id="locationName"
          placeholder="e.g. Main Street Cafe"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
        />
      </div>

      <div className="space-y-2 relative">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder={mapsReady ? "Start typing your address..." : "Loading..."}
          value={addressInput}
          disabled={!mapsReady}
          autoComplete="off"
          onChange={(e) => {
            setAddressInput(e.target.value);
            setAddressData(null);
            setIsAddressSelected(false);
          }}
        />
        {addressData && (
          <p className="text-xs text-muted-foreground">
            {[addressData.address, addressData.city, addressData.state, addressData.zip].filter(Boolean).join(", ")}
          </p>
        )}
        {predictions.length > 0 && (
          <ul className="absolute z-50 w-full bg-popover border border-border rounded-md shadow-md mt-1 max-h-60 overflow-auto">
            {predictions.map((p) => (
              <li
                key={p.place_id}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                onMouseDown={() => selectPrediction(p)}
              >
                {p.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting || !mapsReady}>
        {isSubmitting ? "Saving..." : "Continue"}
      </Button>
    </form>
  );
}
