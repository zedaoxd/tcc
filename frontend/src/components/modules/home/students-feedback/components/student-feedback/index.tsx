import Image from "next/image";
import { Jost } from "next/font/google";
import { cn } from "@/lib/utils";

const jost = Jost({ subsets: ["latin"], weight: ["400"] });

type StudentFeedbackProps = {
  name: string;
  feedback: string;
  profission: string;
};

export default function StudentFeedback({
  feedback,
  name,
  profission,
}: StudentFeedbackProps) {
  return (
    <div className="border rounded-2xl border-gray-100 flex flex-col py-10 px-8 gap-8">
      <Image
        src="/images/quotation-marks.svg"
        alt="quotation marks"
        width={35.5}
        height={29.8}
      />

      <p className={cn(jost.className, "text-lg leading-7 text-black")}>
        {feedback}
      </p>

      <h4 className="text-xl font-semibold leading-6">{name}</h4>

      <p className="text-lg leading-7">{profission}</p>
    </div>
  );
}
