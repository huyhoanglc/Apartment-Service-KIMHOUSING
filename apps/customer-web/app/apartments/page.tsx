import type { Metadata } from "next";
import ComingSoon from "@/app/components/ComingSoon";

export const metadata: Metadata = {
  title: "Căn hộ cho thuê",
};

export default function ApartmentsPage() {
  return (
    <ComingSoon
      kicker="Căn hộ"
      description="Trang tìm kiếm căn hộ dịch vụ cho thuê của Kim Housing đang được hoàn thiện. Liên hệ đội ngũ tư vấn để được giới thiệu căn hộ phù hợp ngay hôm nay."
      action={{ label: "Liên hệ tư vấn", href: "/contact" }}
    />
  );
}
