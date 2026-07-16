import type { Metadata } from "next";
import ComingSoon from "@/app/components/ComingSoon";

export const metadata: Metadata = {
  title: "Tuyển dụng",
};

export default function TuyenDungPage() {
  return (
    <ComingSoon
      kicker="Tuyển dụng"
      description="Thông tin tuyển dụng của Kim Housing đang được hoàn thiện, mời quay lại sau."
    />
  );
}
