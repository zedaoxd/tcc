import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  File,
  GraduationCap,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

type Props = {
  instructor: User.Instructor;
};

export default function TabIstructor({ instructor }: Props) {
  return (
    <div className="flex flex-col gap-3 ml-3">
      <div className="grid grid-cols-5">
        <div className="col-span-1">
          <Avatar className="w-40 h-40 object-cover rounded-lg">
            <AvatarImage src={instructor.imageUrl!} alt="@shadcn" />

            <AvatarFallback className="bg-red-400 rounded-lg text-6xl">
              {instructor.firstName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="col-span-4 flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">
              {`${instructor.firstName} ${instructor.lastName}`}
            </h3>

            <p>{instructor.description || "No description provided."}</p>
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <span className="flex items-center gap-1">
              <GraduationCap className="h-4 w-4 text-primary" />
              {instructor.quantityStudents} Students
            </span>

            <span className="flex items-center gap-1">
              <File className="h-4 w-4 text-primary" />
              {instructor.quantityLessons} Lessons
            </span>
          </div>
        </div>
      </div>

      <p className="flex items-center gap-1 text-lg">
        Follow:
        <Button variant="none" size="icon">
          <Facebook className="h-5 w-5" />
        </Button>
        <Button variant="none" size="icon">
          <Twitter className="h-5 w-5" />
        </Button>
        <Button variant="none" size="icon">
          <Instagram className="h-5 w-5" />
        </Button>
        <Button variant="none" size="icon">
          <Youtube className="h-5 w-5" />
        </Button>
      </p>
    </div>
  );
}
