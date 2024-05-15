import { AccordionTrigger } from "@/components/ui/accordion";
import { formatDuration } from "@/lib/utils";

type Props = {
  title: string;
  duration: number;
  lessonsQuantity: number;
};

export const CouseAccordionTrigger = ({
  duration,
  lessonsQuantity,
  title,
}: Props) => {
  return (
    <AccordionTrigger className="px-2">
      <p className="w-full flex justify-between px-3 hover:text-primary hover:no-underline">
        {title}{" "}
        <span className="text-neutral-800">
          {lessonsQuantity} Lessons {formatDuration(duration)}
        </span>
      </p>
    </AccordionTrigger>
  );
};
