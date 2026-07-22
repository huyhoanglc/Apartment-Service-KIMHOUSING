import type { Metadata } from "next";
import { HeartHandshake, Home, User, Users, type LucideIcon } from "lucide-react";
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

const COMMITMENT_ICONS: LucideIcon[] = [User, Home, Users, HeartHandshake];

interface Commitment {
  title: string;
  description: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.aboutSocial" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    ...pageMetadata({ locale: locale as AppLocale, title, description, path: "/about/social-responsibility" }),
  };
}

export default async function TrachNhiemXaHoiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutSocial" });
  const commitments = t.raw("commitments") as Commitment[];

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero
        breadcrumb={t("hero.breadcrumb")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <AbstractPanel id="csr" className="aspect-video w-full lg:aspect-4/3" />
          </Reveal>
          <Reveal direction="left">
            <Badge variant="eyebrow">{t("intro.eyebrow")}</Badge>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">{t("intro.heading")}</h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">{t("intro.paragraph")}</p>
          </Reveal>
        </div>
      </Section>

      {/* Commitments */}
      <Section tone="subtle">
        <Reveal direction="up">
          <Badge variant="eyebrow">{t("commitmentsSection.eyebrow")}</Badge>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white">
            {t("commitmentsSection.heading")}
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {commitments.map((item, i) => (
            <Reveal key={item.title} direction={i % 2 === 0 ? "right" : "left"}>
              <Card hoverable className="flex gap-4">
                <IconBadge icon={COMMITMENT_ICONS[i]} tone="neutral" />
                <div>
                  <h3 className="text-base font-semibold text-navy dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{item.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <Reveal direction="scale" className="mx-auto max-w-2xl">
          <h2 className="text-xl font-semibold text-navy sm:text-2xl dark:text-white">{t("cta.heading")}</h2>
          <p className="mt-2 text-sm text-navy/60 dark:text-white/60">{t("cta.paragraph")}</p>
          <Button href="/contact" className="mt-6">
            {t("cta.button")}
          </Button>
        </Reveal>
      </Section>
    </div>
  );
}
