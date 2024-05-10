"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getFeaturedCourses } from "../../courses/categories/service";

type UseFeaturedCourse = {
  featuredCourses: Course.SimpleModel[] | undefined;
  ButtonShowAll: React.ReactNode;
  isLoading: boolean;
  error: Error | null;
};

export default function useFeaturedCourses(): UseFeaturedCourse {
  const {
    data: featuredCourses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featured-courses"],
    queryFn: getFeaturedCourses,
  });

  const ButtonShowAll = (
    <Button variant="outline" className="font-bold" asChild>
      <Link href="/courses">All Courses</Link>
    </Button>
  );

  return {
    featuredCourses,
    error,
    isLoading,
    ButtonShowAll,
  };
}
