"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative flex border border-primary rounded-full overflow-hidden">
      <input
        className={cn(
          "transition-all duration-500 ease-in-out outline-none bg-transparent",
          isOpen ? "w-52 pl-2" : "w-0 pl-0"
        )}
        type="text"
        placeholder="Search..."
      />

      <Button variant="none" size="auto" onClick={onToggle}>
        <SearchIcon className="h-6 w-6 text-primary " />
      </Button>
    </div>
  );
}
