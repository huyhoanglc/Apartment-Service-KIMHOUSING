import type { LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/cn";

type IconBadgeTone = "gold" | "neutral";
type IconBadgeSize = "sm" | "md" | "lg";

const SIZES: Record<IconBadgeSize, { wrapper: string; icon: number }> = {
  sm: { wrapper: "h-10 w-10", icon: 18 },
  md: { wrapper: "h-11 w-11", icon: 20 },
  lg: { wrapper: "h-12 w-12", icon: 22 },
};

const TONES: Record<IconBadgeTone, string> = {
  gold: "bg-linear-to-r from-gold-from via-gold-via to-gold-to text-navy",
  neutral: "bg-navy/5 text-navy dark:bg-white/10 dark:text-white",
};

export default function IconBadge({
  icon: Icon,
  tone = "gold",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: IconBadgeTone;
  size?: IconBadgeSize;
  className?: string;
}) {
  const { wrapper, icon } = SIZES[size];
  return (
    <span className={cn("flex shrink-0 items-center justify-center rounded-full", wrapper, TONES[tone], className)}>
      <Icon size={icon} strokeWidth={1.75} />
    </span>
  );
}
