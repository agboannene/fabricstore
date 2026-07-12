"use client";

import { useEffect, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "full";
  dashboard?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const sizeStyles: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  full: "max-w-4xl",
};

export function Modal({
  open,
  onClose,
  title,
  size = "md",
  dashboard = false,
  children,
  footer,
  className,
}: ModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setVisible(false), 200);
      document.body.style.overflow = "";
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[500] flex items-center justify-center p-6",
        open ? "animate-[fadeIn_200ms_ease-out]" : "animate-[fadeOut_200ms_ease-in]"
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="fixed inset-0 bg-[#212121] opacity-50 z-[500]" />
      <div
        className={cn(
          "relative z-[600] bg-surface w-full max-h-[85vh] flex flex-col",
          dashboard ? "rounded-lg" : "rounded-2xl",
          "shadow-[0_25px_50px_rgba(26,35,126,0.18)]",
          open ? "animate-[modalEnter_250ms_ease-out]" : "animate-[fadeOut_200ms_ease-in]",
          sizeStyles[size],
          className
        )}
      >
        {title && (
          <div
            className={cn(
              "flex items-center justify-between shrink-0",
              dashboard ? "p-4" : "p-6 pb-0"
            )}
          >
            <h2
              className={cn(
                "font-semibold text-neutral-900",
                dashboard ? "font-body text-xl" : "font-heading text-h2"
              )}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="bg-none border-none cursor-pointer text-neutral-400 p-2 rounded-lg hover:bg-surface-hover hover:text-neutral-900 transition-all"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 5l10 10M15 5l-10 10" />
              </svg>
            </button>
          </div>
        )}
        <div className={cn("flex-1 overflow-y-auto", dashboard ? "p-4" : "p-6")}>
          {children}
        </div>
        {footer && (
          <div
            className={cn(
              "flex justify-end gap-3 shrink-0 border-t border-border",
              dashboard ? "p-3 px-4" : "p-4 px-6"
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
