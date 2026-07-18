"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "none";

// Luôn khai báo đủ x/y/scale (không chỉ khai báo trục đang dùng) - initial và whileInView phải
// cùng một bộ khóa transform ngay từ lần render đầu tiên, nếu không Motion sẽ dựng chuỗi CSS
// transform khác nhau giữa server và client, gây hydration mismatch trên toàn bộ trang.
const OFFSETS: Record<RevealDirection, { x: number; y: number; scale: number }> = {
  up: { x: 0, y: 28, scale: 1 },
  down: { x: 0, y: -28, scale: 1 },
  left: { x: 28, y: 0, scale: 1 },
  right: { x: -28, y: 0, scale: 1 },
  scale: { x: 0, y: 0, scale: 0.92 },
  none: { x: 0, y: 0, scale: 1 },
};

interface RevealProps {
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  children?: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Thay thế AOS: reveal-on-scroll dùng motion whileInView (nhẹ hơn AOS, tự tôn trọng
 * prefers-reduced-motion). direction map 1:1 với các giá trị data-aos cũ (fade-up -> "up", ...).
 */
export default function Reveal({
  direction = "up",
  delay = 0,
  duration = 0.6,
  amount = 0.3,
  once = true,
  children,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const offset = OFFSETS[direction];

  if (reduce) {
    return <div {...rest}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
