import type { Metadata } from "next";
import { Award, Eye, Handshake, Heart, Lightbulb, ShieldCheck, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";
import { pageMetadata } from "@/app/lib/site";
import type { AppLocale } from "@/i18n/routing";

const VALUE_ICONS: LucideIcon[] = [Eye, Heart, Award, Lightbulb, ShieldCheck, Handshake];

interface ValueItem {
  title: string;
  description: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.aboutValues" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    ...pageMetadata({ locale: locale as AppLocale, title, description, path: "/about/values" }),
  };
}

export default async function GiaTriCotLoiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutValues" });
  const values = t.raw("values") as ValueItem[];

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero breadcrumb={t("hero.breadcrumb")} title={t("hero.title")} description={t("hero.description")} />

      {/* Values grid */}
      <Section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
            <Reveal key={value.title} direction="up" delay={(i % 3) * 0.08}>
              <Card padding="lg" hoverable>
                <IconBadge icon={VALUE_ICONS[i]} size="lg" />
                <h3 className="mt-4 text-lg font-semibold text-navy dark:text-white">{value.title}</h3>
                <p className="mt-2 text-sm text-navy/60 dark:text-white/60">{value.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="navy">
        <Reveal direction="scale" className="text-center">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase">{t("cta.eyebrow")}</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t("cta.heading")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">{t("cta.paragraph")}</p>
          <Button href="/about" className="mt-6">
            {t("cta.button")}
          </Button>
        </Reveal>
      </Section>
    </div>
  );
}
