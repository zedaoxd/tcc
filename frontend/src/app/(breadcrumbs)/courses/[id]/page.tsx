import CourseStatus from "@/components/modules/courses/components/course-status";
import TabsCourse from "@/components/modules/courses/components/tabs-course";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Jost } from "next/font/google";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import priceToTsx from "@/components/shared/priceToTsx";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const jost = Jost({ subsets: ["latin"], weight: ["400", "600"] });

type CoursePageProps = {
  params: {
    id: string;
  };
  searchParams: {};
};

const mockModules: Course.Module.Model[] = [
  {
    title: "Module 1",
    duration: 352,
    id: "1",
    order: 1,
    lessons: [
      {
        id: "1",
        duration: 45,
        preview: true,
        title: "Introduction",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
      {
        id: "2",
        duration: 45,
        preview: false,
        title: "Lesson 2",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
      {
        id: "3",
        duration: 45,
        preview: false,
        title: "Lesson 3",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
      {
        id: "4",
        duration: 45,
        preview: false,
        title: "Lesson 4",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
      {
        id: "5",
        duration: 45,
        preview: false,
        title: "Lesson 5",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
    ],
  },
  {
    title: "Module 2",
    duration: 320,
    id: "2",
    order: 2,
    lessons: [
      {
        id: "1",
        duration: 50,
        preview: true,
        title: "Introduction",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
      {
        id: "2",
        duration: 40,
        preview: false,
        title: "Lesson 2",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
      {
        id: "3",
        duration: 60,
        preview: false,
        title: "Lesson 3",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
      {
        id: "4",
        duration: 30,
        preview: false,
        title: "Lesson 4",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
      {
        id: "5",
        duration: 40,
        preview: false,
        title: "Lesson 5",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
    ],
  },
  {
    title: "Module 3",
    duration: 420,
    id: "3",
    order: 3,
    lessons: [
      {
        id: "1",
        duration: 60,
        preview: true,
        title: "Introduction",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
      {
        id: "2",
        duration: 45,
        preview: false,
        title: "Lesson 2",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
      {
        id: "3",
        duration: 50,
        preview: false,
        title: "Lesson 3",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
      {
        id: "4",
        duration: 55,
        preview: false,
        title: "Lesson 4",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
      {
        id: "5",
        duration: 70,
        preview: false,
        title: "Lesson 5",
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      },
    ],
  },
];

type GetCourse = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  discount: number;
  soldCount: number;
  rating: number;
  preview: boolean;
  level: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  modules: Array<{
    id: string;
    title: string;
    duration: number;
    order: number;
    lessons: Array<{
      id: string;
      title: string;
      duration: number;
      preview: boolean;
      videoUrl: string;
    }>;
  }>;
  category: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    firstName: string;
    lastName: string | null;
    description: string | null;
    imageUrl: string | null;
    coursesCreated: {
      quantityLessons: number;
      quantityStudents: number;
    };
  };
};

export default async function Course({ params: { id } }: CoursePageProps) {
  const data: GetCourse = await fetch(`http://backend:4000/courses/${id}`, {
    next: { revalidate: 0 },
  }).then((res) => res.json());

  const { lessons, duration } = data.modules.reduce(
    (acc, module) => ({
      lessons: acc.lessons + module.lessons.length,
      duration: acc.duration + module.duration,
    }),
    { lessons: 0, duration: 0 }
  );

  const instructor: User.Instructor = {
    id: data.author.id,
    firstName: data.author.firstName,
    lastName: data.author.lastName,
    description: data.author.description,
    imageUrl: data.author.imageUrl,
    quantityLessons: data.author.coursesCreated.quantityLessons,
    quantityStudents: data.author.coursesCreated.quantityStudents,
  };

  return (
    <section className="w-full">
      <div className="bg-black">
        <div className="container text-white py-14 flex flex-col gap-5">
          <div className="flex gap-3">
            <Badge variant="gray">{data.category.name}</Badge>

            <p className={cn(jost.className, "font-normal")}>
              by{" "}
              <span className="font-semibold">
                {data.author.firstName} {data.author.lastName}
              </span>
            </p>
          </div>

          <h1 className="text-4xl font-semibold leading-10 capitalize">
            {data.title}
          </h1>

          <p className="flex gap-6">
            <CourseStatus
              duration={duration}
              lessons={lessons}
              level={data.level}
              numberOfStudents={data.soldCount}
            />
          </p>
        </div>
      </div>

      <div className="container mt-12 grid grid-cols-4 gap-5">
        <div className="col-span-3">
          <TabsCourse
            description={data.description}
            modules={mockModules}
            instructor={instructor}
          />
        </div>

        <div>
          <div className="fixed top-48">
            <Card className="overflow-hidden border-none shadow-md w-72">
              <CardContent className="p-0 relative overflow-hidden h-40">
                <Image
                  src={data.imageUrl}
                  alt={data.title}
                  fill
                  className="object-cover"
                />
              </CardContent>

              <CardFooter className="flex justify-between gap-1 border py-3 px-2">
                <div>{priceToTsx(data.price, data.discount)}</div>

                <Button size="min" asChild>
                  <Link href={`/courses/${id}/checkout`}>Start now</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
