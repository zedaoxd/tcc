import axios from "axios";

export async function getOneCourse(id: string) {
  const route = `http://${process.env.BACKEND_CONTAINER}:${process.env.BACKEND_PORT}/courses/${id}`;

  const response = await axios.get<Course.CourseResponse>(route);

  return response.data;
}
