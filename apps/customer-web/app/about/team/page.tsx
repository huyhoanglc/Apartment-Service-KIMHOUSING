import type { Metadata } from "next";
import AbstractPanel from "@/app/components/AbstractPanel";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Badge from "@/app/components/ui/Badge";
import Reveal from "@/app/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Đội ngũ nhân sự",
  description:
    "Đội ngũ sáng lập và hơn 30 nhân sự cốt lõi của Kim Housing - nhiều năm kinh nghiệm trong lĩnh vực sale căn hộ dịch vụ tại TP. Hồ Chí Minh.",
};

export default function DoiNguNhanSuPage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero breadcrumb="Đội ngũ nhân sự" title="Đội Ngũ Nhân Sự" />

      {/* Đội ngũ sáng lập */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <AbstractPanel id="founders" className="aspect-video w-full lg:aspect-4/3" />
          </Reveal>
          <Reveal direction="left">
            <Badge variant="eyebrow">Sáng lập</Badge>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">
              Được Dẫn Dắt Bởi Đội Ngũ Giàu Kinh Nghiệm
            </h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">
              Kim Housing được thành lập bởi đội ngũ sáng lập nhiều năm kinh nghiệm trong lĩnh vực bất động sản
              cho thuê, cùng chung định hướng xây dựng một thương hiệu căn hộ dịch vụ minh bạch, tận tâm và
              chuyên nghiệp tại TP. Hồ Chí Minh.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Đội ngũ cốt lõi */}
      <Section tone="navy">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right" className="order-2 lg:order-1">
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">Đội ngũ cốt lõi</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">30+ Nhân Sự Giàu Kinh Nghiệm</h2>
            <p className="mt-4 text-sm text-white/70 sm:text-base">
              Bên cạnh đội ngũ sáng lập, Kim Housing quy tụ hơn 30 nhân sự cốt lõi, nhiều năm kinh nghiệm trong
              lĩnh vực sale căn hộ dịch vụ tại khu vực TP. Hồ Chí Minh. Am hiểu thị trường và từng khu vực cho
              thuê, đội ngũ Kim Housing luôn sẵn sàng tư vấn và đồng hành cùng khách thuê để tìm được căn hộ phù
              hợp nhất.
            </p>
          </Reveal>
          <Reveal direction="left" className="order-1 lg:order-2">
            <AbstractPanel id="core-team" className="aspect-video w-full lg:aspect-4/3" />
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
