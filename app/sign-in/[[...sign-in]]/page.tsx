import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <Image src="/cetv_logo.png" alt="CETV Now" width={160} height={60} priority />
        <SignIn
          appearance={{
            variables: { colorPrimary: "#000000" },
            elements: { logoBox: "hidden" },
          }}
        />
      </div>
    </div>
  );
}
