import { getOneCourse } from "../course/service";
import priceToTsx from "@/components/shared/priceToTsx";

type UseCourse =
  | {
      lessons: number;
      duration: number;
      instructor: User.Instructor;
      category: Course.Category.Model["name"];
      author: string;
      isLoading: false;
      title: Course.Model["title"];
      level: Course.Model["level"];
      description: string;
      soldCount: number;
      thumbnail: Course.Model["thumbnail"];
      price: JSX.Element;
    }
  | {
      isLoading: true;
    };

export const useCourseServer = async (id: string): Promise<UseCourse> => {
  const data = await getOneCourse(id);

  if (!data) return { isLoading: true };

  const { lessons, duration } = data.modules.reduce(
    (acc, module) => ({
      lessons: acc.lessons + module.lessons.length,
      duration: acc.duration + module.duration,
    }),
    { lessons: 0, duration: 0 }
  );

  const instructor: User.Instructor = {
    id: data.author.id,
    firstName: data.author.firstName,
    lastName: data.author.lastName,
    description: data.author.description,
    imageUrl: data.author.imageUrl,
    quantityLessons: data.author.coursesCreated.quantityLessons,
    quantityStudents: data.author.coursesCreated.quantityStudents,
  };

  const author = `${instructor.firstName} ${instructor.lastName}`;

  return {
    lessons,
    duration,
    instructor,
    isLoading: false,
    category: data.category.name,
    author,
    title: data.title,
    level: data.level,
    soldCount: data.soldCount,
    description: data.description,
    thumbnail: data.imageUrl,
    price: priceToTsx(data.price, data.discount),
  };
};
