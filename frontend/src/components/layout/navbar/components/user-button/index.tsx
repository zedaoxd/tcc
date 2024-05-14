"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DropdownMenu } from "../drop-down-menu";

export default function UserButton() {
  return (
    <Button
      variant="ghost"
      className="font-bold text-black h-full rounded-none hover:bg-transparent hover:text-primary"
      asChild
    >
      {/* {user ? (
        // <Link href="/profile">{user.user_metadata.username || user.email}</Link>
        <DropdownMenu />
      ) : (
        <Link href="/auth">Login/Register</Link>
      )} */}

      <Link href="/auth">Login/Register</Link>
    </Button>
  );
}
