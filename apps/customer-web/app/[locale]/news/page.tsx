import type { Metadata } from "next";
import { FileText, Home, Newspaper, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";
import { pageMetadata } from "@/app/lib/site";
import type { AppLocale } from "@/i18n/routing";

const CATEGORY_ICONS: LucideIcon[] = [Home, Newspaper, FileText];

interface CategoryItem {
  title: string;
  description: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.news" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    ...pageMetadata({ locale: locale as AppLocale, title, description, path: "/news" }),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  const categories = t.raw("categories") as CategoryItem[];

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero breadcrumb={t("hero.breadcrumb")} title={t("hero.title")} description={t("hero.description")} />

      {/* Categories */}
      <Section>
        <Reveal direction="up">
          <Badge variant="eyebrow">{t("categoriesSection.eyebrow")}</Badge>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white">
            {t("categoriesSection.heading")}
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal key={category.title} direction="up" delay={i * 0.08}>
              <Card padding="lg" className="relative">
                <Badge variant="chip" className="absolute top-4 right-4">
                  {t("categoriesSection.badge")}
                </Badge>
                <IconBadge icon={CATEGORY_ICONS[i]} size="lg" />
                <h3 className="mt-4 text-base font-semibold text-navy dark:text-white">{category.title}</h3>
                <p className="mt-2 text-sm text-navy/60 dark:text-white/60">{category.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="navy" className="text-center">
        <Reveal direction="scale" className="mx-auto max-w-2xl">
          <h2 className="text-xl font-semibold sm:text-2xl">{t("cta.heading")}</h2>
          <p className="mt-2 text-sm text-white/70">{t("cta.paragraph")}</p>
          <Button href="/contact" className="mt-6">
            {t("cta.button")}
          </Button>
        </Reveal>
      </Section>
    </div>
  );
}
