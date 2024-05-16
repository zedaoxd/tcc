import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseAccordion from "./components/accordion";
import TabIstructor from "./components/tab-instructor";

type Props = {
  description: string;
  modules: Course.Module.Model[];
  instructor: User.Instructor;
};

export default function TabsCourse({
  description,
  modules,
  instructor,
}: Props) {
  return (
    <Tabs defaultValue="overview" className="w-full col-span-3">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>

        <TabsTrigger value="curriculum">Curriculum</TabsTrigger>

        <TabsTrigger value="instructor">Instructor</TabsTrigger>

        <TabsTrigger value="faqs">FAQs</TabsTrigger>

        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">{description}</TabsContent>

      <TabsContent value="curriculum">
        <CourseAccordion modules={modules} />
      </TabsContent>

      <TabsContent value="instructor">
        <TabIstructor instructor={instructor} />
      </TabsContent>

      <TabsContent value="faqs">FAQs</TabsContent>

      <TabsContent value="reviews">Reviews</TabsContent>
    </Tabs>
  );
}
