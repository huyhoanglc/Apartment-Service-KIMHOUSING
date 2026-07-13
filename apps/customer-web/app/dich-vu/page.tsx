import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dịch vụ",
};

export default function DichVuPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-white px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold-to">Dịch vụ</p>
      <h1 className="text-2xl font-semibold text-navy">Đang cập nhật</h1>
      <p className="max-w-md text-sm text-navy/60">
        Trang giới thiệu dịch vụ của Kim Housing đang được hoàn thiện, mời quay lại sau.
      </p>
    </div>
  );
}
