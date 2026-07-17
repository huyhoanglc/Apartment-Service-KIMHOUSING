import type { Metadata } from "next";
import Link from "next/link";
import AbstractPanel from "@/app/components/AbstractPanel";

export const metadata: Metadata = {
  title: "Tuyển dụng",
  description:
    "Cơ hội nghề nghiệp tại Kim Housing - môi trường làm việc năng động, chế độ đãi ngộ cạnh tranh cho các vị trí tư vấn, kinh doanh và vận hành.",
};

const BENEFITS = [
  {
    title: "Lương Thưởng Cạnh Tranh",
    description: "Thu nhập xứng đáng với năng lực, cùng chính sách thưởng theo hiệu quả công việc.",
    icon: (
      <path
        d="M10 2v16M4 6h5.5a2.5 2.5 0 0 1 0 5H6a2.5 2.5 0 0 0 0 5h6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Môi Trường Trẻ, Năng Động",
    description: "Làm việc cùng đội ngũ nhiệt huyết, văn hoá cởi mở và luôn hỗ trợ lẫn nhau.",
    icon: (
      <path
        d="M7 17a3 3 0 0 1 6 0M10 10a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Zm-6 7a2.4 2.4 0 0 1 3.6-2.1M16 17a2.4 2.4 0 0 0-3.6-2.1M5.6 8.6a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm8.8 0a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Đào Tạo Bài Bản",
    description: "Được đào tạo quy trình tư vấn, vận hành ngay từ ngày đầu, đồng hành cùng đội ngũ giàu kinh nghiệm.",
    icon: (
      <path
        d="M4 16V8l6-3.5L16 8v8M8 16v-4h4v4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Cơ Hội Thăng Tiến",
    description: "Lộ trình phát triển sự nghiệp rõ ràng khi Kim Housing không ngừng mở rộng quy mô hoạt động.",
    icon: (
      <path
        d="M4 15V6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H8l-4 4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function TuyenDungPage() {
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
            <span className="font-semibold text-white">Tuyển dụng</span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl">
          <div className="relative mx-auto -mb-24 max-w-xl rounded-2xl bg-white/95 px-8 py-10 text-center shadow-2xl dark:bg-navy-light/95">
            <h1 className="text-2xl font-bold tracking-wide text-navy uppercase sm:text-3xl dark:text-white">
              Gia Nhập Kim Housing
            </h1>
            <p className="mt-3 text-sm text-navy/60 dark:text-white/60">
              Cùng xây dựng thương hiệu căn hộ dịch vụ minh bạch và tận tâm hàng đầu TP.HCM.
            </p>
          </div>
        </div>
      </section>

      {/* Giới thiệu */}
      <section className="px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <AbstractPanel id="tuyen-dung" data-aos="fade-right" className="aspect-video w-full lg:aspect-4/3" />
          <div data-aos="fade-left">
            <p className="text-xs font-semibold tracking-widest text-gold-to uppercase">Vì sao chọn Kim Housing</p>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">
              Phát Triển Sự Nghiệp Cùng Chúng Tôi
            </h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">
              Kim Housing đang từng bước xây dựng đội ngũ nhân sự vững mạnh cho hành trình phát triển dài hạn. Chúng
              tôi tìm kiếm những con người tận tâm, chủ động và mong muốn gắn bó cùng một thương hiệu căn hộ dịch vụ
              đang lớn mạnh mỗi ngày tại TP.HCM.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-navy/3 px-4 py-16 sm:px-6 lg:px-8 dark:bg-white/3">
        <div className="mx-auto max-w-7xl">
          <p data-aos="fade-up" className="text-xs font-semibold tracking-widest text-gold-to uppercase">
            Quyền lợi
          </p>
          <h2
            data-aos="fade-up"
            className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white"
          >
            Đãi Ngộ Dành Cho Nhân Viên Kim Housing
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit, i) => (
              <div
                key={benefit.title}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
                className="rounded-lg border border-navy/10 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:bg-navy"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to text-navy">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
                    {benefit.icon}
                  </svg>
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy dark:text-white">{benefit.title}</h3>
                <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vị trí tuyển dụng */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div
          data-aos="zoom-in"
          className="mx-auto max-w-3xl rounded-2xl border border-navy/10 bg-white p-10 text-center shadow-sm dark:border-white/10 dark:bg-white/5"
        >
          <p className="text-xs font-semibold tracking-widest text-gold-to uppercase">Vị trí tuyển dụng</p>
          <h2 className="mt-2 text-xl font-semibold text-navy sm:text-2xl dark:text-white">
            Hiện Chưa Có Vị Trí Đang Mở
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-navy/60 dark:text-white/60">
            Kim Housing luôn chào đón những ứng viên tiềm năng cho các vị trí tư vấn viên, chuyên viên kinh doanh và
            vận hành căn hộ. Gửi CV cho chúng tôi để được liên hệ ngay khi có vị trí phù hợp.
          </p>
          <a
            href="mailto:kimhousinghr@gmail.com?subject=Ứng%20tuyển%20vào%20Kim%20Housing"
            className="mt-6 inline-flex rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-6 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
          >
            Gửi CV ứng tuyển
          </a>
          <p className="mt-3 text-xs text-navy/50 dark:text-white/50">kimhousinghr@gmail.com</p>
        </div>
      </section>
    </div>
  );
}
