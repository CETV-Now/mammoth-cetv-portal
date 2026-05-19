"use client";

import { useState, useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import { StepAbout } from "./step-about";
import { StepLocation } from "./step-location";
import { StepDeviceOrder } from "./step-device-order";

interface Account {
  _id: string;
  name: string;
  onboardingStep: number;
  onboardingComplete: boolean;
}

interface OnboardingWizardProps {
  step: number;
  account: Account;
  firstName: string;
  lastName: string;
  alwaysCharge: boolean;
}

const STEP_LABELS = [
  "About You",
  "Add Location",
  "Order Device",
];

const STEP_VIEWED_EVENTS = [
  "onboarding_about_you_viewed",
  "onboarding_location_viewed",
  "onboarding_device_order_viewed",
] as const;

const STEP_COMPLETED_EVENTS = [
  "onboarding_about_you_completed",
  "onboarding_location_completed",
] as const;

export function OnboardingWizard({ step: initialStep, account, firstName, lastName, alwaysCharge }: OnboardingWizardProps) {
  const [step, setStep] = useState(initialStep);
  const [screenId, setScreenId] = useState<string | null>(null);
  const ph = usePostHog();

  useEffect(() => {
    const event = STEP_VIEWED_EVENTS[step - 1];
    if (event) ph?.capture(event);
  }, [step, ph]);

  function advance() {
    const event = STEP_COMPLETED_EVENTS[step - 1];
    if (event) ph?.capture(event);
    setStep((s) => s + 1);
  }

  function completeLocation(newScreenId: string) {
    setScreenId(newScreenId);
    advance();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8 text-center flex flex-col items-center gap-3">
          <img src="/cetv_logo.png" alt="CETV Now" className="h-16 w-auto" />
          <p className="text-muted-foreground">Welcome to CETV Now! Let's get your account set up.</p>
        </div>

        <div className="flex items-center justify-center mb-10 gap-2">
          {STEP_LABELS.map((label, index) => {
            const stepNum = index + 1;
            const isComplete = stepNum < step;
            const isCurrent = stepNum === step;
            return (
              <div key={stepNum} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`size-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isComplete
                        ? "bg-primary text-primary-foreground"
                        : isCurrent
                        ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isComplete ? "✓" : stepNum}
                  </div>
                  <span className={`text-xs whitespace-nowrap ${isCurrent ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                </div>
                {index < STEP_LABELS.length - 1 && (
                  <div className={`h-px w-12 mx-2 mb-5 ${isComplete ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-card rounded-xl border shadow p-6">
          {step === 1 && <StepAbout onComplete={advance} firstName={firstName} lastName={lastName} />}
          {step === 2 && <StepLocation onComplete={completeLocation} />}
          {step === 3 && <StepDeviceOrder alwaysCharge={alwaysCharge} />}
        </div>
      </div>
    </div>
  );
}
