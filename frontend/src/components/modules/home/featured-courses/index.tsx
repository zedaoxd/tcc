"use client";

import Section from "@/components/shared/section";
import useFeaturedCourses from "./useFeaturedCourses";
import CardCourse from "../../../shared/card-course";

export default function FeaturedCourses() {
  const { featuredCourses, ButtonShowAll } = useFeaturedCourses();

  return (
    <Section
      title="Featured Courses"
      subtitle="Explore our Popular Courses"
      action={ButtonShowAll}
    >
      <div className="pt-3 grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {featuredCourses.map((course) => (
          <CardCourse
            className="relative transition-transform transform-gpu hover:-translate-y-3 hover:shadow-lg"
            key={course.id}
            {...course}
          />
        ))}
      </div>
    </Section>
  );
}
