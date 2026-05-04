"use client";

import { useState } from "react";
import { StepLocation } from "./step-location";
import { StepAdMode } from "./step-ad-mode";
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
}

const STEP_LABELS = [
  "Add Location",
  "Ad Serving Mode",
  "Order Device",
];

export function OnboardingWizard({ step: initialStep, account }: OnboardingWizardProps) {
  const [step, setStep] = useState(initialStep);
  const [screenId, setScreenId] = useState<string | null>(null);

  function advance() {
    setStep((s) => s + 1);
  }

  function completeLocation(newScreenId: string) {
    setScreenId(newScreenId);
    advance();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to CETV Portal</h1>
          <p className="text-muted-foreground mt-1">Let's get your location set up.</p>
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
          {step === 1 && <StepLocation onComplete={completeLocation} />}
          {step === 2 && <StepAdMode onComplete={advance} />}
          {step === 3 && <StepDeviceOrder />}
        </div>
      </div>
    </div>
  );
}
