import type { Metadata } from "next";
import ComingSoon from "@/app/components/ComingSoon";

export const metadata: Metadata = {
  title: "Đội ngũ nhân sự",
};

export default function DoiNguNhanSuPage() {
  return (
    <ComingSoon
      kicker="Đội ngũ nhân sự"
      description="Trang đội ngũ nhân sự của Kim Housing đang được hoàn thiện, mời quay lại sau."
    />
  );
}
