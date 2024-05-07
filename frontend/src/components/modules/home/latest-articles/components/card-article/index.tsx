import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Jost } from "next/font/google";
import { cn } from "@/lib/utils";

const jost = Jost({ subsets: ["latin"], weight: ["400"] });

type CardArticleProps = {
  id: string;
  thumbnail: string;
  title: string;
  date: string;
  description: string;
};

export default function CardArticle({
  id,
  thumbnail,
  title,
  date,
  description,
}: CardArticleProps) {
  const shortDescription = description.slice(0, 70) + "...";

  return (
    <Link href={`/article/${id}`}>
      <Card className="transition-transform transform-gpu hover:-translate-y-3 hover:shadow-lg overflow-hidden">
        <CardHeader className="p-0">
          <CardDescription className="relative h-64">
            <Image src={thumbnail} alt={title} fill sizes="100%" />
          </CardDescription>

          <CardTitle className="px-6 text-xl font-semibold leading-6">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex items-center py-3">
          <Calendar className="w-4 h-4 mr-2 text-primary" />{" "}
          <span className={cn(jost.className, "text-base")}>{date}</span>
        </CardContent>

        <CardFooter className={cn(jost.className, "text-lg")}>
          {shortDescription}
        </CardFooter>
      </Card>
    </Link>
  );
}
