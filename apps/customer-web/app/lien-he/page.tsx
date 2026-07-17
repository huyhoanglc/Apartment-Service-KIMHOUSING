import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ Kim Housing để được tư vấn thuê căn hộ dịch vụ hoặc hợp tác cho thuê tại TP.HCM.",
};

const CONTACT_INFO = [
  {
    title: "Địa chỉ",
    value: "14/5A5 Đường Kỳ Đồng, Phường Nhiêu Lộc, TP. Hồ Chí Minh",
    icon: (
      <path
        d="M10 18s-6.5-4-6.5-9A4 4 0 0 1 10 6a4 4 0 0 1 6.5 3c0 5-6.5 9-6.5 9Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Hotline",
    value: "0394-008-700",
    href: "tel:0394008700",
    icon: (
      <path
        d="M5 4h3l1.5 4L7 9.5a10 10 0 0 0 4.5 4.5L13 12.5l4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C9.7 18 3 11.3 3 5.6A1.5 1.5 0 0 1 5 4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Email",
    value: "info@kimhousing.vn",
    href: "mailto:info@kimhousing.vn",
    icon: (
      <path
        d="M4 5h12v10H4V5Zm0 0 6 5 6-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Giờ làm việc",
    value: "8:00 - 18:00, Thứ Hai - Chủ Nhật",
    icon: (
      <path
        d="M10 5.5V10l3 2M18 10a8 8 0 1 1-8-8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function LienHePage() {
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
            <span className="font-semibold text-white">Liên hệ</span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl">
          <div className="relative mx-auto -mb-24 max-w-xl rounded-2xl bg-white/95 px-8 py-10 text-center shadow-2xl dark:bg-navy-light/95">
            <h1 className="text-2xl font-bold tracking-wide text-navy uppercase sm:text-3xl dark:text-white">
              Liên Hệ Kim Housing
            </h1>
            <p className="mt-3 text-sm text-navy/60 dark:text-white/60">
              Đội ngũ tư vấn Kim Housing luôn sẵn sàng hỗ trợ bạn tìm căn hộ phù hợp hoặc hợp tác cho thuê.
            </p>
          </div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="px-4 pt-32 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_INFO.map((item, i) => {
            const content = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to text-navy">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
                    {item.icon}
                  </svg>
                </span>
                <p className="mt-4 text-sm font-semibold text-navy dark:text-white">{item.title}</p>
                <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{item.value}</p>
              </>
            );
            return item.href ? (
              <a
                key={item.title}
                href={item.href}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
                className="rounded-lg border border-navy/10 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/5"
              >
                {content}
              </a>
            ) : (
              <div
                key={item.title}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
                className="rounded-lg border border-navy/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                {content}
              </div>
            );
          })}
        </div>
      </section>

      {/* Form + map */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2">
          <div data-aos="fade-right">
            <h2 className="text-lg font-semibold text-navy dark:text-white">Gửi tin nhắn cho chúng tôi</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 border-t border-navy/10 pt-4 sm:grid-cols-2 dark:border-white/10">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1 block text-xs font-medium text-navy/70 dark:text-white/70"
                >
                  Họ và tên
                </label>
                <input
                  id="contact-name"
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold dark:border-white/15 dark:bg-white/5 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-1 block text-xs font-medium text-navy/70 dark:text-white/70"
                >
                  Số điện thoại
                </label>
                <input
                  id="contact-phone"
                  placeholder="0912 345 678"
                  className="w-full rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold dark:border-white/15 dark:bg-white/5 dark:text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="contact-email"
                  className="mb-1 block text-xs font-medium text-navy/70 dark:text-white/70"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="example@email.com"
                  className="w-full rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold dark:border-white/15 dark:bg-white/5 dark:text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="contact-message"
                  className="mb-1 block text-xs font-medium text-navy/70 dark:text-white/70"
                >
                  Nội dung
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Bạn cần hỗ trợ điều gì?"
                  className="w-full rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold dark:border-white/15 dark:bg-white/5 dark:text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="button"
                  className="rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-6 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
                >
                  Gửi ngay
                </button>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="overflow-hidden rounded-lg border border-navy/10 dark:border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3570711312486!2d106.67911157583852!3d10.783940059053496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f294e460b1d%3A0x2c1d653af8180d80!2zMTQvNUE1IMSQLiBL4buzIMSQ4buTbmcsIE5oacOqdSBM4buZYywgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1784301028086!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 360 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vị trí Kim Housing trên Google Maps"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
