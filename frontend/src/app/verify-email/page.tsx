"use client";

import { verifyEmail } from "@/components/modules/auth/register/service";
import { Button } from "@/components/ui/button";
import Show from "@/lib/show";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type Props = {
  searchParams: {
    token: string;
  };
};

export default function VerifyEmailPage({ searchParams: { token } }: Props) {
  const { isLoading } = useQuery({
    queryKey: ["verify-email", { token }],
    queryFn: () => verifyEmail(token),
  });

  return (
    <div className="w-full">
      <div className="flex justify-center items-center h-[600px]">
        <div className="w-full max-w-md p-4 bg-white rounded shadow">
          <h1 className="text-2xl font-bold text-center">Verify Email</h1>
          <p className="text-center">
            {isLoading ? "Verifying email..." : "Email verified successfully!"}
          </p>

          <Show when={!isLoading}>
            <Button className="w-full mt-4" asChild>
              <Link href="/auth">Login</Link>
            </Button>
          </Show>
        </div>
      </div>
    </div>
  );
}
