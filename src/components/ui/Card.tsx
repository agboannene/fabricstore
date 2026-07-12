import { cn } from "@/lib/utils";

interface CardProps {
  variant?: "default" | "elevated" | "bordered" | "flat";
  dashboard?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

const cardVariants: Record<string, string> = {
  default: "border border-border shadow-xs",
  elevated: "shadow-md",
  bordered: "border-[1.5px] border-border",
  flat: "",
};

export function Card({
  variant = "default",
  dashboard = false,
  className,
  children,
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface overflow-hidden",
        dashboard ? "rounded-md" : "rounded-xl",
        cardVariants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div
      className={cn(
        "font-heading text-h3",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardBody({ className, children }: CardBodyProps) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div className={cn("flex items-center justify-end gap-3", className)}>
      {children}
    </div>
  );
}
