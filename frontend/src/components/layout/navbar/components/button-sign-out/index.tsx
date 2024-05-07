"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useAuth from "@/zustand/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const ButtonSignOut = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  const logout = () => signOut().then(() => router.push("/"));

  return (
    <DropdownMenuItem onClick={logout}>
      <LogOut className="mr-2 h-4 w-4" />

      <span>Log out</span>
    </DropdownMenuItem>
  );
};
