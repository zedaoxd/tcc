"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type UseFeaturedCourse = {
  featuredCourses: Course.Model[];
  ButtonShowAll: React.ReactNode;
};

export default function useFeaturedCourses(): UseFeaturedCourse {
  const featuredCourses: Course.Model[] = [
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

  const ButtonShowAll = (
    <Button variant="outline" className="font-bold" asChild>
      <Link href="/courses">All Courses</Link>
    </Button>
  );

  return {
    featuredCourses,
    ButtonShowAll,
  };
}
