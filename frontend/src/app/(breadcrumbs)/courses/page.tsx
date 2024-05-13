"use client";

import Filter from "@/components/modules/courses/components/filter";
import GridCourses from "@/components/modules/courses/components/grid-courses";
import Header from "@/components/modules/courses/components/header";
import ListCourses from "@/components/modules/courses/components/list-courses";
import { PaginationCourses } from "@/components/modules/courses/components/pagination";
import { useCourses } from "@/components/modules/courses/hooks/use-courses";

import Show from "@/lib/show";

import "@smastrom/react-rating/style.css";

type CoursesProps = {
  searchParams: {
    search?: string;
    listType?: "list" | "grid";
    category?: string;
    author?: string;
    price?: string;
    review?: string;
    level?: string;
  };
};

export default function Courses({ searchParams }: CoursesProps) {
  const { listType } = searchParams;

  const {
    courses,
    pageControl,
    pageStatus,
    categories,
    instructors,
    prices,
    ratings,
    levels,
  } = useCourses(searchParams);

  return (
    <div className="container mt-10">
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-3 flex flex-col gap-8">
          <Header searchParams={searchParams} />

          <Show when={listType === undefined || listType === "list"}>
            <ListCourses
              courses={courses.data?.itens}
              isLoading={courses.isLoading}
            />
          </Show>

          <Show when={listType === "grid"}>
            <GridCourses
              courses={courses.data?.itens}
              isLoading={courses.isLoading}
            />
          </Show>

          <PaginationCourses
            nextPage={pageControl.nextPage}
            previousPage={pageControl.previousPage}
            setPage={pageControl.setPage}
            page={pageStatus.page}
            totalPages={pageStatus.totalPages}
            disabled={courses.isLoading}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Filter
            items={categories}
            title="Course Category"
            searchParams={searchParams}
            paramKey="category"
            initialChecked={searchParams.category}
          />

          <Show when={!!instructors && instructors.length > 0}>
            <Filter
              items={instructors}
              title="Instructors"
              searchParams={searchParams}
              paramKey="author"
              initialChecked={searchParams.author}
            />
          </Show>

          <Filter
            items={prices}
            title="Price"
            searchParams={searchParams}
            paramKey="price"
            initialChecked={searchParams.price ?? "all"}
          />

          <Filter
            items={ratings}
            title="Review"
            searchParams={searchParams}
            paramKey="review"
            initialChecked={searchParams.review}
          />

          <Filter
            items={levels}
            title="Level"
            searchParams={searchParams}
            paramKey="level"
            initialChecked={searchParams.level}
          />
        </div>
      </div>
    </div>
  );
}
