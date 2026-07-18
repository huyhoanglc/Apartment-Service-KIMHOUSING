import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/app/components/ui/Section";

/**
 * Hero breadcrumb dùng chung cho mọi trang con (không phải trang chủ) - card trắng nổi
 * (shadow-soft-lg) trên nền navy. Section nội dung tiếp theo chỉ cần dùng <Section> bình
 * thường - không còn cần tự tính padding bù trừ như bản cũ (khớp -mb-24/pt-32 rải rác từng trang).
 */
export default function PageHero({
  breadcrumb,
  title,
  description,
  children,
}: {
  breadcrumb: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy px-4 pt-6 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <Container>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs text-white/70 backdrop-blur-sm">
          <Link href="/" className="transition-colors duration-300 hover:text-gold">
            Trang chủ
          </Link>
          <span>›</span>
          <span className="font-semibold text-white">{breadcrumb}</span>
        </div>
      </Container>

      <Container className="mt-10 sm:mt-14">
        <div className="relative mx-auto max-w-xl rounded-card bg-white/95 px-8 py-10 text-center shadow-soft-lg dark:bg-navy-light/95">
          <h1 className="text-2xl font-bold tracking-wide text-navy uppercase sm:text-3xl dark:text-white">
            {title}
          </h1>
          {description && <p className="mt-3 text-sm text-navy/60 dark:text-white/60">{description}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
