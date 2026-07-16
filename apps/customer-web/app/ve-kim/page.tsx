import type { Metadata } from "next";
import ComingSoon from "@/app/components/ComingSoon";

export const metadata: Metadata = {
  title: "Về Kim Housing",
};

export default function VeKimPage() {
  return (
    <ComingSoon
      kicker="Về Kim Housing"
      description="Trang giới thiệu về Kim Housing đang được hoàn thiện, mời quay lại sau."
    />
  );
}
