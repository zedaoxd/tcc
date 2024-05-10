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

  namespace Category {
    type Model = {
      id: string;
      name: string;
      quantity: number;
    };
  }
}
