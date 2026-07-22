import type { Metadata } from "next";
import { GraduationCap, TrendingUp, Users, Wallet, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import AbstractPanel from "@/app/components/AbstractPanel";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";
import { pageMetadata } from "@/app/lib/site";
import type { AppLocale } from "@/i18n/routing";

const BENEFIT_ICONS: LucideIcon[] = [Wallet, Users, GraduationCap, TrendingUp];

interface BenefitItem {
  title: string;
  description: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.careers" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    ...pageMetadata({ locale: locale as AppLocale, title, description, path: "/careers" }),
  };
}

export default async function TuyenDungPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });
  const benefits = t.raw("benefits") as BenefitItem[];
  const mailHref = `mailto:kimhousing.hrad@gmail.com?subject=${encodeURIComponent(t("openings.emailSubject"))}`;

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero breadcrumb={t("hero.breadcrumb")} title={t("hero.title")} description={t("hero.description")} />

      {/* Giới thiệu */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <AbstractPanel id="tuyen-dung" className="aspect-video w-full lg:aspect-4/3" />
          </Reveal>
          <Reveal direction="left">
            <Badge variant="eyebrow">{t("intro.eyebrow")}</Badge>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">{t("intro.heading")}</h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">{t("intro.paragraph")}</p>
          </Reveal>
        </div>
      </Section>

      {/* Benefits */}
      <Section tone="subtle">
        <Reveal direction="up">
          <Badge variant="eyebrow">{t("benefitsSection.eyebrow")}</Badge>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white">
            {t("benefitsSection.heading")}
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} direction="scale" delay={i * 0.08}>
              <Card hoverable>
                <IconBadge icon={BENEFIT_ICONS[i]} />
                <h3 className="mt-4 text-base font-semibold text-navy dark:text-white">{benefit.title}</h3>
                <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{benefit.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Vị trí tuyển dụng */}
      <Section>
        <Reveal direction="scale">
          <Card padding="lg" className="mx-auto max-w-3xl text-center">
            <Badge variant="eyebrow">{t("openings.eyebrow")}</Badge>
            <h2 className="mt-2 text-xl font-semibold text-navy sm:text-2xl dark:text-white">
              {t("openings.heading")}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-navy/60 dark:text-white/60">{t("openings.paragraph")}</p>
            <Button href={mailHref} className="mt-6">
              {t("openings.button")}
            </Button>
            <p className="mt-3 text-xs text-navy/50 dark:text-white/50">kimhousing.hrad@gmail.com</p>
          </Card>
        </Reveal>
      </Section>
    </div>
  );
}
