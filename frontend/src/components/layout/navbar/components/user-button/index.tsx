"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DropdownMenu } from "../drop-down-menu";
import { useSession } from "next-auth/react";

export default function UserButton() {
  const { data: session } = useSession();

  const firstName = session?.user?.firstName;

  return (
    <Button
      variant="ghost"
      className="font-bold text-black h-full rounded-none hover:bg-transparent hover:text-primary"
      asChild
    >
      {session ? (
        <DropdownMenu firstName={firstName} />
      ) : (
        <Link href="/auth">Login/Register</Link>
      )}
    </Button>
  );
}
