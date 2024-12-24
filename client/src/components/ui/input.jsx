import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      style={{ borderRadius: "8px" }} // Inline style to ensure border radius
      className={cn(
        "flex h-10 w-full rounded-lg border border-gray-300 bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:ring-offset-2 transition-shadow duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
