import type { Metadata } from "next";
import ComingSoon from "@/app/components/ComingSoon";

export const metadata: Metadata = {
  title: "Trách nhiệm xã hội",
};

export default function TrachNhiemXaHoiPage() {
  return (
    <ComingSoon
      kicker="Trách nhiệm xã hội"
      description="Trang trách nhiệm xã hội của Kim Housing đang được hoàn thiện, mời quay lại sau."
    />
  );
}
