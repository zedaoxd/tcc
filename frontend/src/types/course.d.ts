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

  type Full = {
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
    createdAt: string;
    updatedAt: string;
    modules: Module.Model[];
    category: Category.Model;
    author: User.SimpleModel;
  };

  namespace Module {
    type Model = {
      id: string;
      title: string;
      duration: number;
      order: number;
      lessons: Lesson[];
    };

    type Lesson = {
      id: string;
      title: string;
      duration: number;
      preview: boolean;
      videoUrl: string;
    };
  }

  type Price = {
    id: string;
    name: string;
    quantity: number;
  };

  type Level = {
    id: string;
    name: string;
    quantity: number;
  };

  type Rating = {
    rating: number;
    quantity: number;
  };

  namespace Category {
    type SimpleModel = {
      id: string;
      name: string;
    };

    type Model = {
      id: string;
      name: string;
      quantity: number;
    };
  }
}
