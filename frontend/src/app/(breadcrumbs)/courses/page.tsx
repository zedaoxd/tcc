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

  const { courses, pageControl, pageStatus } = useCourses();

  const categories = [
    {
      id: "b1deb8d4-4eb5-4b94-aa9c-db5d3fdf11bc",
      name: "Development",
      size: Math.floor(Math.random() * 100),
    },
    {
      id: "89df3d62-56da-4362-bc27-091926ddca60",
      name: "Art & Design",
      size: Math.floor(Math.random() * 100),
    },
    {
      id: "f89df721-7b28-425e-9dce-0dd8efecee3d",
      name: "Photography",
      size: Math.floor(Math.random() * 100),
    },
    {
      id: "deb0a58f-cbe2-422e-8e6c-f96cba5f6642",
      name: "Communication",
      size: Math.floor(Math.random() * 100),
    },
    {
      id: "6c9346ff-2e04-4633-a2aa-6c885abd3f8e",
      name: "Finance",
      size: Math.floor(Math.random() * 100),
    },
  ];

  const instructors = [
    {
      id: "b1deb8d4-4eb5-4b94-aa9c-db5d3fdf11bc",
      name: "Bruno L.",
      size: Math.floor(Math.random() * 100),
    },
    {
      id: "89df3d62-56da-4362-bc27-091926ddca60",
      name: "John Doe",
      size: Math.floor(Math.random() * 100),
    },
    {
      id: "f89df721-7b28-425e-9dce-0dd8efecee3d",
      name: "Jennifer M.",
      size: Math.floor(Math.random() * 100),
    },
    {
      id: "deb0a58f-cbe2-422e-8e6c-f96cba5f6642",
      name: "Brenda Tejeda",
      size: Math.floor(Math.random() * 100),
    },
    {
      id: "6c9346ff-2e04-4633-a2aa-6c885abd3f8e",
      name: "Bob Ross",
      size: Math.floor(Math.random() * 100),
    },
  ];

  const price = [
    {
      id: "b1deb8d4-4eb5-4b94-aa9c-db5d3fdf11bc",
      name: "All",
      size: 100,
    },
    {
      id: "b1deb8d4-4eb5-4b94-aa9c-db5d3fdf11bh",
      name: "Free",
      size: 10,
    },
    {
      id: "89df3d62-56da-4362-bc27-091926ddca60",
      name: "Paid",
      size: 90,
    },
  ];

  const level = [
    {
      id: "b1deb8d4-4eb5-4b94-aa9c-db5d3fdf11bc",
      name: "All",
      size: 220,
    },
    {
      id: "b1deb8d4-4eb5-4b94-aa9c-db5d3fdf11bs",
      name: "Beginner",
      size: 100,
    },
    {
      id: "89df3d62-56da-4362-bc27-091926ddca60",
      name: "Intermidiate",
      size: 30,
    },
    {
      id: "f89df721-7b28-425e-9dce-0dd8efecee3d",
      name: "Expert",
      size: 90,
    },
  ];

  const rating = [
    {
      rating: 5,
      size: Math.floor(Math.random() * 100),
    },
    {
      rating: 4,
      size: Math.floor(Math.random() * 100),
    },
    {
      rating: 3,
      size: Math.floor(Math.random() * 100),
    },
    {
      rating: 2,
      size: Math.floor(Math.random() * 100),
    },
    {
      rating: 1,
      size: Math.floor(Math.random() * 100),
    },
  ];

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

          <Filter
            items={instructors}
            title="Instructors"
            searchParams={searchParams}
            paramKey="author"
            initialChecked={searchParams.author}
          />

          <Filter
            items={price}
            title="Price"
            searchParams={searchParams}
            paramKey="price"
            initialChecked={searchParams.price}
          />

          <Filter
            items={rating}
            title="Review"
            searchParams={searchParams}
            paramKey="review"
            initialChecked={searchParams.review}
          />

          <Filter
            items={level}
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
