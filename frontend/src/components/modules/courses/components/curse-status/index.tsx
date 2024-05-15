import { BarChart, Clock, FileText, GraduationCap } from "lucide-react";
import CurseDescription from "../cuse-description";
import { formatDuration } from "@/lib/utils";

type Props = {
  duration: number;
  numberOfStudents: number;
  level: string;
  lessons: number;
};

export default function CurseStatus({
  duration,
  numberOfStudents,
  level,
  lessons,
}: Props) {
  return (
    <>
      <CurseDescription description={formatDuration(duration)} Icon={Clock} />

      <CurseDescription
        description={`${numberOfStudents} students`}
        Icon={GraduationCap}
      />

      <CurseDescription
        className="capitalize"
        description={level}
        Icon={BarChart}
      />

      <CurseDescription description={`${lessons} lessons`} Icon={FileText} />
    </>
  );
}
