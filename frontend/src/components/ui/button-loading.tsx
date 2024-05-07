import { Loader } from "lucide-react";
import { Button } from "./button";
import Show from "@/lib/show";

type Props = {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function ButtonLoading({ loading, children, className }: Props) {
  return (
    <Button className={className} disabled={loading}>
      <Show when={loading}>
        <span className="animate-spin mr-1">
          <Loader />
        </span>
      </Show>

      {children}
    </Button>
  );
}
