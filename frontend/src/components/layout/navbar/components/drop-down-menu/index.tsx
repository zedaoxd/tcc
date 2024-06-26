import { Book, BookMarked, Cloud, Github, LifeBuoy, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu as Root,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ButtonSignOut } from "../button-sign-out";

type Props = {
  firstName: string | undefined;
};

export function DropdownMenu({ firstName }: Props) {
  return (
    <Root>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="font-bold text-black h-full rounded-none hover:bg-transparent hover:text-primary"
        >
          {firstName}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BookMarked className="mr-2 h-4 w-4" />

            <Link href="/profile/my-courses">My courses</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Book className="mr-2 h-4 w-4" />

            <Link href="/profile/create-courses">Create course</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />

            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Github className="mr-2 h-4 w-4" />

          <Link href="https://github.com/zedaoxd/blf-learn" target="_blank">
            GitHub
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />

          <span>Support</span>
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />

          <span>API</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <ButtonSignOut />
      </DropdownMenuContent>
    </Root>
  );
}
