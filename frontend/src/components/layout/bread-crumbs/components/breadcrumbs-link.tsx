import Link from "next/link";
import { cn } from "@/lib/utils";
import { Jost } from "next/font/google";
import { ChevronRight } from "lucide-react";
import Show from "@/lib/show";

const jost = Jost({ subsets: ["latin"], weight: ["400"] });

type Props = {
  showArrow: boolean;
} & Breadcrumbs;

export default function BreadcrumbsLink({ name, path, showArrow }: Props) {
  return (
    <li>
      <Link
        href={path}
        className={cn(
          jost.className,
          "text-base font-normal leading-6 hover:text-gray-700 hover:underline",
          showArrow ? "text-gray-700" : "text-gray-500  pointer-events-none"
        )}
      >
        {name}
      </Link>

      <Show when={showArrow}>
        <ChevronRight className="inline-block w-4 h-4 ml-2" />
      </Show>
    </li>
  );
}
