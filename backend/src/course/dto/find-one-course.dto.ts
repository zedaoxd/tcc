export class FindOneCourseDto {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  discount: number;
  soldCount: number;
  rating: number;
  preview: boolean;
  level: string;
  published: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  modules: Array<{
    id: string;
    title: string;
    duration: number;
    order: number;
    lessons: Array<{
      id: string;
      title: string;
      duration: number;
      preview: boolean;
      videoUrl: string;
    }>;
  }>;
  category: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    firstName: string;
    lastName: string | null;
    description: string | null;
    imageUrl: string | null;
    coursesCreated: {
      quantityLessons: number;
      quantityStudents: number;
    };
  };

  constructor(entity: FindOneCourseDto) {
    Object.assign(this, entity);
  }
}
