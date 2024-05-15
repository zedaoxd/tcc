namespace User {
  type HavePublishedCourses = {
    id: string;
    name: string;
    quantity: number;
  };

  type SimpleModel = {
    id: string;
    firstName: string;
    lastName: string;
  };

  type Model = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "ADMIN" | "USER";
    imageUrl: string | null;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
