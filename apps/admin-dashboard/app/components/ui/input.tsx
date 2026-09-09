import * as React from "react";
import { cn } from "@/app/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-md border border-navy/15 bg-white px-3 py-2 text-sm text-navy outline-none transition-colors duration-200 placeholder:text-navy/35 focus:border-gold disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
