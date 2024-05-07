import { Metrics } from "./types";

type UseMetrics = {
  metrics: Metrics[];
};

export default function useMetrics(): UseMetrics {
  const metrics: Metrics[] = [
    {
      description: "Active Students",
      title: "25k+",
    },
    {
      description: "Total Courses",
      title: "899",
    },
    {
      description: "Total Instructors",
      title: "158",
    },
    {
      description: "Satisfaction rate",
      title: "99%",
    },
  ];

  return {
    metrics,
  };
}
