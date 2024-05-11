"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPaginatedCourses } from "../service";
import { useState } from "react";

type CoursesProps = {
  page?: number;
  size?: number;
  search?: string;
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
};

export const useCourses = ({
  page = 1,
  search = "",
  size = 1,
}: CoursesProps = {}): UseCourses => {
  const [paginationState, setPaginationState] = useState({
    page: page,
    search: search,
    size: size,
  });

  const queryClient = useQueryClient();

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

    console.log(page);

    setPaginationState((prev) => ({
      ...prev,
      page: page,
    }));

    queryClient.invalidateQueries({
      queryKey: ["getPaginatedCourses", paginationState],
    });
  };

  const nextPage = () => {
    if (courses?.page === courses?.totalPages) return;

    setPaginationState((prev) => ({
      ...prev,
      page: paginationState.page + 1,
    }));
  };

  const previousPage = () => {
    if (courses?.page === 1) return;

    console.log("previousPage");

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
  };
};
