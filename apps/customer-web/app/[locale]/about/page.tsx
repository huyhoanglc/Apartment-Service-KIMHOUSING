import type { Metadata } from "next";
import { Clock, Eye, Heart, Star, Users, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import AbstractPanel from "@/app/components/AbstractPanel";
import BrandEmblemLazy from "@/app/components/BrandEmblemLazy";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";
import { cn } from "@/app/lib/cn";
import { pageMetadata } from "@/app/lib/site";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

const ABOUT_LINK_ICONS: LucideIcon[] = [Star, Eye, Clock, Heart, Users];

interface AboutLinkItem {
  href: string;
  title: string;
  description: string;
}

interface KimLetterItem {
  letter: string;
  title: string;
  description: string;
  center: boolean;
}

interface QuickFactItem {
  label: string;
  value: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    ...pageMetadata({ locale: locale as AppLocale, title, description, path: "/about" }),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const aboutLinks = t.raw("links.items") as AboutLinkItem[];
  const kimLetters = t.raw("brandMeaning.letters") as KimLetterItem[];
  const quickFacts = t.raw("intro.quickFacts") as QuickFactItem[];

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero breadcrumb={t("hero.breadcrumb")} title={t("hero.title")} description={t("hero.description")} />

      {/* Giới thiệu */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <Badge variant="eyebrow">{t("intro.eyebrow")}</Badge>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">{t("intro.heading")}</h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">{t("intro.paragraph1")}</p>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">{t("intro.paragraph2")}</p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {quickFacts.map((fact, i) => (
                <Reveal key={fact.label} direction="scale" delay={i * 0.06}>
                  <Card padding="sm" className="text-center">
                    <p className="text-lg font-bold text-gold-to sm:text-xl">{fact.value}</p>
                    <p className="mt-1 text-xs text-navy/60 dark:text-white/60">{fact.label}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left">
            <AbstractPanel id="about" className="aspect-video w-full lg:aspect-4/3" />
          </Reveal>
        </div>
      </Section>

      {/* Ý nghĩa thương hiệu */}
      <Section tone="navy">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">{t("brandMeaning.eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t("brandMeaning.heading")}</h2>
            <p className="mt-4 text-sm text-white/70 sm:text-base">
              {t("brandMeaning.paragraph1").split(t("brandMeaning.paragraph1Highlight")).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="font-semibold text-white">{t("brandMeaning.paragraph1Highlight")}</span>
                  )}
                </span>
              ))}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {kimLetters.map((item) => (
                <div
                  key={item.letter}
                  className={cn(
                    "rounded-2xl p-4 text-center sm:text-left",
                    item.center ? "border border-gold/40 bg-white/5" : "border border-white/10"
                  )}
                >
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to text-sm font-bold text-navy sm:mx-0">
                    {item.letter}
                  </span>
                  <p className="mt-3 text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-white/60">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/50">{t("brandMeaning.lettersNote")}</p>

            <p className="mt-6 text-sm text-white/70 sm:text-base">{t("brandMeaning.paragraph2")}</p>
            <p className="mt-3 text-xs text-white/40">{t("brandMeaning.rotateHint")}</p>
          </Reveal>

          <Reveal direction="left">
            <BrandEmblemLazy />
          </Reveal>
        </div>
      </Section>

      {/* Điều hướng các trang liên quan */}
      <Section tone="subtle">
        <Reveal direction="up">
          <Badge variant="eyebrow">{t("links.eyebrow")}</Badge>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white">
            {t("links.heading")}
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutLinks.map((item, i) => (
            <Reveal key={item.title} direction="up" delay={(i % 3) * 0.08}>
              <Card as={Link} href={item.href} hoverable className="group flex flex-col">
                <IconBadge icon={ABOUT_LINK_ICONS[i]} />
                <h3 className="mt-4 text-base font-semibold text-navy dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{item.description}</p>
                <span className="mt-3 inline-block text-sm font-medium text-gold-to transition-transform duration-300 group-hover:translate-x-1">
                  {t("links.cta")}
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="navy">
        <Reveal direction="scale" className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("cta.heading")}</h2>
          <p className="mt-2 text-sm text-white/70">{t("cta.paragraph")}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button href="/apartments">{t("cta.primary")}</Button>
            <Button href="/contact" variant="outline-invert">
              {t("cta.secondary")}
            </Button>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
