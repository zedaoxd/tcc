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

type GetQuantityPricesTypes = {
  paid: number;
  free: number;
  all: number;
};

export async function getQuantityPricesTypes(): Promise<Course.Price[]> {
  const { data } = await api.get<GetQuantityPricesTypes>(
    "/courses/quantity-prices-types"
  );

  return Object.entries(data)
    .map(([key, value]) => ({
      id: key,
      name: key,
      quantity: value,
    }))
    .sort((a, b) => b.quantity - a.quantity);
}

type GetGroupedByRating = {
  rating: number;
  _count: { rating: number };
};

export async function getGroupedByRating(): Promise<Course.Rating[]> {
  const response = await api.get<GetGroupedByRating[]>(
    "/courses/grouped-by-rating"
  );

  return response.data.map((rating) => ({
    rating: rating.rating,
    quantity: rating._count.rating,
  }));
}
