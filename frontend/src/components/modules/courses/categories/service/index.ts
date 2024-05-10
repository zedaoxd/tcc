import axios from "axios";

type GetTopCategories = {
  id: string;
  name: string;
  _count: { courses: number };
};

export async function getTopCategories(): Promise<Course.Category.Model[]> {
  const response = await axios.get<GetTopCategories[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/top-categories`
  );
  return response.data.map((category) => ({
    id: category.id,
    name: category.name,
    quantity: category._count.courses,
  }));
}
