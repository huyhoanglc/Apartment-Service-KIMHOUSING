import { Skeleton } from "@/app/components/ui/skeleton";

export default function RoomCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-3.5 w-3/5" />
      </div>
    </div>
  );
}
