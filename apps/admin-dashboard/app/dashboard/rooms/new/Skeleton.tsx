export function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-navy/10 ${className}`} />;
}

export default function BuildingCardSkeleton() {
  return (
    <div className="rounded-xl border border-navy/10 bg-white p-5">
      <SkeletonLine className="h-5 w-2/3" />
      <SkeletonLine className="mt-3 h-4 w-1/2" />
      <SkeletonLine className="mt-2 h-4 w-1/3" />
      <div className="mt-4 flex gap-2">
        <SkeletonLine className="h-4 w-20" />
        <SkeletonLine className="h-4 w-24" />
      </div>
      <SkeletonLine className="mt-4 h-4 w-1/2" />
    </div>
  );
}
