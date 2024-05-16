import CourseStatus from "@/components/modules/courses/components/course-status";
import TabsCourse from "@/components/modules/courses/components/tabs-course";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Jost } from "next/font/google";

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
    coursesCreated: Array<{
      _count: { soldTo: number };
      modules: Array<{ _count: { lessons: number } }>;
    }>;
  };
};

export default async function Course({ params: { id } }: CoursePageProps) {
  const data: GetCourse = await fetch(`http://backend:4000/courses/${id}`).then(
    (res) => res.json()
  );

  const { lessons, duration } = data.modules.reduce(
    (acc, module) => ({
      lessons: acc.lessons + module.lessons.length,
      duration: acc.duration + module.duration,
    }),
    { lessons: 0, duration: 0 }
  );

  const { quantityLessons, quantityStudents } =
    data.author.coursesCreated.reduce(
      (acc, course) => {
        return {
          quantityLessons:
            acc.quantityLessons +
            course.modules.reduce(
              (acc, module) => acc + module._count.lessons,
              0
            ),
          quantityStudents: acc.quantityStudents + course._count.soldTo,
        };
      },
      { quantityLessons: 0, quantityStudents: 0 }
    );

  const instructor: User.Instructor = {
    ...data.author,
    quantityLessons,
    quantityStudents,
  };

  return (
    <section className="w-full">
      <div className="container bg-black text-white py-14 flex flex-col gap-5">
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

      <div className="container mt-12 grid grid-cols-4 gap-5">
        <TabsCourse
          description={data.description}
          modules={mockModules}
          instructor={instructor}
        />
      </div>
    </section>
  );
}
