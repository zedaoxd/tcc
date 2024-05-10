import { api } from "@/components/shared/api";

type GetFeaturedCourses = {
  id: string;
  title: string;
  price: number;
  discount: number;
  soldCount: number;
  imageUrl: string;
  category: { name: string };
  modules: Array<{ duration: number }>;
  author: {
    firstName: string;
    lastName?: string;
  };
};

export async function getFeaturedCourses(): Promise<Course.SimpleModel[]> {
  const response = await api.get<GetFeaturedCourses[]>(
    "/courses/top-purchased"
  );

  return response.data.map((course) => ({
    author: `${course.author.firstName} ${course.author.lastName}`,
    category: course.category.name,
    thumbnail: course.imageUrl,
    title: course.title,
    id: course.id,
    price: course.price,
    discountPercentage: course.discount,
    numberOfStudents: course.soldCount,
    duration: course.modules.reduce((acc, module) => acc + module.duration, 0),
  }));
}
