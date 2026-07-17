import type { Metadata } from "next";
import Link from "next/link";
import AbstractPanel from "@/app/components/AbstractPanel";

export const metadata: Metadata = {
  title: "Dịch vụ",
  description:
    "Hệ sinh thái dịch vụ trọn gói của Kim Housing: tư vấn thuê nhà, quản lý vận hành, chăm sóc khách hàng và hợp tác cùng chủ nhà.",
};

const SERVICES = [
  {
    title: "Tư Vấn Chọn Căn Hộ",
    description:
      "Đội ngũ tư vấn viên lắng nghe nhu cầu, ngân sách và khu vực mong muốn để gợi ý những căn hộ dịch vụ phù hợp nhất, sắp xếp lịch xem phòng thực tế miễn phí.",
    icon: (
      <path
        d="M4 15V6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H8l-4 4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Hỗ Trợ Ký Hợp Đồng",
    description:
      "Chuẩn hoá thủ tục đặt cọc giữ phòng và ký hợp đồng thuê, đảm bảo điều khoản rõ ràng, minh bạch cho cả khách thuê và chủ nhà.",
    icon: (
      <path
        d="M6 3h6l4 4v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 0v4h4M7.5 11h5M7.5 14h5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Quản Lý Vận Hành Căn Hộ",
    description:
      "Thay mặt chủ nhà quản lý, bảo trì và xử lý sự cố phát sinh trong quá trình cho thuê, đảm bảo căn hộ luôn trong tình trạng tốt nhất.",
    icon: (
      <path
        d="M10 3v2m0 10v2m7-7h-2M5 10H3m11.5-5.5-1.4 1.4M6.9 13.1l-1.4 1.4m0-9 1.4 1.4m7.2 7.2 1.4 1.4M13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Chăm Sóc Khách Hàng",
    description:
      "Hỗ trợ khách thuê 24/7 trong suốt thời gian sinh sống tại căn hộ, tiếp nhận và phản hồi mọi yêu cầu trong thời gian sớm nhất.",
    icon: (
      <path
        d="M4 10a6 6 0 0 1 12 0v3a2 2 0 0 1-2 2h-1M4 13v-.5A1.5 1.5 0 0 1 5.5 11h0A1.5 1.5 0 0 1 7 12.5v2A1.5 1.5 0 0 1 5.5 16h0A1.5 1.5 0 0 1 4 14.5V13Zm12 0v-.5a1.5 1.5 0 0 0-1.5-1.5h0a1.5 1.5 0 0 0-1.5 1.5v2a1.5 1.5 0 0 0 1.5 1.5h0a1.5 1.5 0 0 0 1.5-1.5V13Zm-5 5h-1a2 2 0 0 1-2-2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Hợp Tác Cùng Chủ Nhà",
    description:
      "Nhận uỷ thác quản lý và cho thuê căn hộ, cam kết minh bạch dòng tiền, tối ưu tỷ lệ lấp đầy và hỗ trợ pháp lý trong suốt quá trình hợp tác.",
    icon: (
      <path
        d="M3 17V8l7-4 7 4v9M7 17v-5h6v5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Hỗ Trợ Thủ Tục Cư Trú",
    description:
      "Hướng dẫn và hỗ trợ khách thuê hoàn tất thủ tục đăng ký tạm trú, tạm vắng với cơ quan chức năng theo đúng quy định pháp luật.",
    icon: (
      <path
        d="M10 2 12.5 7l5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9L7.5 7 10 2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const PROCESS = [
  { step: "1", title: "Tiếp nhận nhu cầu", description: "Khách thuê hoặc chủ nhà liên hệ Kim Housing qua hotline, website." },
  { step: "2", title: "Tư vấn & khảo sát", description: "Tư vấn viên đề xuất giải pháp phù hợp, sắp xếp lịch xem căn hộ hoặc khảo sát." },
  { step: "3", title: "Ký kết hợp đồng", description: "Hoàn tất thủ tục đặt cọc, ký hợp đồng minh bạch, rõ ràng." },
  { step: "4", title: "Đồng hành dài hạn", description: "Kim Housing tiếp tục hỗ trợ, chăm sóc trong suốt thời gian thuê." },
];

export default function DichVuPage() {
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
            <span className="font-semibold text-white">Dịch vụ</span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl">
          <div className="relative mx-auto -mb-24 max-w-xl rounded-2xl bg-white/95 px-8 py-10 text-center shadow-2xl dark:bg-navy-light/95">
            <h1 className="text-2xl font-bold tracking-wide text-navy uppercase sm:text-3xl dark:text-white">
              Dịch Vụ Của Kim Housing
            </h1>
            <p className="mt-3 text-sm text-navy/60 dark:text-white/60">
              Hệ sinh thái dịch vụ trọn gói, đồng hành cùng khách thuê và chủ nhà xuyên suốt hành trình thuê căn hộ.
            </p>
            <div className="mx-auto mt-3 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gold-to" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold-to" />
              <span className="h-px w-8 bg-gold-to" />
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              data-aos="fade-up"
              data-aos-delay={(i % 3) * 100}
              className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to text-navy">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
                  {service.icon}
                </svg>
              </span>
              <h3 className="mt-4 text-base font-semibold text-navy dark:text-white">{service.title}</h3>
              <p className="mt-2 text-sm text-navy/60 dark:text-white/60">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quy trình + hình ảnh */}
      <section className="bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div data-aos="fade-right">
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">Quy trình phối hợp</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Đơn Giản, Rõ Ràng Từng Bước</h2>
            <div className="mt-6 space-y-5">
              {PROCESS.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-gold">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-0.5 text-sm text-white/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AbstractPanel id="dich-vu" data-aos="fade-left" className="aspect-video w-full lg:aspect-4/3" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-4 py-16 text-center sm:px-6 lg:px-8 dark:bg-navy">
        <div data-aos="zoom-in" className="mx-auto max-w-2xl">
          <h2 className="text-xl font-semibold text-navy sm:text-2xl dark:text-white">
            Cần Tư Vấn Dịch Vụ Phù Hợp?
          </h2>
          <p className="mt-2 text-sm text-navy/60 dark:text-white/60">
            Dù bạn là khách thuê đang tìm căn hộ hay chủ nhà muốn hợp tác cho thuê, Kim Housing luôn sẵn sàng hỗ trợ.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/can-ho"
              className="inline-flex rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-6 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
            >
              Tìm căn hộ ngay
            </Link>
            <Link
              href="/lien-he"
              className="inline-flex rounded-full border border-navy/15 px-6 py-2.5 text-sm font-semibold text-navy transition-colors duration-300 hover:border-gold hover:text-gold-to dark:border-white/15 dark:text-white"
            >
              Liên hệ hợp tác
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
