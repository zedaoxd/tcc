import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"], weight: ["400"] });

export default function Intro() {
  return (
    <section className="w-full h-[700px] bg-home bg-no-repeat bg-center bg-cover">
      <div className="container h-full flex flex-col justify-center gap-5">
        <h1 className="text-5xl font-semibold">
          Build Skills with Online Course
        </h1>

        <p className={cn(jost.className, "max-w-[520px] text-lg")}>
          Welcome to our online learning platform, where you can embark on a
          transformative journey to &apos;Build Skills with Online
          Courses.&apos; Unleash your potential.
        </p>

        <Button className="w-fit rounded-3xl text-white">Get Started</Button>
      </div>
    </section>
  );
}
