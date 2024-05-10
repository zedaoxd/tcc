"use client";

import useTopCategories from "./useTopCategories";
import CardCategory from "./components/card-category";
import Section from "@/components/shared/section";
import Show from "@/lib/show";

export default function TopCategories() {
  const { topCategories, isLoading } = useTopCategories();

  return (
    <Section title="Top Categories" subtitle="Explore our Popular Categories">
      <div className="pt-3 grid gap-7 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <Show when={!isLoading}>
          {topCategories.map((category) => (
            <CardCategory key={category.name} {...category} />
          ))}
        </Show>

        <Show when={isLoading}>
          {Array.from({ length: 10 }).map((_, index) => (
            <CardCategory.Skeleton key={index} />
          ))}
        </Show>
      </div>
    </Section>
  );
}
