import type { Metadata } from "next";
import ComingSoon from "@/app/components/ComingSoon";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <ComingSoon
      kicker="Blog"
      description="Chuyên mục tin tức, chia sẻ kinh nghiệm thuê nhà của Kim Housing đang được hoàn thiện, mời quay lại sau."
    />
  );
}
