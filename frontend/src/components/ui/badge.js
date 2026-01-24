import * as React from "react";
import { cn } from "../../lib/utils";

function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-[#E31B23]/10 text-[#E31B23] border-[#E31B23]/20",
    secondary: "bg-[hsl(220,15%,20%)] text-[hsl(210,20%,96%)] border-[hsl(218,16%,22%)]",
    destructive: "bg-red-600/10 text-red-500 border-red-600/20",
    warning: "bg-amber-600/10 text-amber-500 border-amber-600/20"
  };
  
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
