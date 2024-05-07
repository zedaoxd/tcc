import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function StartNow() {
  return (
    <div className="container">
      <div className="w-full h-64 px-8 bg-gradient-to-r from-blue-100 to-pink-100 rounded-3xl flex flex-col md:flex-row justify-center md:justify-between items-center space-y-5 md:space-x-0">
        <div className="flex items-center gap-8">
          <div className="w-[120px] h-[120px] bg-white rounded-full flex items-center justify-center">
            <Image
              src="/images/student.svg"
              alt="student"
              width={61.1}
              height={72}
            />
          </div>

          <h4 className="text-xl font-semibold leading-6 text-black">
            Let&#39;s Start With BLFLearn
          </h4>
        </div>

        <div className="flex items-center gap-6">
          <Button variant="outline" className="rounded-3xl">
            I&#39;m a student
          </Button>

          <Button className="rounded-3xl">Become an Instructor</Button>
        </div>
      </div>
    </div>
  );
}
