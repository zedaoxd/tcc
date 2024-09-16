import { BoughtCourseTable } from "./components/bought-courses-table";
import { CreatedCourseTable } from "./components/created-courses-table";

export const RightColumn = () => {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="mb-4 font-bold text-2xl text-gray-800">
          Bought Courses
        </h2>

        <BoughtCourseTable />
      </div>

      <div>
        <h2 className="mb-4 font-bold text-2xl text-gray-800">
          Created Courses
        </h2>

        <CreatedCourseTable />
      </div>
    </div>
  );
};
