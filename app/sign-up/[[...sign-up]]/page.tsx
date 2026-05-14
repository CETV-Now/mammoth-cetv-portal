import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <Image src="/cetv_logo.png" alt="CETV Now" width={160} height={60} priority />
        <SignUp
          appearance={{
            variables: { colorPrimary: "#000000" },
          }}
        />
      </div>
    </div>
  );
}
