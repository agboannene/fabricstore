"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "accent" | "ghost" | "danger" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white border-primary-500 hover:bg-primary-600 hover:border-primary-600 active:bg-primary-700",
  secondary:
    "bg-transparent text-primary-500 border-primary-500 hover:bg-primary-50",
  accent:
    "bg-accent-500 text-neutral-900 border-accent-500 hover:bg-accent-600 hover:border-accent-600",
  ghost:
    "bg-transparent text-primary-500 border-transparent hover:bg-surface-hover",
  danger:
    "bg-error-500 text-white border-error-500 hover:bg-error-600",
  link:
    "bg-transparent text-primary-500 border-none p-0 h-auto hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold leading-none rounded-lg cursor-pointer transition-all duration-150 whitespace-nowrap border-[1.5px]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          loading && "relative text-transparent",
          className
        )}
        {...props}
      >
        {loading && (
          <span className="absolute w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {icon && iconPosition === "left" && !loading && (
          <span className="shrink-0">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && !loading && (
          <span className="shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
