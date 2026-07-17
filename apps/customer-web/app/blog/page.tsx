import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Chuyên mục tin tức, kinh nghiệm thuê nhà và hướng dẫn thủ tục của Kim Housing.",
};

const CATEGORIES = [
  {
    title: "Kinh Nghiệm Thuê Nhà",
    description: "Mẹo chọn căn hộ phù hợp, so sánh khu vực và tối ưu ngân sách thuê nhà tại TP.HCM.",
    icon: (
      <path
        d="M3 17V8l7-4 7 4v9M7 17v-5h6v5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Tin Tức Kim Housing",
    description: "Cập nhật hoạt động, dự án căn hộ mới và các chương trình ưu đãi từ Kim Housing.",
    icon: (
      <path
        d="M4 5h12v10H8l-4 3V5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Hướng Dẫn Thủ Tục",
    description: "Hướng dẫn đặt cọc, ký hợp đồng và đăng ký tạm trú khi thuê căn hộ dịch vụ.",
    icon: (
      <path
        d="M6 3h6l4 4v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 0v4h4M7.5 11h5M7.5 14h5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function BlogPage() {
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
            <span className="font-semibold text-white">Blog</span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl">
          <div className="relative mx-auto -mb-24 max-w-xl rounded-2xl bg-white/95 px-8 py-10 text-center shadow-2xl dark:bg-navy-light/95">
            <h1 className="text-2xl font-bold tracking-wide text-navy uppercase sm:text-3xl dark:text-white">
              Blog Kim Housing
            </h1>
            <p className="mt-3 text-sm text-navy/60 dark:text-white/60">
              Chuyên mục tin tức, chia sẻ kinh nghiệm thuê nhà đang được đội ngũ Kim Housing hoàn thiện.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p data-aos="fade-up" className="text-xs font-semibold tracking-widest text-gold-to uppercase">
            Sắp ra mắt
          </p>
          <h2
            data-aos="fade-up"
            className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white"
          >
            Các Chuyên Mục Đang Được Chuẩn Bị
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {CATEGORIES.map((category, i) => (
              <div
                key={category.title}
                data-aos="flip-left"
                data-aos-delay={i * 100}
                className="relative rounded-lg border border-navy/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <span className="absolute top-4 right-4 rounded-full bg-navy/5 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-navy/60 uppercase dark:bg-white/10 dark:text-white/60">
                  Sắp ra mắt
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to text-navy">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
                    {category.icon}
                  </svg>
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy dark:text-white">{category.title}</h3>
                <p className="mt-2 text-sm text-navy/60 dark:text-white/60">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <div data-aos="zoom-in" className="mx-auto max-w-2xl">
          <h2 className="text-xl font-semibold sm:text-2xl">Đừng Bỏ Lỡ Bài Viết Đầu Tiên</h2>
          <p className="mt-2 text-sm text-white/70">
            Liên hệ Kim Housing qua hotline hoặc email để được thông báo ngay khi blog chính thức ra mắt.
          </p>
          <Link
            href="/lien-he"
            className="mt-6 inline-flex rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-6 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
          >
            Liên hệ Kim Housing
          </Link>
        </div>
      </section>
    </div>
  );
}
