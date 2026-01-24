import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-[0.625rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(358,82%,47%)] disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-emerald-600 text-white hover:bg-emerald-500 active:scale-[0.98]",
    secondary: "bg-[hsl(220,15%,20%)] text-[hsl(210,20%,96%)] hover:bg-[hsl(220,15%,24%)]",
    ghost: "bg-transparent hover:bg-[hsl(220,15%,16%)] text-foreground border border-[hsl(218,16%,22%)]",
    destructive: "bg-[hsl(0,72%,51%)] text-white hover:bg-[hsl(0,72%,45%)]"
  };
  
  const sizes = {
    default: "h-11 px-5",
    sm: "h-9 px-3 text-sm",
    lg: "h-12 px-6 text-lg"
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
