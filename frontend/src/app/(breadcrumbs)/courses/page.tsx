import Filter from "@/components/modules/courses/components/filter";
import GridCourses from "@/components/modules/courses/components/grid-courses";
import Header from "@/components/modules/courses/components/header";
import ListCourses from "@/components/modules/courses/components/list-courses";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  const courses: Course.Model[] = [
    {
      id: "b1deb8d4-4eb5-4b94-aa9c-db5d3fdf11bc",
      author: "Bruno L.",
      category: "Development",
      thumbnail:
        "https://sbruodoekbkbgiiyjxcc.supabase.co/storage/v1/object/public/images/nextjs.jpg",
      numberOfStudents: 172,
      price: 29_900,
      title: "Next.js: The Complete Guide",
      duration: "8",
      discountPercentage: 0.2,
      lessons: 10,
      level: "Beginner",
    },
    {
      id: "89df3d62-56da-4362-bc27-091926ddca60",
      author: "John Doe",
      category: "Art & Design",
      duration: "3",
      thumbnail:
        "https://sbruodoekbkbgiiyjxcc.supabase.co/storage/v1/object/public/images/CreateanLMSWebsitewithLearnPress.png",
      numberOfStudents: 156,
      price: 25_000,
      title: "Create an LMS Website with LearnPress",
      lessons: 25,
      level: "Intermidiate",
    },
    {
      id: "f89df721-7b28-425e-9dce-0dd8efecee3d",
      author: "Jennifer M.",
      category: "Art & Design",
      duration: "2",
      thumbnail:
        "https://sbruodoekbkbgiiyjxcc.supabase.co/storage/v1/object/public/images/DesignAWebsiteWithThimPress.png",
      numberOfStudents: 123,
      price: 0,
      title: "Design A Website With ThimPress",
      lessons: 15,
      level: "Expert",
    },
    {
      id: "deb0a58f-cbe2-422e-8e6c-f96cba5f6642",
      author: "Brenda Tejeda",
      category: "Photography",
      duration: "2",
      thumbnail:
        "https://sbruodoekbkbgiiyjxcc.supabase.co/storage/v1/object/public/images/Photography.png",
      numberOfStudents: 173,
      price: 34_900,
      title: "How to brighten your photos",
      lessons: 37,
      level: "Beginner",
    },
    {
      id: "6c9346ff-2e04-4633-a2aa-6c885abd3f8e",
      author: "Bob Ross",
      category: "Communication",
      duration: "1",
      thumbnail:
        "https://sbruodoekbkbgiiyjxcc.supabase.co/storage/v1/object/public/images/areas-da-comunicacao-social.jpg",
      numberOfStudents: 99,
      price: 0,
      title: "Areas of Communication",
      lessons: 10,
      level: "Beginner",
    },
    {
      id: "0274cbe9-ac0a-4e27-9002-bac65d703d40",
      author: "Jack Sparrow",
      category: "Finance",
      duration: "2",
      thumbnail:
        "https://sbruodoekbkbgiiyjxcc.supabase.co/storage/v1/object/public/images/Finance-and-Accounting.jpg",
      numberOfStudents: 133,
      price: 10_000,
      title: "Finance and Accounting",
      lessons: 10,
      level: "Beginner",
    },
  ];

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
            <ListCourses courses={courses} />
          </Show>

          <Show when={listType === "grid"}>
            <GridCourses courses={courses} />
          </Show>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
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
