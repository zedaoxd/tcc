"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import useMenu from "./useMenu";
import Link from "next/link";
import { OptionMenu } from "../../types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type MenuProps = {
  className?: string;
};

export default function Menu({ className }: MenuProps) {
  const { optionsMenu } = useMenu();

  return (
    <NavigationMenu className={cn("h-full", className)}>
      <NavigationMenuList className="h-full">
        {optionsMenu.map(({ name, href }) => (
          <Menu.Option key={name} href={href} name={name} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

type MenuOptionProps = {} & OptionMenu;

Menu.Option = function MenuItem({ href, name }: MenuOptionProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <NavigationMenuItem className="h-20 flex items-center">
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={`h-full flex items-center font-bold rounded-none px-5 ${
            active ? "text-primary bg-primary-foreground" : "hover:text-primary"
          }`}
        >
          {name}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};
