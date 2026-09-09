import { AlertTriangle } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function ErrorState({
  title = "Có lỗi xảy ra",
  description,
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50/40 px-6 py-16 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500">
        <AlertTriangle className="h-7 w-7" strokeWidth={1.5} />
      </span>
      <p className="text-sm font-medium text-navy">{title}</p>
      {description && <p className="mt-1.5 max-w-sm text-sm text-navy/50">{description}</p>}
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-5" onClick={onRetry}>
          Thử lại
        </Button>
      )}
    </div>
  );
}
