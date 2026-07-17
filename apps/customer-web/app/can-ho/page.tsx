import type { Metadata } from "next";
import ComingSoon from "@/app/components/ComingSoon";

export const metadata: Metadata = {
  title: "Căn hộ cho thuê",
};

export default function CanHoPage() {
  return (
    <ComingSoon
      kicker="Căn hộ"
      description="Trang tìm kiếm căn hộ dịch vụ cho thuê của Kim Housing đang được hoàn thiện, mời quay lại sau."
    />
  );
}
