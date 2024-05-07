import { cn } from "@/lib/utils";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"], weight: ["400"] });

type SectionProps = {
  title: string;
  subtitle?: string;
  className?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export default function Section({
  title,
  action,
  className,
  subtitle,
  children,
}: SectionProps) {
  return (
    <section className={cn("container flex flex-col gap-10", className)}>
      <div className="flex flex-col gap-2 justify-between sm:flex-row">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-semibold">{title}</h2>

          <p className={cn(jost.className, "text-lg")}>{subtitle}</p>
        </div>

        {action}
      </div>

      {children}
    </section>
  );
}
