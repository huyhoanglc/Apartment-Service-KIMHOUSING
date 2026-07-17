import type { Metadata } from "next";
import Link from "next/link";
import AbstractPanel from "@/app/components/AbstractPanel";

export const metadata: Metadata = {
  title: "Thư viện ảnh",
  description: "Album ảnh không gian căn hộ, hoạt động đội ngũ và sự kiện của Kim Housing.",
};

const ALBUMS = [
  { id: "can-ho", label: "Không gian căn hộ", tiles: 6 },
  { id: "doi-ngu", label: "Hoạt động đội ngũ", tiles: 4 },
  { id: "su-kien", label: "Sự kiện & bàn giao", tiles: 4 },
];

export default function ThuVienAnhPage() {
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
            <span className="font-semibold text-white">Thư viện ảnh</span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl">
          <div className="relative mx-auto -mb-24 max-w-xl rounded-2xl bg-white/95 px-8 py-10 text-center shadow-2xl dark:bg-navy-light/95">
            <h1 className="text-2xl font-bold tracking-wide text-navy uppercase sm:text-3xl dark:text-white">
              Thư Viện Ảnh
            </h1>
            <p className="mt-3 text-sm text-navy/60 dark:text-white/60">
              Hình ảnh không gian căn hộ, hoạt động đội ngũ và các sự kiện của Kim Housing sẽ sớm được cập nhật tại
              đây.
            </p>
          </div>
        </div>
      </section>

      {/* Albums */}
      <section className="px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[180px_1fr]">
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-20 lg:h-fit lg:flex-col lg:overflow-visible lg:pb-0">
            {ALBUMS.map((album) => (
              <a
                key={album.id}
                href={`#${album.id}`}
                className="shrink-0 rounded-md border border-navy/10 px-3 py-1.5 text-sm font-medium text-navy/70 transition-colors duration-300 hover:border-gold hover:text-gold-to lg:border-0 lg:border-l-2 lg:border-navy/10 lg:rounded-none lg:px-3 lg:py-2 dark:border-white/10 dark:text-white/70"
              >
                {album.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col">
            {ALBUMS.map((album, i) => (
              <div
                key={album.id}
                id={album.id}
                className={`scroll-mt-24 py-8 ${i > 0 ? "border-t border-navy/10 dark:border-white/10" : ""}`}
              >
                <h2 data-aos="fade-up" className="text-lg font-semibold text-navy dark:text-white">
                  {album.label}
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {Array.from({ length: album.tiles }, (_, idx) => (
                    <AbstractPanel
                      key={idx}
                      id={`${album.id}-${idx}`}
                      data-aos="zoom-in"
                      data-aos-delay={(idx % 3) * 100}
                      className="aspect-square w-full"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
