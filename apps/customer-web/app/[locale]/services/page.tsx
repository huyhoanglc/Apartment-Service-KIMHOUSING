import type { Metadata } from "next";
import { FileCheck2, FileSignature, Headset, Home, MessageCircle, Settings, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import AbstractPanel from "@/app/components/AbstractPanel";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";
import { pageMetadata } from "@/app/lib/site";
import type { AppLocale } from "@/i18n/routing";

const SERVICE_ICONS: LucideIcon[] = [MessageCircle, FileSignature, Settings, Headset, Home, FileCheck2];

interface ServiceItem {
  title: string;
  description: string;
}

interface ProcessItem {
  step: string;
  title: string;
  description: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    ...pageMetadata({ locale: locale as AppLocale, title, description, path: "/services" }),
  };
}

export default async function DichVuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const services = t.raw("services") as ServiceItem[];
  const process = t.raw("process") as ProcessItem[];

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero breadcrumb={t("hero.breadcrumb")} title={t("hero.title")} description={t("hero.description")} />

      {/* Services grid */}
      <Section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} direction="up" delay={(i % 3) * 0.08}>
              <Card padding="lg" hoverable>
                <IconBadge icon={SERVICE_ICONS[i]} size="lg" />
                <h3 className="mt-4 text-base font-semibold text-navy dark:text-white">{service.title}</h3>
                <p className="mt-2 text-sm text-navy/60 dark:text-white/60">{service.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Quy trình + hình ảnh */}
      <Section tone="navy">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">{t("processSection.eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t("processSection.heading")}</h2>
            <div className="mt-6 space-y-5">
              {process.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-gold">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-0.5 text-sm text-white/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left">
            <AbstractPanel id="dich-vu" className="aspect-video w-full lg:aspect-4/3" />
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <Reveal direction="scale" className="mx-auto max-w-2xl">
          <h2 className="text-xl font-semibold text-navy sm:text-2xl dark:text-white">{t("cta.heading")}</h2>
          <p className="mt-2 text-sm text-navy/60 dark:text-white/60">{t("cta.paragraph")}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button href="/apartments">{t("cta.primary")}</Button>
            <Button href="/contact" variant="outline">
              {t("cta.secondary")}
            </Button>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
