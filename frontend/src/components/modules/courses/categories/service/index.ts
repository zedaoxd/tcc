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
