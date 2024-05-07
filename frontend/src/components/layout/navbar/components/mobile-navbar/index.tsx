"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useMobileNavbar from "./use-mobile-navbar";
import { Menu } from "lucide-react";
import { OptionMenu } from "../../types";
import Link from "next/link";

type MobileNavbarProps = {
  className?: string;
};

export default function MobileNavbar({ className }: MobileNavbarProps) {
  const { isOpen, onToggle, optionsMenu } = useMobileNavbar();

  return (
    <div className={className}>
      <DropdownMenu open={isOpen} onOpenChange={onToggle}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={onToggle}
            className="block md:hidden mr-2"
            variant="ghost"
            size="sm"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel className="font-bold text-black">
            Menu
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {optionsMenu.map(({ name, href }) => (
            <MobileNavbar.Option key={name} href={href} name={name} />
          ))}

          <DropdownMenuSeparator />

          <MobileNavbar.Option
            href="/login"
            name="Login/Register"
            className="font-bold text-black"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

type MobileNavbarOptionProps = {
  className?: string;
} & OptionMenu;

MobileNavbar.Option = function MobileNavbarOption({
  className,
  href,
  name,
}: MobileNavbarOptionProps) {
  return (
    <DropdownMenuItem asChild className={className}>
      <Link href={href}>{name}</Link>
    </DropdownMenuItem>
  );
};
