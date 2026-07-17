import type { Metadata } from "next";
import Link from "next/link";
import AbstractPanel from "@/app/components/AbstractPanel";

export const metadata: Metadata = {
  title: "Trách nhiệm xã hội",
  description:
    "Định hướng trách nhiệm xã hội của Kim Housing với khách thuê, đối tác chủ nhà, đội ngũ nhân sự và cộng đồng tại TP.HCM.",
};

const COMMITMENTS = [
  {
    title: "Với Khách Thuê",
    description:
      "Minh bạch thông tin căn hộ, giá thuê và hợp đồng. Không để khách thuê chịu rủi ro từ tin đăng sai lệch hay chi phí phát sinh không rõ ràng.",
    icon: (
      <path
        d="M4 18a6 6 0 0 1 12 0M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Với Đối Tác Chủ Nhà",
    description:
      "Cam kết minh bạch dòng tiền, hỗ trợ pháp lý và vận hành có trách nhiệm khi được chủ nhà tin tưởng giao quản lý căn hộ.",
    icon: (
      <path
        d="M3 17V8l7-4 7 4v9M7 17v-5h6v5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Với Đội Ngũ Nhân Sự",
    description:
      "Xây dựng môi trường làm việc công bằng, đào tạo bài bản và tạo điều kiện phát triển lâu dài cho từng thành viên Kim Housing.",
    icon: (
      <path
        d="M7 17a3 3 0 0 1 6 0M10 10a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Zm-6 7a2.4 2.4 0 0 1 3.6-2.1M16 17a2.4 2.4 0 0 0-3.6-2.1M5.6 8.6a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm8.8 0a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Với Cộng Đồng",
    description:
      "Hướng đến trở thành thương hiệu căn hộ dịch vụ có trách nhiệm tại TP.HCM, đồng hành cùng các hoạt động thiết thực cho cộng đồng nơi Kim Housing hoạt động.",
    icon: (
      <path
        d="M10 18s-6.5-4-6.5-9A4 4 0 0 1 10 6a4 4 0 0 1 6.5 3c0 5-6.5 9-6.5 9Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function TrachNhiemXaHoiPage() {
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
            <span className="font-semibold text-white">Trách nhiệm xã hội</span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl">
          <div className="relative mx-auto -mb-24 max-w-xl rounded-2xl bg-white/95 px-8 py-10 text-center shadow-2xl dark:bg-navy-light/95">
            <h1 className="text-2xl font-bold tracking-wide text-navy uppercase sm:text-3xl dark:text-white">
              Trách Nhiệm Xã Hội
            </h1>
            <p className="mt-3 text-sm text-navy/60 dark:text-white/60">
              Phát triển gắn với trách nhiệm với khách hàng, đối tác và cộng đồng.
            </p>
            <div className="mx-auto mt-3 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gold-to" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold-to" />
              <span className="h-px w-8 bg-gold-to" />
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <AbstractPanel id="csr" data-aos="fade-right" className="aspect-video w-full lg:aspect-4/3" />
          <div data-aos="fade-left">
            <p className="text-xs font-semibold tracking-widest text-gold-to uppercase">Định hướng phát triển</p>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">
              Phát Triển Bền Vững, Có Trách Nhiệm
            </h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">
              Ngay từ những ngày đầu thành lập, Kim Housing xác định trách nhiệm xã hội không phải là hoạt động
              phong trào mà là một phần trong cách vận hành hằng ngày - từ việc minh bạch thông tin cho khách thuê,
              công bằng với đối tác chủ nhà, đến chăm lo cho đội ngũ nhân sự và cộng đồng xung quanh.
            </p>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="bg-navy/3 px-4 py-16 sm:px-6 lg:px-8 dark:bg-white/3">
        <div className="mx-auto max-w-7xl">
          <p data-aos="fade-up" className="text-xs font-semibold tracking-widest text-gold-to uppercase">
            Cam kết
          </p>
          <h2
            data-aos="fade-up"
            className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white"
          >
            Bốn Trụ Cột Trách Nhiệm Của Kim Housing
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {COMMITMENTS.map((item, i) => (
              <div
                key={item.title}
                data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
                className="flex gap-4 rounded-lg border border-navy/10 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:bg-navy"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy dark:bg-white/10 dark:text-white">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
                    {item.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="text-base font-semibold text-navy dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-4 py-16 text-center sm:px-6 lg:px-8 dark:bg-navy">
        <div data-aos="zoom-in" className="mx-auto max-w-2xl">
          <h2 className="text-xl font-semibold text-navy sm:text-2xl dark:text-white">
            Cùng Kim Housing Xây Dựng Cộng Đồng Thuê Nhà Đáng Tin Cậy
          </h2>
          <p className="mt-2 text-sm text-navy/60 dark:text-white/60">
            Nếu bạn có đề xuất hợp tác hoặc góp ý cho định hướng phát triển bền vững của Kim Housing, hãy liên hệ
            với chúng tôi.
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
