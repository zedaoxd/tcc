import { cn } from "@/lib/utils";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"], weight: ["400"] });

export default function ContactUs() {
  return (
    <div className="flex flex-col gap-8">
      <h4 className="text-xl font-semibold text-black capitalize">
        Contact Us
      </h4>

      <p className={cn(jost.className, "text-lg leading-7 text-gray-500")}>
        Address: 2321 New Web Str, Lorem Ipsum10 Hudson Yards, USA
      </p>

      <div className={cn(jost.className, "text-lg leading-7 text-gray-500")}>
        <p>Tel: + (123) 2500-567-8988</p>
        <p>Mail: supportlms@gmail.com</p>
      </div>

      <div className="flex gap-3">
        <Facebook className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" />

        <Twitter className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" />

        <Instagram className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" />

        <Youtube className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" />
      </div>
    </div>
  );
}
