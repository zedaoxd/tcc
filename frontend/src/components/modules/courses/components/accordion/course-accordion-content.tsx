"use client";

import { Button } from "@/components/ui/button";
import { MonitorPlay } from "lucide-react";

type Props = {
  title: string;
  preview: boolean;
  duration: number;
};

export const CourseAccordionContent = ({ duration, preview, title }: Props) => {
  return (
    <div className="flex row justify-between items-center p-3 cursor-pointer">
      <div className="flex items-center hover:drop-shadow-xl">
        <MonitorPlay className="w-5 h-6 mr-1" />
        <span className="font-semibold text-base">{title}</span>
      </div>

      <div className="flex items-center space-x-2">
        {preview && (
          <Button
            variant="blue"
            size="min"
            onClick={() => console.log("opem modal")}
          >
            Preview
          </Button>
        )}
        <span>{duration} mins</span>
      </div>
    </div>
  );
};
