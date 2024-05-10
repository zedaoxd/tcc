namespace Course {
  type SimpleModel = {
    id: string;
    author: string;
    title: string;
    thumbnail: string;
    duration: number;
    category: string;
    numberOfStudents: number;
    price: number;
    discountPercentage?: number;
  };

  type Model = SimpleModel & {
    lessons: number;
    level: string;
  };

  namespace Category {
    type Model = {
      id: string;
      name: string;
      quantity: number;
    };
  }
}
