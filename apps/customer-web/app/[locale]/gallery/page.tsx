import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AbstractPanel from "@/app/components/AbstractPanel";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Reveal from "@/app/components/ui/Reveal";
import { pageMetadata } from "@/app/lib/site";
import type { AppLocale } from "@/i18n/routing";

interface Album {
  id: string;
  label: string;
  tiles: number;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.gallery" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    ...pageMetadata({ locale: locale as AppLocale, title, description, path: "/gallery" }),
  };
}

export default async function ThuVienAnhPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  const albums = t.raw("albums") as Album[];

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero breadcrumb={t("hero.breadcrumb")} title={t("hero.title")} description={t("hero.description")} />

      {/* Albums */}
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[180px_1fr]">
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:h-fit lg:flex-col lg:overflow-visible lg:pb-0">
            {albums.map((album) => (
              <a
                key={album.id}
                href={`#${album.id}`}
                className="shrink-0 rounded-input border border-navy/10 px-3 py-1.5 text-sm font-medium text-navy/70 transition-colors duration-300 hover:border-gold hover:text-gold-to lg:rounded-none lg:border-0 lg:border-l-2 lg:border-navy/10 lg:px-3 lg:py-2 dark:border-white/10 dark:text-white/70"
              >
                {album.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col">
            {albums.map((album, i) => (
              <div
                key={album.id}
                id={album.id}
                className={`scroll-mt-24 py-8 ${i > 0 ? "border-t border-navy/10 dark:border-white/10" : ""}`}
              >
                <Reveal direction="up">
                  <h2 className="text-lg font-semibold text-navy dark:text-white">{album.label}</h2>
                </Reveal>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {Array.from({ length: album.tiles }, (_, idx) => (
                    <Reveal key={idx} direction="scale" delay={(idx % 3) * 0.08}>
                      <AbstractPanel id={`${album.id}-${idx}`} className="aspect-square w-full" />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
