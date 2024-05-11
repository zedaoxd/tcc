import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Rating } from "@smastrom/react-rating";

type Item =
  | {
      id: string;
      name: string;
      size: number;
    }
  | {
      rating: number;
      size: number;
    };

type SearchParams = { [key: string]: string | string[] | undefined };

type Props = {
  title: string;
  items: Item[];
  searchParams: SearchParams;
  paramKey: string;
  initialChecked?: string;
};

const renderRating = (rating: number) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={rating.toString()} id={rating.toString()} />
      <Label htmlFor={rating.toString()}>
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

const renderName = (id: string, name: string) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={id} id={id} />
      <Label htmlFor={id}>{name}</Label>
    </div>
  );
};

export default function Filter({
  title,
  items,
  searchParams,
  paramKey,
  initialChecked,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-5">
      <h4 className="text-xl font-semibold leading-6 capitalize">{title}</h4>

      <RadioGroup defaultValue={initialChecked}>
        {items.map((item, index) => (
          <Filter.Option
            key={index}
            searchParams={searchParams}
            paramKey={paramKey}
            item={item}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

type FilterOptions = {
  searchParams: SearchParams;
  paramKey: string;
  item: Item;
};

Filter.Option = function FilterOption({
  searchParams,
  paramKey,
  item,
}: FilterOptions) {
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
      {"name" in item
        ? renderName(item.id, item.name)
        : renderRating(item.rating)}

      <span
        className="text-sm font-medium text-gray-500"
        // TODO: why this warning appears?
        suppressHydrationWarning
      >
        {item.size}
      </span>
    </Link>
  );
};
