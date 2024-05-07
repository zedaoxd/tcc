import { BarChart, Clock, FileText, GraduationCap } from "lucide-react";
import CurseDescription from "../cuse-description";

type Props = {
  duration: string;
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
      <CurseDescription description={`${duration} Weeks`} Icon={Clock} />

      <CurseDescription
        description={`${numberOfStudents} students`}
        Icon={GraduationCap}
      />

      <CurseDescription description={level} Icon={BarChart} />

      <CurseDescription description={`${lessons} lessons`} Icon={FileText} />
    </>
  );
}
