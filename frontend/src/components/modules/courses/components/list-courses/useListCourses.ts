import { Course } from "../types";

type UseListCourses = {
  courses: Course[];
};

export default function useListCourses(): UseListCourses {
  const courses: Course[] = [
    {
      id: "b1deb8d4-4eb5-4b94-aa9c-db5d3fdf11bd",
      author: "John Doe",
      duration: "2",
      level: "beginner",
      lessons: 10,
      price: 10_000,
      discontPercentage: 0.2,
      students: 100,
      title: "Course 1",
      thumbnail:
        "https://sbruodoekbkbgiiyjxcc.supabase.co/storage/v1/object/public/images/CreateanLMSWebsitewithLearnPress.png",
    },
  ];

  return { courses };
}
