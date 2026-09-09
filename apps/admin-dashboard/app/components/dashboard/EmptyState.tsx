import type { LucideIcon } from "lucide-react";
import { PackageSearch } from "lucide-react";

export default function EmptyState({
  icon: Icon = PackageSearch,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-navy/15 bg-white px-6 py-16 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy/5 text-navy/30">
        <Icon className="h-7 w-7" strokeWidth={1.5} />
      </span>
      <p className="text-sm font-medium text-navy">{title}</p>
      {description && <p className="mt-1.5 max-w-sm text-sm text-navy/50">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
