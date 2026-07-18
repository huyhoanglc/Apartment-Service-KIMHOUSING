import { cn } from "@/app/lib/cn";

type SpinnerSize = "sm" | "md" | "lg";
type SpinnerTone = "brand" | "current" | "white";

const SIZES: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-7 w-7 border-2",
  lg: "h-10 w-10 border-[3px]",
};

const TONES: Record<SpinnerTone, string> = {
  brand: "border-navy/15 border-t-gold-to dark:border-white/15 dark:border-t-gold",
  current: "border-current/25 border-t-current",
  white: "border-white/25 border-t-white",
};

export default function Spinner({
  size = "md",
  tone = "brand",
  className,
  label = "Đang tải",
}: {
  size?: SpinnerSize;
  tone?: SpinnerTone;
  className?: string;
  label?: string;
}) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("inline-block animate-spin rounded-full", SIZES[size], TONES[tone], className)}
    />
  );
}
