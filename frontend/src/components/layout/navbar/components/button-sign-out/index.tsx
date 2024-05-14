"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const ButtonSignOut = () => {
  const router = useRouter();

  return (
    <DropdownMenuItem onClick={() => console.log("logout")}>
      <LogOut className="mr-2 h-4 w-4" />

      <span>Log out</span>
    </DropdownMenuItem>
  );
};
