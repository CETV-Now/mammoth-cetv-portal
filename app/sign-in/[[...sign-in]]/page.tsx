import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-black text-white hover:bg-neutral-800 shadow-none",
          },
        }}
      />
    </div>
  );
}
