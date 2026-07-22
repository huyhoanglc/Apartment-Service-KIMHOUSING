import type { Metadata } from "next";
import AbstractPanel from "@/app/components/AbstractPanel";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Reveal from "@/app/components/ui/Reveal";
import { pageMetadata } from "@/app/lib/site";

const TITLE = "Lịch sử hình thành";
const DESCRIPTION = "Hành trình hình thành và ra mắt của Kim Housing - thương hiệu căn hộ dịch vụ cho thuê tại TP.HCM.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/about/history" }),
};

const MILESTONES = [
  {
    date: "2026-01",
    title: "KIM HOUSING Chính Thức Ra Mắt",
    description:
      "Sau thời gian chuẩn bị, Kim Housing chính thức đi vào hoạt động từ ngày 01/01/2026, đánh dấu cột mốc ra mắt thương hiệu căn hộ dịch vụ cho thuê tại TP.HCM. Ngay từ ngày đầu, Kim Housing xác định lấy sự minh bạch và trải nghiệm khách thuê làm giá trị cốt lõi cho mọi hoạt động.",
  },
  {
    date: "2025-10",
    title: "Hoàn Thiện Nền Tảng & Đội Ngũ",
    description:
      "Trong những tháng cuối năm 2025, đội ngũ Kim Housing tập trung hoàn thiện quy trình vận hành, xây dựng hệ thống quản lý căn hộ và tuyển chọn nhân sự cho các vị trí tư vấn, chăm sóc khách hàng, sẵn sàng cho ngày ra mắt chính thức.",
  },
  {
    date: "2025-06",
    title: "Xây Dựng Định Hướng Dịch Vụ",
    description:
      "Giữa năm 2025, định hướng dịch vụ của Kim Housing dần được định hình rõ nét: từ mô hình căn hộ dịch vụ cho thuê, tư vấn chọn phòng đến hợp tác cùng chủ nhà - tất cả hướng đến một hệ sinh thái trọn gói cho khách thuê tại TP.HCM.",
  },
  {
    date: "2025-01",
    title: "Hình Thành Ý Tưởng",
    description:
      "Ý tưởng về Kim Housing bắt đầu từ mong muốn xây dựng một thương hiệu cho thuê căn hộ dịch vụ minh bạch, tận tâm và đặt lợi ích của khách thuê lên hàng đầu - điều mà đội ngũ sáng lập nhận thấy vẫn còn nhiều khoảng trống trên thị trường.",
  },
];

export default function LichSuPage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero breadcrumb="Lịch sử hình thành" title="Lịch Sử Hình Thành" />

      {/* Timeline */}
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[160px_1fr]">
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:h-fit lg:flex-col lg:overflow-visible lg:pb-0">
            {MILESTONES.map((m) => (
              <a
                key={m.date}
                href={`#${m.date}`}
                className="shrink-0 rounded-input border border-navy/10 px-3 py-1.5 text-sm font-medium text-navy/70 transition-colors duration-300 hover:border-gold hover:text-gold-to lg:rounded-none lg:border-0 lg:border-l-2 lg:border-navy/10 lg:px-3 lg:py-2 dark:border-white/10 dark:text-white/70"
              >
                {m.date}
              </a>
            ))}
          </nav>

          <div className="flex flex-col">
            {MILESTONES.map((m, i) => (
              <div
                key={m.date}
                id={m.date}
                className={`grid scroll-mt-24 grid-cols-1 gap-6 py-8 sm:grid-cols-[280px_1fr] ${
                  i > 0 ? "border-t border-navy/10 dark:border-white/10" : ""
                }`}
              >
                <Reveal direction="right">
                  <AbstractPanel id={m.date} className="aspect-video w-full" />
                </Reveal>
                <Reveal direction="left">
                  <p className="text-sm font-semibold tracking-wide text-gold-to">{m.date}</p>
                  <h2 className="mt-1 text-lg font-semibold text-navy dark:text-white">{m.title}</h2>
                  <p className="mt-2 text-sm text-navy/60 sm:text-base dark:text-white/60">{m.description}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
