import { Benefit } from "./types";

type UseBenefits = {
  benefits: Benefit[];
};

export default function useBenefits(): UseBenefits {
  const benefits: Benefit[] = [
    {
      title: "Recognized Certifications",
    },
    {
      title: "Learn new skills",
    },
    {
      title: "Flexibility of Schedules",
    },
    {
      title: "Personalized Follow-up",
    },
  ];

  return {
    benefits,
  };
}
