export type GetBoughtCourse = {
  author: { firstName: string; lastName: string };
  id: string;
  imageUrl: string;
  category: { name: string };
  title: string;
};

export const getBoughtCourses = async (
  authToken: string
): Promise<GetBoughtCourse[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/my-purchased-courses`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      method: "GET",
    }
  ).then((res) => res.json());

  return response;
};

export type GetCreatedCourses = {
  author: { firstName: string; lastName: string };
  id: string;
  imageUrl: string;
  category: { name: string };
  title: string;
  published: boolean;
};

export const getCreatedCourses = async (
  authToken: string
): Promise<GetCreatedCourses[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/my-created-courses`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      method: "GET",
    }
  ).then((res) => res.json());

  return response;
};
