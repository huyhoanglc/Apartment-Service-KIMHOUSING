import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AbstractPanel from "@/app/components/AbstractPanel";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Badge from "@/app/components/ui/Badge";
import Reveal from "@/app/components/ui/Reveal";
import { pageMetadata } from "@/app/lib/site";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.aboutTeam" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    ...pageMetadata({ locale: locale as AppLocale, title, description, path: "/about/team" }),
  };
}

export default async function DoiNguNhanSuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutTeam" });

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero breadcrumb={t("hero.breadcrumb")} title={t("hero.title")} />

      {/* Đội ngũ sáng lập */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <AbstractPanel id="founders" className="aspect-video w-full lg:aspect-4/3" />
          </Reveal>
          <Reveal direction="left">
            <Badge variant="eyebrow">{t("founders.eyebrow")}</Badge>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">
              {t("founders.heading")}
            </h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">{t("founders.paragraph")}</p>
          </Reveal>
        </div>
      </Section>

      {/* Đội ngũ cốt lõi */}
      <Section tone="navy">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right" className="order-2 lg:order-1">
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">{t("coreTeam.eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t("coreTeam.heading")}</h2>
            <p className="mt-4 text-sm text-white/70 sm:text-base">{t("coreTeam.paragraph")}</p>
          </Reveal>
          <Reveal direction="left" className="order-1 lg:order-2">
            <AbstractPanel id="core-team" className="aspect-video w-full lg:aspect-4/3" />
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
