import type { Metadata } from "next";
import ComingSoon from "@/app/components/ComingSoon";

export const metadata: Metadata = {
  title: "Dịch vụ",
};

export default function DichVuPage() {
  return (
    <ComingSoon
      kicker="Dịch vụ"
      description="Trang giới thiệu dịch vụ của Kim Housing đang được hoàn thiện, mời quay lại sau."
    />
  );
}
