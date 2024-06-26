"use client";

import { useQuery } from "@tanstack/react-query";
import { getPaginatedCourses, getUsersPublishedCourses } from "../service";
import { useEffect, useState } from "react";
import {
  getCategoriesWithCoursesSize,
  getGroupedByLevel,
  getGroupedByRating,
  getQuantityPricesTypes,
} from "../categories/service";

type Props = {
  page?: number;
  size?: number;
  search?: string;
  category?: string;
  author?: string;
  price?: string;
  rating?: string;
  level?: string;
};

type CousePaginated = {
  page: number;
  size: number;
  search?: string;
  category?: string;
  author?: string;
  price?: string;
  rating?: string;
  level?: string;
};

type UseCourses = {
  courses: {
    data: Paginated<Course.Model> | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  pageControl: {
    nextPage: () => void;
    previousPage: () => void;
    setPage: (page: number) => void;
  };
  pageStatus: {
    page: number;
    totalPages: number;
  };
  categories: Course.Category.Model[];
  instructors: User.HavePublishedCourses[];
  prices: Course.Price[];
  ratings: Course.Rating[];
  levels: Course.Level[];
};

export const useCourses = (props: Props): UseCourses => {
  const [paginationState, setPaginationState] = useState<CousePaginated>({
    ...props,
    page: props.page ?? 1,
    size: 6,
  });

  useEffect(() => {
    setPaginationState((prev) => ({
      ...prev,
      ...props,
    }));
  }, [props]);

  const { data: levels } = useQuery({
    queryKey: ["getGroupedByLevel"],
    queryFn: getGroupedByLevel,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: ratings } = useQuery({
    queryKey: ["getGroupedByRating"],
    queryFn: getGroupedByRating,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: prices } = useQuery({
    queryKey: ["getQuantityPricesTypes"],
    queryFn: getQuantityPricesTypes,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: categories } = useQuery({
    queryKey: ["getCategoriesWithCoursesSize"],
    queryFn: getCategoriesWithCoursesSize,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: instructors } = useQuery({
    queryKey: ["getUsersPublishedCourses"],
    queryFn: getUsersPublishedCourses,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    data: courses,
    isError: coursesError,
    isLoading: coursesIsLoading,
  } = useQuery({
    queryKey: ["getPaginatedCourses", paginationState],
    queryFn: () => getPaginatedCourses(paginationState),
  });

  const setPage = (page: number) => {
    if (page < 1) return;

    if (courses?.totalPages === undefined || page > courses?.totalPages) return;

    setPaginationState((prev) => ({
      ...prev,
      page: page,
    }));
  };

  const nextPage = () => {
    if (courses?.page === courses?.totalPages) return;

    setPaginationState((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const previousPage = () => {
    if (courses?.page === 1) return;

    setPaginationState((prev) => ({
      ...prev,
      page: paginationState.page - 1,
    }));
  };

  return {
    courses: {
      data: courses,
      isLoading: coursesIsLoading,
      isError: coursesError,
    },
    pageControl: {
      nextPage,
      previousPage,
      setPage,
    },
    pageStatus: {
      page: courses?.page ?? 1,
      totalPages: courses?.totalPages ?? 1,
    },
    categories: categories ?? [],
    instructors: instructors ?? [],
    prices: prices ?? [],
    ratings: ratings ?? [],
    levels: levels ?? [],
  };
};
