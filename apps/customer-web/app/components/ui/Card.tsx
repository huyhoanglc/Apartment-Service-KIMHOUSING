import type { ElementType, ReactNode } from "react";
import { cn } from "@/app/lib/cn";

interface CardProps {
  as?: ElementType;
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

const PADDING = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export default function Card({
  as: Component = "div",
  hoverable = false,
  padding = "md",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Component
      className={cn(
        // "block" bắt buộc: khi as="a"/as={Link}, thẻ <a> mặc định display:inline, phá layout
        // (padding/nội dung tràn ra ngoài lưới grid). Nơi nào cần flex thì tự truyền className
        // "flex ..." đè lên - .flex đứng sau .block trong CSS build ra nên vẫn thắng đúng ý.
        "block rounded-card border border-navy/10 bg-white shadow-soft dark:border-white/10 dark:bg-white/5",
        "transition-all duration-300 ease-[var(--ease-premium)]",
        hoverable && "hover:-translate-y-1 hover:shadow-soft-md",
        PADDING[padding],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
