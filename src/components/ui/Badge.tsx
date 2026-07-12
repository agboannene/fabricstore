import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "error" | "info" | "neutral" | "brand";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-success-100 text-success-700",
  warning: "bg-warning-100 text-warning-700",
  error: "bg-error-100 text-error-600",
  info: "bg-info-100 text-info-500",
  neutral: "bg-neutral-100 text-neutral-700",
  brand: "bg-primary-100 text-primary-700",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "h-5 px-1.5 text-[10px]",
  md: "h-6 px-2 text-xs",
  lg: "h-7 px-2.5 text-sm",
};

export function Badge({
  variant = "neutral",
  size = "md",
  dot = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium leading-none rounded-full uppercase tracking-wider whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        dot && "before:w-1.5 before:h-1.5 before:rounded-full before:bg-current",
        className
      )}
    >
      {children}
    </span>
  );
}
