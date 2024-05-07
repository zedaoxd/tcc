import { cn } from "@/lib/utils";
import Image from "next/image";
import Link, { LinkProps } from "next/link";

type Props = {
  className?: string;
  href?: LinkProps["href"];
};

export default function Logo({ className, href = "/" }: Props) {
  return (
    <Link
      href={href}
      className={cn("flex items-center justify-center gap-1", className)}
    >
      <Image src="/images/logo.svg" alt="logo" width={39.3} height={30} />

      <span className="text-black font-bold hidden md:block">BLFLearn</span>
    </Link>
  );
}
