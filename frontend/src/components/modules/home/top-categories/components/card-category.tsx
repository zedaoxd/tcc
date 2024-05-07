import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  name: string;
  quantity: number;
  slug: string;
};

export default function CardCategory({ icon, name, quantity, slug }: Props) {
  return (
    <Link
      href={`/category/${slug}`}
      className="border border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-6 py-10 relative transition-transform transform-gpu hover:-translate-y-3 hover:shadow-lg"
    >
      <div className="text-primary">{icon}</div>

      <div className="text-center">
        <h3 className="text-xl font-semibold">{name}</h3>

        <p className="text-sm text-gray-500">{quantity} Courses</p>
      </div>
    </Link>
  );
}
