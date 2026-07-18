import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";

type BadgeVariant = "eyebrow" | "chip" | "solid" | "outline";

const VARIANTS: Record<BadgeVariant, string> = {
  eyebrow: "text-xs font-semibold tracking-widest text-gold-to uppercase",
  chip: "rounded-full bg-navy/5 px-2.5 py-1 text-xs text-navy/70 dark:bg-white/10 dark:text-white/70",
  solid:
    "rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-3 py-1 text-xs font-semibold text-navy",
  outline:
    "rounded-full border border-navy/15 px-3 py-1 text-xs font-medium text-navy dark:border-white/15 dark:text-white",
};

export default function Badge({
  variant = "chip",
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children?: ReactNode;
}) {
  return <span className={cn("inline-flex items-center gap-1", VARIANTS[variant], className)}>{children}</span>;
}
