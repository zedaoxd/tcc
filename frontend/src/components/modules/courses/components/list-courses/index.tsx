import Show from "@/lib/show";
import CardCourseHorizontal from "./components/card-course-horizontal";

type ListCoursesProps = {
  courses: Course.Model[] | undefined;
  isLoading: boolean;
};

export default function ListCourses({ courses, isLoading }: ListCoursesProps) {
  return (
    <div className="flex flex-col gap-5">
      <Show when={isLoading}>
        {Array.from({ length: 6 }).map((_, index) => (
          <CardCourseHorizontal.Skeleton key={index} />
        ))}
      </Show>

      <Show when={!isLoading}>
        {courses?.map((course) => (
          <CardCourseHorizontal key={course.id} {...course} />
        ))}
      </Show>
    </div>
  );
}
