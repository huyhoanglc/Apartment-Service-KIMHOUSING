import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AbstractPanel from "@/app/components/AbstractPanel";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Reveal from "@/app/components/ui/Reveal";
import { pageMetadata } from "@/app/lib/site";
import type { AppLocale } from "@/i18n/routing";

interface Milestone {
  date: string;
  title: string;
  description: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.aboutHistory" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    ...pageMetadata({ locale: locale as AppLocale, title, description, path: "/about/history" }),
  };
}

export default async function LichSuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutHistory" });
  const milestones = t.raw("milestones") as Milestone[];

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero breadcrumb={t("hero.breadcrumb")} title={t("hero.title")} />

      {/* Timeline */}
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[160px_1fr]">
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:h-fit lg:flex-col lg:overflow-visible lg:pb-0">
            {milestones.map((m) => (
              <a
                key={m.date}
                href={`#${m.date}`}
                className="shrink-0 rounded-input border border-navy/10 px-3 py-1.5 text-sm font-medium text-navy/70 transition-colors duration-300 hover:border-gold hover:text-gold-to lg:rounded-none lg:border-0 lg:border-l-2 lg:border-navy/10 lg:px-3 lg:py-2 dark:border-white/10 dark:text-white/70"
              >
                {m.date}
              </a>
            ))}
          </nav>

          <div className="flex flex-col">
            {milestones.map((m, i) => (
              <div
                key={m.date}
                id={m.date}
                className={`grid scroll-mt-24 grid-cols-1 gap-6 py-8 sm:grid-cols-[280px_1fr] ${
                  i > 0 ? "border-t border-navy/10 dark:border-white/10" : ""
                }`}
              >
                <Reveal direction="right">
                  <AbstractPanel id={m.date} className="aspect-video w-full" />
                </Reveal>
                <Reveal direction="left">
                  <p className="text-sm font-semibold tracking-wide text-gold-to">{m.date}</p>
                  <h2 className="mt-1 text-lg font-semibold text-navy dark:text-white">{m.title}</h2>
                  <p className="mt-2 text-sm text-navy/60 sm:text-base dark:text-white/60">{m.description}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
