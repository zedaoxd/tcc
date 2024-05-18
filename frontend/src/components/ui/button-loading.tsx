import { Loader } from "lucide-react";
import { Button, ButtonProps } from "./button";
import Show from "@/lib/show";

type Props = {
  loading: boolean;
  disabled?: boolean;
} & ButtonProps;

export default function ButtonLoading({
  loading,
  children,
  disabled,
  ...rest
}: Props) {
  return (
    <Button disabled={disabled || loading} {...rest}>
      <Show when={loading}>
        <span className="animate-spin mr-1">
          <Loader />
        </span>
      </Show>

      {children}
    </Button>
  );
}
