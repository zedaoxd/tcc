"use client";

import useTopCategories from "./useTopCategories";
import CardCategory from "./components/card-category";
import Section from "@/components/shared/section";

export default function TopCategories() {
  const { topCategories, ButtonShowAll } = useTopCategories();

  return (
    <Section
      title="Top Categories"
      subtitle="Explore our Popular Categories"
      action={ButtonShowAll}
    >
      <div className="pt-3 grid gap-7 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {topCategories.map((category) => (
          <CardCategory key={category.name} {...category} />
        ))}
      </div>
    </Section>
  );
}
