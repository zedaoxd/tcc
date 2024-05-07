import CardCourse from "@/components/shared/card-course";

type Props = {
  courses: Course.Model[];
};

export default function GridCourses({ courses }: Props) {
  return (
    <div className="grid grid-cols-2 gap-5">
      {courses.map((course) => (
        <CardCourse key={course.id} {...course} />
      ))}
    </div>
  );
}
