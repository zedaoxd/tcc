type CardMetricProps = {
  title: string;
  description: string;
};

export default function CardMetric({ title, description }: CardMetricProps) {
  return (
    <div className="bg-gray-100 flex flex-col gap-4 items-center justify-center py-12 rounded-xl">
      <h4 className="font-semibold text-3xl text-primary">{title}</h4>

      <p className="text-lg font-medium">{description}</p>
    </div>
  );
}
