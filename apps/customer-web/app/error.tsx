"use client";

import { useEffect } from "react";
import { RefreshCw, TriangleAlert } from "lucide-react";
import Button from "@/app/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-white px-4 py-24 text-center dark:bg-navy">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-gold-from/25 via-gold-via/25 to-gold-to/25 text-gold-to">
        <TriangleAlert size={28} strokeWidth={1.5} />
      </span>
      <h1 className="text-2xl font-semibold text-navy dark:text-white">Đã có lỗi xảy ra</h1>
      <p className="max-w-md text-sm text-navy/60 dark:text-white/60">
        Nội dung này đang gặp sự cố hiển thị. Bạn thử tải lại phần này xem sao nhé.
      </p>
      <Button onClick={reset} icon={<RefreshCw size={16} strokeWidth={2} />} className="mt-2">
        Thử lại
      </Button>
    </div>
  );
}
