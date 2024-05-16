import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Jost } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import priceToTsx from "@/components/shared/priceToTsx";
import CourseStatus from "../../../course-status";
import { SkeletonSchacnUI } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const jost = Jost({ subsets: ["latin"], weight: ["400"] });

type CardCourseHorizontalProps = {
  id: string;
  author: string;
  title: string;
  thumbnail: string;
  duration: number;
  numberOfStudents: number;
  lessons: number;
  price: number;
  level: string;
  discountPercentage?: number;
};

export default function CardCourseHorizontal({
  id,
  author,
  title,
  thumbnail,
  duration,
  numberOfStudents,
  lessons,
  price,
  level,
  discountPercentage,
}: CardCourseHorizontalProps) {
  return (
    <Card className="w-full grid grid-cols-3 h-64 overflow-hidden">
      <CardContent className="relative">
        <Image src={thumbnail} alt={title} fill sizes="100%" />
      </CardContent>

      <div className="col-span-2 flex flex-col justify-between">
        <CardHeader className="flex flex-col gap-3">
          <p className={cn(jost.className, "text-base leading-6")}>
            by: <span className="font-bold">{author}</span>
          </p>

          <CardTitle className="text-xl font-semibold leading-6 capitalize">
            {title}
          </CardTitle>

          <CardDescription className="flex gap-6">
            <CourseStatus
              duration={duration}
              lessons={lessons}
              level={level}
              numberOfStudents={numberOfStudents}
            />
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-col">
          <Separator />

          <div className="w-full flex justify-between">
            <p>{priceToTsx(price, discountPercentage)}</p>

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
        </CardFooter>
      </div>
    </Card>
  );
}

CardCourseHorizontal.Skeleton = function Skeleton() {
  return <SkeletonSchacnUI className="w-full h-64" />;
};
