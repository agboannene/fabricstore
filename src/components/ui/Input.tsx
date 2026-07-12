"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  dashboard?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, dashboard, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "font-medium text-neutral-800",
              dashboard ? "text-xs" : "text-sm"
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            "font-body border-[1.5px] border-border rounded-lg bg-surface text-neutral-900 transition-all duration-150 outline-none w-full placeholder:text-neutral-400",
            "focus:border-border-focus focus:shadow-[0_0_0_3px_rgba(26,35,126,0.12)]",
            "hover:border-primary-300",
            "disabled:bg-surface-hover disabled:opacity-40 disabled:cursor-not-allowed",
            error && "border-error-500 focus:shadow-[0_0_0_3px_rgba(198,40,40,0.12)]",
            dashboard ? "h-8 px-3 text-sm rounded-md" : "h-10 px-3 text-base rounded-lg",
            props.type === "search" && "pl-9",
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-xs text-error-500" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-xs text-neutral-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
