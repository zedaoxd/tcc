import { BarChart, Clock, FileText, GraduationCap } from "lucide-react";
import CourseDescription from "../course-description";
import { formatDuration } from "@/lib/utils";

type Props = {
  duration: number;
  numberOfStudents: number;
  level: string;
  lessons: number;
};

export default function CourseStatus({
  duration,
  numberOfStudents,
  level,
  lessons,
}: Props) {
  return (
    <>
      <CourseDescription description={formatDuration(duration)} Icon={Clock} />

      <CourseDescription
        description={`${numberOfStudents} students`}
        Icon={GraduationCap}
      />

      <CourseDescription
        className="capitalize"
        description={level}
        Icon={BarChart}
      />

      <CourseDescription description={`${lessons} lessons`} Icon={FileText} />
    </>
  );
}
