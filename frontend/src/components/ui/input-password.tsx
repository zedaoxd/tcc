import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    function toggleShowPassword() {
      setShowPassword((prev) => !prev);
    }

    return (
      <div className="border rounded-md border-input outline-2 outline-black focus-within:outline flex items-center pr-1">
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />

        {showPassword ? (
          <EyeOff
            className="cursor-pointer text-gray-400"
            onClick={toggleShowPassword}
          />
        ) : (
          <Eye
            className="cursor-pointer text-gray-400"
            onClick={toggleShowPassword}
          />
        )}
      </div>
    );
  }
);
InputPassword.displayName = "InputPassword";

export { InputPassword };
