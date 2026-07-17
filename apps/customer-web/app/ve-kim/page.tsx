import type { Metadata } from "next";
import Link from "next/link";
import AbstractPanel from "@/app/components/AbstractPanel";

export const metadata: Metadata = {
  title: "Về Kim Housing",
  description:
    "Kim Housing là thương hiệu căn hộ dịch vụ cho thuê tại TP.HCM, đồng hành cùng khách thuê và chủ nhà bằng sự minh bạch, tận tâm và chuyên nghiệp.",
};

const ABOUT_LINKS = [
  {
    href: "/gia-tri-cot-loi",
    title: "Giá trị cốt lõi",
    description: "Những giá trị nền tảng dẫn dắt mọi hoạt động của Kim Housing.",
    icon: (
      <path
        d="M10 2 12.5 7l5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9L7.5 7 10 2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/#tam-nhin",
    title: "Tầm nhìn chiến lược",
    description: "Định hướng trở thành thương hiệu căn hộ dịch vụ đáng tin cậy hàng đầu.",
    icon: (
      <path
        d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6Zm8 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/lich-su",
    title: "Lịch sử hình thành",
    description: "Hành trình từ ý tưởng đến ngày Kim Housing chính thức ra mắt.",
    icon: (
      <path
        d="M10 5.5V10l3 2M18 10a8 8 0 1 1-8-8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/trach-nhiem-xa-hoi",
    title: "Trách nhiệm xã hội",
    description: "Cam kết phát triển bền vững cùng khách hàng, đối tác và cộng đồng.",
    icon: (
      <path
        d="M10 18s-6.5-4-6.5-9A4 4 0 0 1 10 6a4 4 0 0 1 6.5 3c0 5-6.5 9-6.5 9Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/doi-ngu-nhan-su",
    title: "Đội ngũ nhân sự",
    description: "Đội ngũ sáng lập và hơn 30 nhân sự cốt lõi giàu kinh nghiệm.",
    icon: (
      <path
        d="M7 17a3 3 0 0 1 6 0M10 10a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Zm-6 7a2.4 2.4 0 0 1 3.6-2.1M16 17a2.4 2.4 0 0 0-3.6-2.1M5.6 8.6a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm8.8 0a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const QUICK_FACTS = [
  { label: "Thành lập", value: "01/01/2026" },
  { label: "Nhân sự cốt lõi", value: "30+" },
  { label: "Khu vực hoạt động", value: "TP.HCM" },
  { label: "Loại hình", value: "Căn hộ dịch vụ" },
];

export default function VeKimPage() {
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
            <span className="font-semibold text-white">Về Kim Housing</span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl">
          <div className="relative mx-auto -mb-24 max-w-xl rounded-2xl bg-white/95 px-8 py-10 text-center shadow-2xl dark:bg-navy-light/95">
            <span className="inline-flex items-center rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold text-gold-to uppercase dark:bg-white/10">
              Về Kim Housing
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-wide text-navy uppercase sm:text-3xl dark:text-white">
              Thuê Căn Hộ Minh Bạch Và Dễ Dàng
            </h1>
            <p className="mt-3 text-sm text-navy/60 dark:text-white/60">
              Kim Housing là thương hiệu căn hộ dịch vụ cho thuê tại TP.HCM, kết nối khách thuê với những căn hộ
              đúng như hình ảnh, giá thật, cùng trải nghiệm đặt lịch xem phòng nhanh chóng.
            </p>
          </div>
        </div>
      </section>

      {/* Giới thiệu */}
      <section className="px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div data-aos="fade-right">
            <p className="text-xs font-semibold tracking-widest text-gold-to uppercase">Giới thiệu</p>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">
              Đồng Hành Cùng Bạn Trong Hành Trình An Cư
            </h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">
              Kim Housing chính thức đi vào hoạt động từ ngày 01/01/2026 với mong muốn xây dựng một thương hiệu cho
              thuê căn hộ dịch vụ minh bạch, tận tâm và chuyên nghiệp. Chúng tôi tin rằng một chỗ ở tốt bắt đầu từ
              thông tin trung thực, giá cả rõ ràng và một đội ngũ luôn sẵn sàng đồng hành.
            </p>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">
              Từ tư vấn chọn phòng, hỗ trợ ký hợp đồng đến chăm sóc khách hàng trong suốt thời gian thuê, Kim Housing
              xây dựng hệ sinh thái dịch vụ khép kín để khách thuê an tâm và chủ nhà an tâm giao căn hộ vận hành.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {QUICK_FACTS.map((fact, i) => (
                <div
                  key={fact.label}
                  data-aos="zoom-in"
                  data-aos-delay={i * 80}
                  className="rounded-lg border border-navy/10 bg-white p-4 text-center shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-lg font-bold text-gold-to sm:text-xl">{fact.value}</p>
                  <p className="mt-1 text-xs text-navy/60 dark:text-white/60">{fact.label}</p>
                </div>
              ))}
            </div>
          </div>

          <AbstractPanel id="ve-kim" data-aos="fade-left" className="aspect-video w-full lg:aspect-4/3" />
        </div>
      </section>

      {/* Điều hướng các trang liên quan */}
      <section className="bg-navy/3 px-4 py-16 sm:px-6 lg:px-8 dark:bg-white/3">
        <div className="mx-auto max-w-7xl">
          <p data-aos="fade-up" className="text-xs font-semibold tracking-widest text-gold-to uppercase">
            Tìm hiểu thêm
          </p>
          <h2
            data-aos="fade-up"
            className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white"
          >
            Khám Phá Kim Housing
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT_LINKS.map((item, i) => (
              <Link
                key={item.title}
                href={item.href}
                data-aos="fade-up"
                data-aos-delay={(i % 3) * 100}
                className="group flex flex-col rounded-lg border border-navy/10 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:bg-navy"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to text-navy">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
                    {item.icon}
                  </svg>
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{item.description}</p>
                <span className="mt-3 inline-block text-sm font-medium text-gold-to transition-transform duration-300 group-hover:translate-x-1">
                  Xem thêm →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div data-aos="zoom-in" className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Sẵn Sàng Tìm Căn Hộ Phù Hợp?</h2>
          <p className="mt-2 text-sm text-white/70">
            Khám phá danh mục căn hộ dịch vụ hoặc liên hệ đội ngũ Kim Housing để được tư vấn miễn phí.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/can-ho"
              className="inline-flex rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-6 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
            >
              Tìm phòng ngay
            </Link>
            <Link
              href="/lien-he"
              className="inline-flex rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
