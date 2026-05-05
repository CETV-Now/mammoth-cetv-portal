"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ProfileFormProps {
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
  website: string;
  industry: string;
}

export function ProfileForm({
  firstName: initialFirstName,
  lastName: initialLastName,
  companyName: initialCompanyName,
  phone: initialPhone,
  website: initialWebsite,
  industry: initialIndustry,
}: ProfileFormProps) {
  const [form, setForm] = useState({
    firstName: initialFirstName,
    lastName: initialLastName,
    companyName: initialCompanyName,
    phone: initialPhone,
    website: initialWebsite,
    industry: initialIndustry,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to update profile");
      }
      toast.success("Profile updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-card rounded-xl border shadow-sm p-6">
      <h2 className="text-base font-semibold mb-5">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Company Website</Label>
          <Input
            id="website"
            value={form.website}
            onChange={(e) => updateField("website", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">
            Industry{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Input
            id="industry"
            value={form.industry}
            onChange={(e) => updateField("industry", e.target.value)}
            placeholder="e.g. Restaurant, Retail, Healthcare"
          />
        </div>

        <div className="pt-1">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
