import Image from "next/image";
import Link from "next/link";

const COMPANY_LINKS = [
  { href: "/#tam-nhin", label: "Tầm nhìn - Giá trị cốt lõi" },
  { href: "/lich-su", label: "Lịch sử hình thành" },
  { href: "/#he-sinh-thai", label: "Hệ sinh thái dịch vụ" },
  { href: "/#chu-nha", label: "Hợp tác chủ nhà" },
  { href: "/lien-he", label: "Liên hệ" },
  { href: "/chinh-sach-bao-mat", label: "Chính sách bảo mật" },
];

const SERVICE_LINKS = [
  { href: "/can-ho", label: "Căn hộ dịch vụ cho thuê" },
  { href: "/dich-vu", label: "Tư vấn thuê nhà" },
  { href: "/dich-vu", label: "Quản lý vận hành" },
  { href: "/dich-vu", label: "Chăm sóc khách hàng" },
];

function SocialIcon({ path }: { path: string }) {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-gold/20 hover:text-gold">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d={path} />
      </svg>
    </span>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[7fr_3fr] lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <Image
              src="/Logo_navbar.png"
              alt="Kim Housing"
              width={468}
              height={196}
              className="h-10 w-auto object-contain"
            />
            <p className="mt-4 text-sm font-semibold text-white">CÔNG TY CỔ PHẦN KIM HOUSING</p>
            <p className="mt-1 text-sm text-white/60">Thành lập ngày 01/01/2026</p>
            <p className="mt-3 text-sm text-white/60">Địa chỉ: 14/5A5 Kỳ Đồng, Phường Nhiêu Lộc, TP. Hồ Chí Minh</p>
            <p className="text-sm text-white/60">Hotline: 0394-008-700</p>
            <p className="text-sm text-white/60">Email: info@kimhousing.vn</p>
            <div className="mt-4 flex gap-2">
              <SocialIcon path="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
              <SocialIcon path="M12 2.2c-5.4 0-9.8 4.4-9.8 9.8 0 4.9 3.6 8.9 8.2 9.7v-6.9H8v-2.8h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5v1.7h2.6l-.4 2.8h-2.2v6.9c4.6-.8 8.2-4.8 8.2-9.7 0-5.4-4.4-9.8-9.8-9.8Z" />
              <SocialIcon path="M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.5.5.7.3 1.2.6 1.8 1.2.6.6.9 1.1 1.2 1.8.3.7.5 1.4.5 2.5.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.5 2.5-.3.7-.6 1.2-1.2 1.8-.6.6-1.1.9-1.8 1.2-.7.3-1.4.5-2.5.5-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.5-.5-.7-.3-1.2-.6-1.8-1.2-.6-.6-.9-1.1-1.2-1.8-.3-.7-.5-1.4-.5-2.5C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.5-2.5.3-.7.6-1.2 1.2-1.8.6-.6 1.1-.9 1.8-1.2.7-.3 1.4-.5 2.5-.5C8.9 2 9.3 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-white uppercase">Kim Housing</p>
            <ul className="mt-4 space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-white uppercase">Dịch vụ</p>
            <ul className="mt-4 space-y-2">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="min-h-55 overflow-hidden rounded-lg border border-white/10 lg:min-h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3570711312486!2d106.67911157583852!3d10.783940059053496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f294e460b1d%3A0x2c1d653af8180d80!2zMTQvNUE1IMSQLiBL4buzIMSQ4buTbmcsIE5oacOqdSBM4buZYywgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1784301028086!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 220 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Vị trí Kim Housing trên Google Maps"
          />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Copyright © {year} Kim Housing. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <p>Thiết kế &amp; vận hành bởi Kim Housing</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=14/5A5+K%E1%BB%B3+%C4%90%E1%BB%93ng+Ph%C6%B0%E1%BB%9Dng+Nhi%C3%AAu+L%E1%BB%99c+TP+H%E1%BB%93+Ch%C3%AD+Minh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Xem trên Google Maps"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-gold/20 hover:text-gold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.5 7.3 11.8.2.1.4.2.7.2s.5-.1.7-.2C13 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8Zm0 10.8a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
