import type { Metadata } from "next";
import ComingSoon from "@/app/components/ComingSoon";

export const metadata: Metadata = {
  title: "Giá trị cốt lõi",
};

export default function GiaTriCotLoiPage() {
  return (
    <ComingSoon
      kicker="Giá trị cốt lõi"
      description="Trang giá trị cốt lõi của Kim Housing đang được hoàn thiện, mời quay lại sau."
    />
  );
}
