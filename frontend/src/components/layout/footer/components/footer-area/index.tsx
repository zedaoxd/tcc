import Link from "next/link";
import { Jost } from "next/font/google";
import { cn } from "@/lib/utils";

const jost = Jost({ subsets: ["latin"], weight: ["400"] });

export type Links = Array<{ href: string; label: string }>;

type FooterAreaProps = {
  title: string;
  links: Links;
};

export default function FooterArea({ title, links }: FooterAreaProps) {
  return (
    <div className="flex flex-col gap-8">
      <h4 className="text-xl font-semibold text-black capitalize">{title}</h4>

      <ul className="flex flex-col gap-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className={cn(
                jost.className,
                "text-gray-500 hover:text-primary text-lg font-medium leading-10"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
