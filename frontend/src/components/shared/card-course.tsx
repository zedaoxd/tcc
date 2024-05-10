import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Clock, GraduationCap } from "lucide-react";
import { Jost } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import priceToTsx from "@/components/shared/priceToTsx";

const jost = Jost({ subsets: ["latin"], weight: ["400"] });

type CardCourseProps = Course.SimpleModel & {
  className?: string;
};

export default function CardCourse({
  id,
  thumbnail,
  title,
  author,
  duration,
  numberOfStudents,
  price,
  category,
  discountPercentage,
  className,
}: CardCourseProps) {
  return (
    <div
      className={cn(
        "w-full h-full rounded-2xl border overflow-hidden lg:rounded-3xl",
        className
      )}
    >
      <div className="min-w-[410px] h-60 relative">
        <Image src={thumbnail} alt={title} fill sizes="100%" />

        <Badge
          className="absolute top-2 left-2 lg:top-3 lg:left-3"
          variant="gray"
        >
          {category}
        </Badge>
      </div>

      <div className="w-full p-5 flex flex-col gap-4">
        <p className={cn(jost.className, "text-sm text-gray-500")}>
          by: <span className="font-semibold text-black">{author}</span>
        </p>

        <h3 className="text-lg font-semibold text-black">{title}</h3>

        <div className="flex gap-6">
          <div className={cn(jost.className, "flex gap-2 items-baseline")}>
            <Clock size={16} className="text-primary" />
            <span>{duration} minutes</span>
          </div>

          <div className={cn(jost.className, "flex gap-2 items-baseline")}>
            <GraduationCap size={16} className="text-primary" />

            <span>{numberOfStudents} students</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <p className={cn(jost.className, "text-sm text-gray-500")}>
            {priceToTsx(price, discountPercentage)}
          </p>

          <Link
            href={`/courses/${id}`}
            className={cn(
              jost.className,
              "font-bold text-lg text-black hover:underline"
            )}
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
}
