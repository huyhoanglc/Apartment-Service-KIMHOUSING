import type { Metadata } from "next";
import Link from "next/link";
import AbstractPanel from "@/app/components/AbstractPanel";

export const metadata: Metadata = {
  title: "Đội ngũ nhân sự",
  description:
    "Đội ngũ sáng lập và hơn 30 nhân sự cốt lõi của Kim Housing - nhiều năm kinh nghiệm trong lĩnh vực sale căn hộ dịch vụ tại TP. Hồ Chí Minh.",
};

export default function DoiNguNhanSuPage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      {/* Hero + breadcrumb */}
      <section data-aos="fade-down" className="relative overflow-hidden bg-navy px-4 pt-6 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs text-white/70 backdrop-blur-sm">
            <Link href="/" className="transition-colors duration-300 hover:text-gold">
              Trang chủ
            </Link>
            <span>›</span>
            <span className="font-semibold text-white">Đội ngũ nhân sự</span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl">
          <div className="relative mx-auto -mb-24 max-w-xl rounded-2xl bg-white/95 px-8 py-10 text-center shadow-2xl dark:bg-navy-light/95">
            <h1 className="text-2xl font-bold tracking-wide text-navy uppercase sm:text-3xl dark:text-white">
              Đội Ngũ Nhân Sự
            </h1>
            <div className="mx-auto mt-3 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gold-to" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold-to" />
              <span className="h-px w-8 bg-gold-to" />
            </div>
          </div>
        </div>
      </section>

      {/* Đội ngũ sáng lập */}
      <section className="px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <AbstractPanel id="founders" data-aos="fade-right" className="aspect-video w-full lg:aspect-4/3" />
          <div data-aos="fade-left">
            <p className="text-xs font-semibold tracking-widest text-gold-to uppercase">Sáng lập</p>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">
              Được Dẫn Dắt Bởi Đội Ngũ Giàu Kinh Nghiệm
            </h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">
              Kim Housing được thành lập bởi đội ngũ sáng lập nhiều năm kinh nghiệm trong lĩnh vực bất động sản
              cho thuê, cùng chung định hướng xây dựng một thương hiệu căn hộ dịch vụ minh bạch, tận tâm và
              chuyên nghiệp tại TP. Hồ Chí Minh.
            </p>
          </div>
        </div>
      </section>

      {/* Đội ngũ cốt lõi */}
      <section className="bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div data-aos="fade-right" className="order-2 lg:order-1">
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">Đội ngũ cốt lõi</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">30+ Nhân Sự Giàu Kinh Nghiệm</h2>
            <p className="mt-4 text-sm text-white/70 sm:text-base">
              Bên cạnh đội ngũ sáng lập, Kim Housing quy tụ hơn 30 nhân sự cốt lõi, nhiều năm kinh nghiệm trong
              lĩnh vực sale căn hộ dịch vụ tại khu vực TP. Hồ Chí Minh. Am hiểu thị trường và từng khu vực cho
              thuê, đội ngũ Kim Housing luôn sẵn sàng tư vấn và đồng hành cùng khách thuê để tìm được căn hộ phù
              hợp nhất.
            </p>
          </div>
          <AbstractPanel
            id="core-team"
            data-aos="fade-left"
            className="order-1 aspect-video w-full lg:order-2 lg:aspect-4/3"
          />
        </div>
      </section>
    </div>
  );
}
