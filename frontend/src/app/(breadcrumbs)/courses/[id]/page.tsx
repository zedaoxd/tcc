import CurseStatus from "@/components/modules/courses/components/curse-status";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Jost } from "next/font/google";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseAccordion from "@/components/modules/courses/components/accordion";

const jost = Jost({ subsets: ["latin"], weight: ["400", "600"] });

type CoursePageProps = {
  params: {
    id: string;
  };
  searchParams: {};
};

export default async function Course({ params: { id } }: CoursePageProps) {
  const data: Course.Full = await fetch(
    `http://backend:4000/courses/${id}`
  ).then((res) => res.json());

  const { lessons, duration } = data.modules.reduce(
    (acc, module) => ({
      lessons: acc.lessons + module.lessons.length,
      duration: acc.duration + module.duration,
    }),
    { lessons: 0, duration: 0 }
  );

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
          <CurseStatus
            duration={duration}
            lessons={lessons}
            level={data.level}
            numberOfStudents={data.soldCount}
          />
        </p>
      </div>

      <div className="container mt-12 grid grid-cols-4 gap-5">
        <Tabs defaultValue="overview" className="w-full col-span-3">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>

            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>

            <TabsTrigger value="instructor">Instructor</TabsTrigger>

            <TabsTrigger value="faqs">FAQs</TabsTrigger>

            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">{data.description}</TabsContent>

          <TabsContent value="curriculum">
            <div className="flex flex-col gap-5">
              <CourseAccordion modules={data.modules} />
            </div>
          </TabsContent>

          <TabsContent value="instructor">Instructor</TabsContent>

          <TabsContent value="faqs">FAQs</TabsContent>

          <TabsContent value="reviews">Reviews</TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
