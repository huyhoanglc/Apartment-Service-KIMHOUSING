import { Badge } from "@/app/components/ui/badge";
import { ROOM_STATUS_LABEL, type RoomStatus } from "@/app/dashboard/apartments/RoomCard";
import { cn } from "@/app/lib/utils";

const DOT_CLASS: Record<RoomStatus, string> = {
  AVAILABLE: "bg-emerald-500",
  ABOUT_TO_VACATE: "bg-amber-500",
  RENTED: "bg-navy/60",
  HIDDEN: "bg-navy/30",
};

const TEXT_CLASS: Record<RoomStatus, string> = {
  AVAILABLE: "bg-emerald-50 text-emerald-700",
  ABOUT_TO_VACATE: "bg-amber-50 text-amber-700",
  RENTED: "bg-navy/10 text-navy",
  HIDDEN: "bg-navy/5 text-navy/50",
};

export default function StatusBadge({ status, className }: { status: RoomStatus; className?: string }) {
  return (
    <Badge variant="neutral" className={cn(TEXT_CLASS[status], className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", DOT_CLASS[status])} />
      {ROOM_STATUS_LABEL[status]}
    </Badge>
  );
}
