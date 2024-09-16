import priceToTsx from "@/components/shared/priceToTsx";
import { cn } from "@/lib/utils";
import { Jost } from "next/font/google";
import Image from "next/image";

const jost = Jost({ subsets: ["latin"], weight: ["400"] });

type Props = {
  price: number;
  discount: number;
  thumbnail: string;
  title: string;
  className?: string;
};

export const CardCourseCheckout = ({
  price,
  discount,
  thumbnail,
  title,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border overflow-hidden lg:rounded-3xl",
        className
      )}
    >
      <div className="w-full h-40 relative">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="100%"
          className="object-cover"
        />
      </div>

      <div className="w-full p-5 flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-black">{title}</h3>

        <div className="flex justify-between items-center">
          <p className={cn(jost.className, "text-sm text-gray-500")}>
            {priceToTsx(price, discount)}
          </p>
        </div>
      </div>
    </div>
  );
};
