import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { CouseAccordionTrigger } from "./course-accordion-trigger";
import { CourseAccordionContent } from "./course-accordion-content";

type Props = {
  modules: Course.Module.Model[];
};

export default function CourseAccordion({ modules }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <p>
        Explore our comprehensive modules and specific engaging lessons to
        enhance your learning experience.
      </p>
      <Accordion type="single" collapsible className="bg-white rounded-lg">
        {modules.map((module) => (
          <AccordionItem value={module.id} key={module.id}>
            <CouseAccordionTrigger
              title={module.title}
              duration={module.duration}
              lessonsQuantity={module.lessons.length}
            />

            <AccordionContent className="p-2">
              {module.lessons.map((lesson) => (
                <CourseAccordionContent
                  key={lesson.id}
                  duration={lesson.duration}
                  preview={lesson.preview}
                  title={lesson.title}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
