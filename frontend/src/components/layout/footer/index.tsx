import { cn } from "@/lib/utils";
import Logo from "../logo";
import { Jost } from "next/font/google";
import GetHelp from "./components/get-help";
import Programs from "./components/programs";
import ContactUs from "./components/contact-us";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

const jost = Jost({ subsets: ["latin"], weight: ["400"] });

export default function Footer() {
  return (
    <footer className="w-100% bg-gray-100">
      <div className="container pt-20 mt-10 relative">
        <div className="grid grid-cols-5 gap-7">
          <div className="col-span-2 flex flex-col items-start gap-8">
            <Logo />

            <p
              className={cn(jost.className, "text-lg leading-7 text-gray-500")}
            >
              BLFLearn is a platform for learning and teaching online where
              students are mastering new skills and achieving their goals by
              learning from an extensive library of courses taught by expert
              instructors.
            </p>
          </div>

          <GetHelp />

          <Programs />

          <ContactUs />
        </div>

        <Button
          variant="dark"
          className="p-0 w-10 h-10 absolute right-0"
          asChild
        >
          <Link href="#navbar">
            <ArrowUp className="h-4 w-4 text-white" />
          </Link>
        </Button>

        <Separator className="mt-20" />

        <p className={cn(jost.className, "text-lg leading-7 text-center py-8")}>
          Copyright© 2024 BLFLearn. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
