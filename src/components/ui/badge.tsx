import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "accent"
    | "success"
    | "muted";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "border-transparent bg-primary/10 text-primary font-bold hover:bg-primary/15",
    secondary:
      "border-transparent bg-secondary/15 text-secondary font-bold hover:bg-secondary/20",
    accent:
      "border-transparent bg-accent/15 text-amber-900 dark:text-amber-300 font-bold hover:bg-accent/20",
    success:
      "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold hover:bg-emerald-500/20",
    destructive:
      "border-transparent bg-destructive/15 text-destructive font-bold hover:bg-destructive/20",
    muted:
      "border-transparent bg-muted text-muted-foreground font-semibold hover:bg-muted/80",
    outline: "text-foreground border-border/80 bg-background/50 font-semibold",
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
