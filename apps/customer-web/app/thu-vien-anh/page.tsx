import type { Metadata } from "next";
import ComingSoon from "@/app/components/ComingSoon";

export const metadata: Metadata = {
  title: "Thư viện ảnh",
};

export default function ThuVienAnhPage() {
  return (
    <ComingSoon
      kicker="Thư viện ảnh"
      description="Album ảnh sự kiện, dự án và hoạt động của Kim Housing đang được hoàn thiện, mời quay lại sau."
    />
  );
}
