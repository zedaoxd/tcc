export class SimpleCourseDto {
  id: string;
  title: string;
  discount: number;
  soldCount: number;
  author: {
    firstName: string;
    lastName: string;
  };
  modules: {
    _count: {
      lessons: number;
    };
    duration: number;
  }[];
}
