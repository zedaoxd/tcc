namespace Course {
  type Model = {
    id: string;
    author: string;
    title: string;
    thumbnail: string;
    duration: string;
    category: string;
    numberOfStudents: number;
    lessons: number;
    price: number;
    level: string;
    discountPercentage?: number;
  };

  type Category = {
    id: string;
    name: string;
  };
}
