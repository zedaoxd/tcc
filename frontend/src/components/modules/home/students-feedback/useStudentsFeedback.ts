import { StudentFeedback } from "./types";

type UseStudentsFeedback = {
  feedbacks: StudentFeedback[];
};

export default function useStudentsFeedback(): UseStudentsFeedback {
  const feedbacks: StudentFeedback[] = [
    {
      id: "f7a63b2a-8a84-4b29-bd87-1862ec3a9c9d",
      name: "John Doe",
      feedback:
        "The course not only equipped me with essential programming skills but also exposed me to the versatility of the tech industry. I've interacted with professionals in AI, UX design, and more, shaping my decision to pursue a career in machine learning.",
      profission: "Teacher",
    },
    {
      id: "9fd4a5c3-6fc2-478b-965a-7e0d2f4c3a55",
      name: "Alice Johnson",
      feedback:
        "This course has been a transformative journey! I've not only gained a deep understanding of coding but also discovered a passion for data science. Kudos to the instructors for the diverse curriculum!",
      profission: "Data Scientist",
    },
    {
      id: "d1e8dbfc-b456-4c01-85c6-902ac78351bf",
      name: "Bob Thompson",
      feedback:
        "Enrolling in this course was the best decision I made! The exposure to various programming languages opened my eyes to the world of software development. I'm now considering a career in cybersecurity, thanks to the engaging content.",
      profission: "Software Engineer",
    },
    {
      id: "2c58f95d-d29e-4e01-a7e7-c41b7ed408a2",
      name: "Carla Mendez",
      feedback:
        "I can't thank the course instructors enough for the practical insights into web development. The hands-on projects were incredibly valuable, and I'm now confidently pursuing a career as a front-end developer!",
      profission: "Web Developer",
    },
  ];

  return {
    feedbacks,
  };
}
