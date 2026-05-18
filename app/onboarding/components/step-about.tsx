"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const INDUSTRIES = [
  "Automotive - Dealerships",
  "Automotive - Service / Repair",
  "Bar & Lounge",
  "Brewery",
  "Cannabis Dispensary",
  "Casino / Gaming",
  "Convenience Store",
  "Grocery",
  "Hotel / Lodging Lobby",
  "Health & Fitness – Barber Shops",
  "Health & Fitness - Gym",
  "Health & Fitness - Hair Salons",
  "Health & Fitness - Health Club",
  "Health & Fitness – Nail Salons",
  "Health & Fitness - Recreational",
  "Insurance Office",
  "Medical - Behavioral Health",
  "Medical – Chiropractors",
  "Medical - Dermatology",
  "Medical - Dentistry/Orthodontics",
  "Medical - Facilities / Clinics",
  "Medical - Urgent Cares",
  "Restaurant & Bar",
  "Restaurant Fast Food",
  "Retail Clothing & Shoes",
  "Retail Jewelry & Watches",
  "School / University",
  "Smoke Shops",
  "Winery",
];

interface StepAboutProps {
  onComplete: () => void;
  firstName: string;
  lastName: string;
}

export function StepAbout({ onComplete, firstName, lastName }: StepAboutProps) {
  const [form, setForm] = useState({
    firstName,
    lastName,
    companyName: "",
    phone: "",
    website: "",
    industry: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.industry) {
      toast.error("Please select an industry");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/onboarding/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          companyName: form.companyName.trim(),
          phone: form.phone.trim(),
          website: form.website.trim(),
          industry: form.industry.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save profile");
      }

      onComplete();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">About You</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us a bit about yourself and your business.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={form.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={form.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={form.companyName}
          onChange={(e) => updateField("companyName", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Contact Number</Label>
        <Input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          placeholder="(555) 000-0000"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Company Website</Label>
        <Input
          id="website"
          value={form.website}
          onChange={(e) => updateField("website", e.target.value)}
          placeholder="https://example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select
          value={form.industry}
          onValueChange={(v) => updateField("industry", v)}
          required
        >
          <SelectTrigger id="industry">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRIES.map((industry) => (
              <SelectItem key={industry} value={industry}>{industry}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Continue"}
      </Button>
    </form>
  );
}
