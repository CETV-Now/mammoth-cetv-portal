import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-black text-white hover:bg-neutral-800 shadow-none",
          },
        }}
      />
    </div>
  );
}
