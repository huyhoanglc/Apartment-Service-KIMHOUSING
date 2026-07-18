import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/app/lib/cn";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- xem giải thích trong createElement bên dưới
type CardTag = ElementType<any>;

interface CardProps {
  as?: CardTag;
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
  // Dùng createElement thay vì cú pháp JSX <Component> - khi "as" là ElementType động, JSX
  // suy luận children type dựa trên toàn bộ JSX.IntrinsicElements (bị @react-three/fiber mở
  // rộng thêm các thẻ mesh/group... không cho children tự do), gây lỗi type sai. createElement
  // gọi hàm bình thường, không đi qua bước suy luận đặc thù đó.
  return createElement(
    Component,
    {
      className: cn(
        // "block" bắt buộc: khi as="a"/as={Link}, thẻ <a> mặc định display:inline, phá layout
        // (padding/nội dung tràn ra ngoài lưới grid). Nơi nào cần flex thì tự truyền className
        // "flex ..." đè lên - .flex đứng sau .block trong CSS build ra nên vẫn thắng đúng ý.
        "block rounded-card border border-navy/10 bg-white shadow-soft dark:border-white/10 dark:bg-white/5",
        "transition-all duration-300 ease-[var(--ease-premium)]",
        hoverable && "hover:-translate-y-1 hover:shadow-soft-md",
        PADDING[padding],
        className
      ),
      ...rest,
    },
    children
  );
}
