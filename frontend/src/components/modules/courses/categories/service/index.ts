import { api } from "@/components/shared/api";

type GetTopCategories = {
  id: string;
  name: string;
  _count: { courses: number };
};

export async function getTopCategories(): Promise<Course.Category.Model[]> {
  const response = await api.get<GetTopCategories[]>(
    "/categories/top-categories"
  );
  return response.data.map((category) => ({
    id: category.id,
    name: category.name,
    quantity: category._count.courses,
  }));
}

type GetCategoriesWithCoursesSize = {
  id: string;
  name: string;
  _count: { courses: number };
};

export async function getCategoriesWithCoursesSize(): Promise<
  Course.Category.Model[]
> {
  const response = await api.get<GetCategoriesWithCoursesSize[]>(
    "/categories/categories-with-courses-size"
  );
  return response.data
    .map((category) => ({
      id: category.id,
      name: category.name,
      quantity: category._count.courses,
    }))
    .sort((a, b) => b.quantity - a.quantity);
}
