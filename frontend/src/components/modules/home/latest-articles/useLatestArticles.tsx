import { Button } from "@/components/ui/button";
import { Article } from "./types";
import Link from "next/link";

type UseLatestArticles = {
  articles: Article[];
  ButtonViewAllArticles: React.ReactElement;
};

export default function useLatestArticles(): UseLatestArticles {
  const articles: Article[] = [
    {
      id: "e8c2c5c0-0b7a-4b1a-9b1a-9b1a9b1a9b1a",
      date: "jan 27, 2024",
      description:
        "Next.js is a popular open-source React framework that is designed to make it easy to build web applications with React. It is a production-ready framework that provides a great developer experience and many built-in features such as support for server-side rendering, static site generation, and routing.",
      thumbnail:
        "https://sbruodoekbkbgiiyjxcc.supabase.co/storage/v1/object/public/images/why-use-nextjs.png",
      title: "Why use Next.js?",
    },
    {
      id: "e8c2c5c0-0b7a-4b1a-9b1a-9b1a9b1a9b1b",
      date: "jan 25, 2024",
      thumbnail:
        "https://sbruodoekbkbgiiyjxcc.supabase.co/storage/v1/object/public/images/solid.png",
      description:
        "SOLID is a set of five principles that help us to design maintainable and understandable software. It was introduced by Robert C. Martin (Uncle Bob) in his 2000 paper Design Principles and Design Patterns.",
      title: "SOLID Principles",
    },
    {
      id: "e8c2c5c0-0b7a-4b1a-9b1a-9b1a9b1a9b1c",
      date: "jan 23, 2024",
      thumbnail:
        "https://sbruodoekbkbgiiyjxcc.supabase.co/storage/v1/object/public/images/best-programming-languages.png",
      description:
        "There are hundreds of programming languages, and new ones keep getting created. So, how do you decide which one to learn? In this article, I will share my thoughts on the best programming languages to learn in 2024.",
      title: "Best Programming Languages",
    },
  ];

  const ButtonViewAllArticles = (
    <Button variant="outline" asChild>
      <Link href="/articles">View all articles</Link>
    </Button>
  );

  return { articles, ButtonViewAllArticles };
}
