import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Jost } from "next/font/google";
import Link from "next/link";
import useBenefits from "./useBenefits";
import Benefit from "./components/benefit";

const jost = Jost({ subsets: ["latin"], weight: ["400"] });

export default function Benefits() {
  const { benefits } = useBenefits();

  return (
    <section className="container h-[469px] flex items-center gap-2">
      <div className="h-full flex-1 bg-benefits bg-no-repeat bg-center bg-contain hidden md:block"></div>

      <div className="flex-1 max-w-lg flex flex-col align-top gap-6">
        <h2 className="text-3xl font-semibold leading-9 text-black">
          Improve your skills with our courses
        </h2>

        <p className={cn(jost.className, "text-lg leading-7")}>
          Our courses are carefully designed to be efficient and effective,
          ensuring meaningful learning in a shorter period. We are committed to
          providing a comprehensive educational experience that prepares our
          students to tackle challenges and acquire valuable skills on their
          learning journey.
        </p>

        <div className="flex flex-col gap-3">
          {benefits.map((benefit) => (
            <Benefit key={benefit.title} title={benefit.title} />
          ))}
        </div>

        <Button asChild className="rounded-3xl" size="min">
          <Link href="/courses">Explorer courses</Link>
        </Button>
      </div>
    </section>
  );
}
