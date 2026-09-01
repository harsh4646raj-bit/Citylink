import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "accent"
    | "subtle";
  size?: "default" | "sm" | "lg" | "icon" | "pill";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]";

    const variants = {
      default:
        "bg-primary text-primary-foreground shadow-xs hover:bg-primary/95 hover:shadow-sm",
      destructive:
        "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
      outline:
        "border border-input bg-background shadow-xs hover:bg-muted/80 hover:text-foreground",
      secondary:
        "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/90 hover:shadow-sm",
      accent:
        "bg-accent text-accent-foreground shadow-xs hover:bg-accent/90 hover:shadow-sm",
      subtle:
        "bg-muted/70 text-foreground hover:bg-muted font-medium",
      ghost: "hover:bg-muted/70 hover:text-foreground",
      link: "text-primary underline-offset-4 hover:underline p-0 h-auto font-medium",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-lg px-3 text-xs",
      lg: "h-12 rounded-xl px-6 text-base",
      icon: "h-9 w-9 rounded-lg",
      pill: "h-8 rounded-full px-3.5 text-xs",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
