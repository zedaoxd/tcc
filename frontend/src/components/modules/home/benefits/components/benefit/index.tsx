import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"], weight: ["400"] });

type BenefitProps = {
  title: string;
};

export default function Benefit({ title }: BenefitProps) {
  return (
    <div className={cn(jost.className, "flex gap-2")}>
      <Check className="text-green-400" size={24} />
      {title}
    </div>
  );
}
