import CardMetric from "./components/card-metric";
import useMetrics from "./useMetrics";

export default function Metrics() {
  const { metrics } = useMetrics();
  return (
    <div className="container grid grid-cols-2 md:grid-cols-4 gap-7">
      {metrics.map((metric) => (
        <CardMetric key={metric.title} {...metric} />
      ))}
    </div>
  );
}
