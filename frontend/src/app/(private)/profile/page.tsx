import { LeftColumn } from "@/components/modules/profile/left-column";
import { RightColumn } from "@/components/modules/profile/right-column";

export default function Profile() {
  return (
    <div className="gap-5 grid grid-cols-4 w-full">
      <div className="col-span-1 shadow-lg p-4">
        <div className="flex flex-col items-center gap-3 h-full">
          <LeftColumn />
        </div>
      </div>

      <div className="col-span-3">
        <RightColumn />
      </div>
    </div>
  );
}
