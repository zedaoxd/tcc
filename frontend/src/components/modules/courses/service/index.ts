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

type GetPaginatedCourses = {
  level: string;
  modules: Array<{
    _count: {
      lessons: number;
    };
    duration: number;
  }>;
} & GetFeaturedCourses;

type GetPaginatedCoursesParams = {
  page: number;
  size: number;
  search: string;
};

export async function getPaginatedCourses(
  getParams: GetPaginatedCoursesParams
): Promise<Paginated<Course.Model>> {
  const params = new URLSearchParams({
    page: getParams.page.toString(),
    size: getParams.size.toString(),
    search: getParams.search,
  }).toString();

  const response = await api.get<Paginated<GetPaginatedCourses>>(
    `/courses?${params}`
  );

  return {
    ...response.data,
    itens: response.data.itens.map(mapCourse),
  };
}

type GetUsersHavePublishedCourses = {
  id: string;
  firstName: string;
  lastName: string;
  _count: {
    coursesCreated: number;
  };
};

export async function getUsersPublishedCourses(): Promise<
  User.HavePublishedCourses[]
> {
  const response = await api.get<GetUsersHavePublishedCourses[]>(
    "/users/published-courses"
  );

  return response.data.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    quantity: user._count.coursesCreated,
  }));
}

const mapCourse = (course: GetPaginatedCourses): Course.Model => ({
  id: course.id,
  author: `${course.author.firstName} ${course.author.lastName}`,
  category: course.category.name,
  duration: course.modules.reduce((acc, module) => acc + module.duration, 0),
  lessons: course.modules.reduce(
    (acc, module) => acc + module._count.lessons,
    0
  ),
  level: course.level,
  numberOfStudents: course.soldCount,
  price: course.price,
  thumbnail: course.imageUrl,
  title: course.title,
  discountPercentage: course.discount,
});
