import Link from "next/link";
import { Item, SearchParams } from "../..";
import { Rating } from "@smastrom/react-rating";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import Show from "@/lib/show";

type Props = {
  searchParams: SearchParams;
  paramKey: string;
  item: Item;
};

export function Option({ searchParams, paramKey, item }: Props) {
  return (
    <Link
      href={{
        pathname: "/courses",
        query: {
          ...searchParams,
          [paramKey]: "name" in item ? item.id : item.rating,
        },
      }}
      className="flex justify-between items-center"
    >
      <Show when={"name" in item}>
        <Option.RenderName id={(item as any).id} name={(item as any).name} />
      </Show>

      <Show when={"rating" in item}>
        <Option.RenderRating rating={(item as any).rating} />
      </Show>

      <span
        className="text-sm font-medium text-gray-500"
        // TODO: why this warning appears?
        suppressHydrationWarning
      >
        {item.quantity}
      </span>
    </Link>
  );
}

Option.RenderRating = function RenderRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={rating.toString()} id={rating.toString()} />
      <Label htmlFor={rating.toString()} onClick={(e) => e.stopPropagation()}>
        <Rating
          className="cursor-pointer"
          value={rating}
          readOnly
          style={{ maxWidth: 100 }}
        />
      </Label>
    </div>
  );
};

Option.RenderName = function RenderName({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={id} id={id} />
      <Label htmlFor={id} onClick={(e) => e.stopPropagation()}>
        {name}
      </Label>
    </div>
  );
};
