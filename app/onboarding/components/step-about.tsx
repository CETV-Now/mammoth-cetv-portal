"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const INDUSTRIES = [
  "Automotive - Car Wash / Detailing",
  "Automotive - Dealerships",
  "Automotive - Service / Repair",
  "Bar & Lounge",
  "Bowling Alley / Arcade",
  "Brewery",
  "Cannabis Dispensary",
  "Car Wash",
  "Casino / Gaming",
  "Church / Religious Organization",
  "Coffee Shop",
  "Convenience Store",
  "Coworking Space",
  "Financial Services / Banking",
  "Food Truck",
  "Grocery",
  "Health & Fitness - Barber Shops",
  "Health & Fitness - Gym",
  "Health & Fitness - Hair Salons",
  "Health & Fitness - Health Club",
  "Health & Fitness - Nail Salons",
  "Health & Fitness - Recreational",
  "Health & Fitness - Spa / Massage",
  "Health & Fitness - Tattoo & Piercing Studio",
  "Health & Fitness - Yoga / Pilates Studio",
  "Hotel / Lodging Lobby",
  "Insurance Office",
  "Laundromat",
  "Medical - Behavioral Health",
  "Medical - Chiropractors",
  "Medical - Dermatology",
  "Medical - Dentistry/Orthodontics",
  "Medical - Facilities / Clinics",
  "Medical - Ophthalmology / Optometry",
  "Medical - Physical Therapy",
  "Medical - Urgent Cares",
  "Movie Theater / Entertainment Venue",
  "Pharmacy / Drug Store",
  "Real Estate Office",
  "Restaurant",
  "Restaurant & Bar",
  "Restaurant Fast Food",
  "Retail Clothing & Shoes",
  "Retail Jewelry & Watches",
  "School / University",
  "Smoke Shops",
  "Veterinary / Pet Care",
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
  const [industryInput, setIndustryInput] = useState("");
  const [industryOpen, setIndustryOpen] = useState(false);

  const filteredIndustries = industryInput.trim()
    ? INDUSTRIES.filter((i) => i.toLowerCase().includes(industryInput.toLowerCase()))
    : INDUSTRIES;

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

      <div className="space-y-2 relative">
        <Label htmlFor="industry">Industry</Label>
        <Input
          id="industry"
          autoComplete="off"
          placeholder="Search industries..."
          value={form.industry || industryInput}
          onFocus={() => {
            if (form.industry) {
              setIndustryInput(form.industry);
              updateField("industry", "");
            }
            setIndustryOpen(true);
          }}
          onChange={(e) => {
            setIndustryInput(e.target.value);
            updateField("industry", "");
            setIndustryOpen(true);
          }}
          onBlur={() => setTimeout(() => setIndustryOpen(false), 150)}
        />
        {industryOpen && filteredIndustries.length > 0 && (
          <ul className="absolute z-50 w-full bg-popover border border-border rounded-md shadow-md mt-1 max-h-60 overflow-auto">
            {filteredIndustries.map((industry) => (
              <li
                key={industry}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                onMouseDown={() => {
                  updateField("industry", industry);
                  setIndustryInput("");
                  setIndustryOpen(false);
                }}
              >
                {industry}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Continue"}
      </Button>
    </form>
  );
}
