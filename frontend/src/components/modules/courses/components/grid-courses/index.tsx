import CardCourse from "@/components/shared/card-course";
import Show from "@/lib/show";

type Props = {
  courses: Course.Model[] | undefined;
  isLoading: boolean;
};

export default function GridCourses({ courses, isLoading }: Props) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Show when={isLoading}>loading...</Show>

      <Show when={!isLoading}>
        {courses?.map((course) => (
          <CardCourse key={course.id} {...course} />
        ))}
      </Show>
    </div>
  );
}
