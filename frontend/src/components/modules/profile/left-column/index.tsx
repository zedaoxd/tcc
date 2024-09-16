"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Plus, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const LeftColumn = () => {
  const { data: session } = useSession();
  return (
    <>
      <Avatar className="w-32 h-32">
        <AvatarImage src={session?.user.imageUrl || undefined} />

        <AvatarFallback className="text-4xl uppercase">
          {session?.user.firstName[0]} {session?.user.lastName[0]}
        </AvatarFallback>
      </Avatar>

      <div className="text-center">
        <h1 className="font-bold text-2xl capitalize">
          {session?.user?.firstName}
        </h1>

        <p className="text-gray-500 text-sm">{session?.user?.email}</p>
      </div>

      <nav className="w-full">
        <ul>
          <li className="border-zinc-300 px-2 py-6 border border-r-0 border-l-0 text-2xl text-primary hover:text-foreground">
            <Link
              href="/profile/create-course"
              className="flex flex-row items-center gap-2"
            >
              <Plus /> Create course
            </Link>
          </li>

          <li className="border-zinc-300 px-2 py-6 border border-r-0 border-l-0 text-2xl text-primary hover:text-foreground">
            <Link href="#" className="flex flex-row items-center gap-2">
              <LogOut /> Log out
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
