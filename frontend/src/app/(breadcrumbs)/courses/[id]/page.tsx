import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CurseStatus from "@/components/modules/courses/components/curse-status";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Jost } from "next/font/google";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File } from "lucide-react";
import Link from "next/link";

const jost = Jost({ subsets: ["latin"], weight: ["400", "600"] });

type CoursePageProps = {
  params: {
    id: string;
  };
  searchParams: {};
};

export default function Couse({ params: { id } }: CoursePageProps) {
  return (
    <section className="w-full">
      <div className="container bg-black text-white py-14 flex flex-col gap-5">
        <div className="flex gap-3">
          <Badge variant="gray">Programming</Badge>

          <p className={cn(jost.className, "font-normal")}>
            by <span className="font-semibold">John Doe</span>
          </p>
        </div>

        <h1 className="text-4xl font-semibold leading-10 capitalize">
          The Complete JavaScript Course 2024: From Zero to Expert!
        </h1>

        <p className="flex gap-6">
          <CurseStatus
            duration="3"
            lessons={10}
            level="Intermediate"
            numberOfStudents={100}
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

          <TabsContent value="overview">
            <p>
              LearnPress is a comprehensive WordPress LMS Plugin for WordPress.
              This is one of the best WordPress LMS Plugins which can be used to
              easily create & sell courses online. You can create a course
              curriculum with lessons & quizzes included which is managed with
              an easy-to-use interface for users. Having this WordPress LMS
              Plugin, now you have a chance to quickly and easily create
              education, online school, online-course websites with no coding
              knowledge required.
            </p>

            <p>
              LearnPress is free and always will be, but it is still a premium
              high-quality WordPress Plugin that definitely helps you with
              making money from your WordPress Based LMS. Just try and see how
              amazing it is. LearnPress WordPress Online Course plugin is
              lightweight and super powerful with lots of Add-Ons to empower its
              core system.How to use WPML Add-on for LearnPress? No comments
              yet! You be the first to comment.
            </p>
          </TabsContent>

          <TabsContent value="curriculum">
            <div className="flex flex-col gap-5">
              <p>
                LearnPress is a comprehensive WordPress LMS Plugin for
                WordPress. This is one of the best WordPress LMS Plugins which
                can be used to easily create & sell courses online.
              </p>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1 ">
                  <AccordionTrigger className="bg-white rounded-t-lg px-3">
                    <p className="w-full flex justify-between pr-3">
                      Module 1<span>5 Lessons 45 Mins</span>
                    </p>
                  </AccordionTrigger>

                  <AccordionContent className="bg-white rounded-b-lg px-3 flex flex-col gap-3">
                    <Link
                      href="#"
                      className="flex items-center hover:text-primary"
                    >
                      <File className="w-4 h4 mr-1" /> Lesson 1: Introduction
                    </Link>

                    <Link
                      href="#"
                      className="flex items-center hover:text-primary"
                    >
                      <File className="w-4 h4 mr-1" /> Lesson 2: Introduction
                    </Link>

                    <Link
                      href="#"
                      className="flex items-center hover:text-primary"
                    >
                      <File className="w-4 h4 mr-1" /> Lesson 3: Introduction
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
