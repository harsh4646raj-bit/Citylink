import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallbackText?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export function Avatar({
  src,
  alt = "",
  fallbackText = "CL",
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  const sizes = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-xl",
    "2xl": "h-20 w-20 text-2xl font-black",
  };

  const initials = fallbackText
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "CL";

  // Generate deterministic subtle gradient based on name string
  const getGradient = (text: string) => {
    const charCode = text.charCodeAt(0) || 0;
    if (charCode % 3 === 0) return "bg-gradient-to-br from-primary/20 to-primary/40 text-primary";
    if (charCode % 3 === 1) return "bg-gradient-to-br from-secondary/25 to-secondary/50 text-secondary";
    return "bg-gradient-to-br from-accent/25 to-accent/50 text-amber-900 dark:text-amber-300";
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full font-bold items-center justify-center border border-border/60 shadow-2xs select-none",
        sizes[size],
        !src || hasError ? getGradient(fallbackText) : "bg-muted",
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
