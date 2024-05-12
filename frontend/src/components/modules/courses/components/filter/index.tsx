"use client";

import { RadioGroup } from "@/components/ui/radio-group";
import { Option } from "./components/Option";
import Show from "@/lib/show";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export type Item =
  | {
      id: string;
      name: string;
      quantity: number;
    }
  | {
      rating: number;
      quantity: number;
    };

export type SearchParams = { [key: string]: string | string[] | undefined };

type Props = {
  title: string;
  items: Item[];
  searchParams: SearchParams;
  paramKey: string;
  initialChecked?: string;
  maxOptionsShow?: number;
};

export default function Filter({
  title,
  items,
  searchParams,
  paramKey,
  initialChecked,
  maxOptionsShow = 5,
}: Props) {
  const [showAllOptions, setShowAllOptions] = useState(
    items.length > maxOptionsShow
  );

  const itemsToShow = showAllOptions ? items : items.slice(0, maxOptionsShow);

  return (
    <div className="w-full flex flex-col gap-5 overflow-hidden">
      <h4 className="text-xl font-semibold leading-6 capitalize">{title}</h4>

      <div
        className={`${
          showAllOptions || items.length <= maxOptionsShow ? "h-auto" : "h-40"
        }`}
      >
        <RadioGroup defaultValue={initialChecked}>
          {itemsToShow.map((item, index) => (
            <Option
              item={item}
              paramKey={paramKey}
              searchParams={searchParams}
              key={index}
            />
          ))}
        </RadioGroup>

        <Show when={items.length > maxOptionsShow}>
          <div className="flex justify-center items-center bg-gradient-to-b bg-neutral-100 from-white">
            <Button
              size="auto"
              variant="none"
              onClick={() => setShowAllOptions((prev) => !prev)}
            >
              {showAllOptions ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>
        </Show>
      </div>
    </div>
  );
}
