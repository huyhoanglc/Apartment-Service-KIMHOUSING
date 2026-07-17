import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Giá trị cốt lõi",
  description:
    "Minh bạch, tận tâm, chuyên nghiệp và đổi mới - những giá trị cốt lõi dẫn dắt mọi hoạt động của Kim Housing.",
};

const CORE_VALUES = [
  {
    title: "Minh Bạch",
    description:
      "Giá thuê, hình ảnh căn hộ và điều khoản hợp đồng đều rõ ràng, công khai - không phát sinh chi phí ẩn trong suốt quá trình thuê.",
    icon: (
      <path
        d="M10 2v16M4 6h5.5a2.5 2.5 0 0 1 0 5H6a2.5 2.5 0 0 0 0 5h6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Tận Tâm",
    description:
      "Đặt sự hài lòng và trải nghiệm của khách thuê lên hàng đầu trong mọi quyết định, từ tư vấn chọn phòng đến chăm sóc sau khi ký hợp đồng.",
    icon: (
      <path
        d="M10 17s-6.2-3.8-6.2-8.6A3.8 3.8 0 0 1 10 5.7a3.8 3.8 0 0 1 6.2 2.7c0 4.8-6.2 8.6-6.2 8.6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Chuyên Nghiệp",
    description:
      "Quy trình vận hành, tư vấn và ký kết hợp đồng được chuẩn hoá bởi đội ngũ giàu kinh nghiệm trong lĩnh vực bất động sản cho thuê.",
    icon: (
      <path
        d="M4 16V8l6-3.5L16 8v8M8 16v-4h4v4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Đổi Mới",
    description:
      "Không ngừng ứng dụng công nghệ vào quản lý và tìm phòng, giúp hành trình thuê căn hộ dịch vụ trở nên nhanh chóng và thuận tiện hơn.",
    icon: (
      <path
        d="M10 3a5.5 5.5 0 0 0-3 10.1V15h6v-1.9A5.5 5.5 0 0 0 10 3ZM8 17.5h4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Trách Nhiệm",
    description:
      "Cam kết đồng hành lâu dài với khách thuê, đối tác chủ nhà và cộng đồng nơi Kim Housing hoạt động, hướng đến phát triển bền vững.",
    icon: (
      <path
        d="M10 18s-6.5-4-6.5-9A4 4 0 0 1 10 6a4 4 0 0 1 6.5 3c0 5-6.5 9-6.5 9Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Hợp Tác",
    description:
      "Xây dựng mối quan hệ hợp tác cùng có lợi với chủ nhà - minh bạch dòng tiền, tối ưu tỷ lệ lấp đầy và an tâm pháp lý.",
    icon: (
      <path
        d="M6 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 17a4 4 0 0 1 8 0M10 17a4 4 0 0 1 8 0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function GiaTriCotLoiPage() {
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
            <span className="font-semibold text-white">Giá trị cốt lõi</span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl">
          <div className="relative mx-auto -mb-24 max-w-xl rounded-2xl bg-white/95 px-8 py-10 text-center shadow-2xl dark:bg-navy-light/95">
            <h1 className="text-2xl font-bold tracking-wide text-navy uppercase sm:text-3xl dark:text-white">
              Giá Trị Cốt Lõi
            </h1>
            <p className="mt-3 text-sm text-navy/60 dark:text-white/60">
              Những giá trị nền tảng dẫn dắt mọi quyết định và hành động của đội ngũ Kim Housing.
            </p>
            <div className="mx-auto mt-3 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gold-to" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold-to" />
              <span className="h-px w-8 bg-gold-to" />
            </div>
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((value, i) => (
            <div
              key={value.title}
              data-aos="flip-left"
              data-aos-delay={(i % 3) * 100}
              className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to text-navy">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
                  {value.icon}
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy dark:text-white">{value.title}</h3>
              <p className="mt-2 text-sm text-navy/60 dark:text-white/60">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div data-aos="zoom-in" className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase">Cam kết của chúng tôi</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Giá Trị Được Thể Hiện Trong Từng Trải Nghiệm</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">
            Từ lúc tìm phòng đến khi ổn định chỗ ở, Kim Housing luôn giữ vững những giá trị này trong từng điểm
            chạm với khách thuê và đối tác.
          </p>
          <div className="mt-6">
            <Link
              href="/ve-kim"
              className="inline-flex rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-6 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
            >
              Tìm hiểu về Kim Housing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
