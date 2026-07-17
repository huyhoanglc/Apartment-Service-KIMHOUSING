import type { Metadata } from "next";
import ComingSoon from "@/app/components/ComingSoon";

export const metadata: Metadata = {
  title: "Liên hệ",
};

export default function LienHePage() {
  return (
    <ComingSoon
      kicker="Liên hệ"
      description="Trang thông tin liên hệ của Kim Housing đang được hoàn thiện, mời quay lại sau."
    />
  );
}
