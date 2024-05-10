"use client";

import {
  AlignEndHorizontal,
  Binary,
  BrainCircuit,
  Brush,
  Code2,
  Contact,
  Cpu,
  Music,
  Notebook,
  Speech,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTopCategories } from "../../courses/categories/service";
import { ReactNode } from "react";

type Card = {
  icon: ReactNode;
  name: string;
  quantity: number;
  slug: string;
};

type UseTopCategories = {
  topCategories: Card[];
  isLoading: boolean;
  error: Error | null;
};

export default function useTopCategories(): UseTopCategories {
  const { data, isLoading, error } = useQuery({
    queryKey: ["top-categories"],
    queryFn: getTopCategories,
  });

  const categoriesIconMapper: { [key: string]: ReactNode } = {
    Programming: <Code2 />,
    Technology: <Cpu />,
    "Data Science": <BrainCircuit />,
    "Personal Development": <Contact />,
    "Graphic Design": <Brush />,
    "Foreign Languages": <Speech />,
    "Digital Marketing": <Binary />,
    Music: <Music />,
    "Business and Entrepreneurship": <AlignEndHorizontal />,
    Portuguese: <Notebook />,
  };

  const topCategories = data?.map((category) => ({
    ...category,
    icon: categoriesIconMapper[category.name],
    slug: `courses?category=${category.id}`,
  }));

  return {
    isLoading,
    topCategories: topCategories || [],
    error,
  };
}
