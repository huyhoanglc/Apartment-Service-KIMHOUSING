import { cn } from "@/app/lib/cn";

export default function AbstractPanel({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card border border-navy/10 bg-linear-to-br from-navy via-navy-light to-black/80 shadow-soft-md dark:border-white/10",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-gold-from/10 blur-3xl" />
      {/* Ánh sáng lướt nhẹ liên tục - điểm nhấn motion duy nhất trên panel trang trí này */}
      <div
        className="animate-sweep absolute inset-y-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />
      <div className="relative flex h-full min-h-48 items-center justify-center">
        <svg viewBox="0 0 100 100" className="h-16 w-16 opacity-80" aria-hidden>
          <defs>
            <linearGradient id={`panel-star-${id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fcf6ba" />
              <stop offset="100%" stopColor="#b38728" />
            </linearGradient>
          </defs>
          <path d="M50 2 L58 40 L98 50 L58 60 L50 98 L42 60 L2 50 L42 40 Z" fill={`url(#panel-star-${id})`} />
        </svg>
      </div>
    </div>
  );
}
