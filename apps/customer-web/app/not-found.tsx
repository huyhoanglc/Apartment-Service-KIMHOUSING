import { Compass } from "lucide-react";
import EmptyState from "@/app/components/ui/EmptyState";

export default function NotFound() {
  return (
    <EmptyState
      icon={Compass}
      kicker="404"
      title="Không tìm thấy trang"
      description="Trang hoặc phòng bạn tìm không tồn tại hoặc đã bị gỡ."
      action={{ label: "Về trang chủ", href: "/" }}
    />
  );
}
