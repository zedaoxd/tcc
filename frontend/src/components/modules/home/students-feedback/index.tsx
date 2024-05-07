import Section from "@/components/shared/section";
import useStudentsFeedback from "./useStudentsFeedback";
import StudentFeedback from "./components/student-feedback";

export default function StudentsFeedback() {
  const { feedbacks } = useStudentsFeedback();

  return (
    <Section
      title="Student feedbacks"
      subtitle="What Students Say About Us"
      className="justify-center items-center"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {feedbacks.map((feedback) => (
          <StudentFeedback key={feedback.id} {...feedback} />
        ))}
      </div>
    </Section>
  );
}
