import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Reveal from "@/app/components/ui/Reveal";
import { pageMetadata } from "@/app/lib/site";
import type { AppLocale } from "@/i18n/routing";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-lg font-semibold text-navy sm:text-xl dark:text-white">{children}</h2>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6 text-base font-semibold text-navy dark:text-white">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm text-navy/60 sm:text-base dark:text-white/60">{children}</p>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-navy dark:text-white">{children}</span>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.privacyPolicy" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    ...pageMetadata({ locale: locale as AppLocale, title, description, path: "/privacy-policy" }),
  };
}

export default async function ChinhSachBaoMatPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPolicy" });
  const s = await getTranslations({ locale, namespace: "privacyPolicy.sections" });

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero breadcrumb={t("hero.breadcrumb")} title={t("hero.title")} description={t("hero.description")} />

      {/* Nội dung */}
      <Section>
        <Reveal direction="up" className="mx-auto max-w-3xl">
          <SectionHeading>{s("s1Heading")}</SectionHeading>
          <P>{s("s1P1")}</P>

          <SectionHeading>{s("s2Heading")}</SectionHeading>

          <SubHeading>{s("s2_1Heading")}</SubHeading>
          <P>
            <Label>{s("s2_1P1Label")}</Label>
            {s("s2_1P1")}
          </P>
          <P>
            <Label>{s("s2_1P2Label")}</Label>
            {s("s2_1P2")}
          </P>

          <SubHeading>{s("s2_2Heading")}</SubHeading>
          <P>{s("s2_2Intro")}</P>
          <ul className="mt-3 space-y-3 text-sm text-navy/60 sm:text-base dark:text-white/60">
            <li>
              <Label>{s("s2_2Item1Label")}</Label>
              {s("s2_2Item1")}
            </li>
            <li>
              <Label>{s("s2_2Item2Label")}</Label>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  <Label>{s("s2_2Item2aLabel")}</Label>
                  {s("s2_2Item2a")}
                </li>
                <li>
                  <Label>{s("s2_2Item2bLabel")}</Label>
                  {s("s2_2Item2b")}
                </li>
                <li>
                  <Label>{s("s2_2Item2cLabel")}</Label>
                  {s("s2_2Item2c")}
                </li>
              </ul>
            </li>
          </ul>

          <SubHeading>{s("s2_3Heading")}</SubHeading>
          <P>{s("s2_3Intro")}</P>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-navy/60 sm:text-base dark:text-white/60">
            <li>
              <Label>{s("s2_3Item1Label")}</Label>
              {s("s2_3Item1")}
            </li>
            <li>
              <Label>{s("s2_3Item2Label")}</Label>
              {s("s2_3Item2")}
            </li>
            <li>
              <Label>{s("s2_3Item3Label")}</Label>
              {s("s2_3Item3")}
            </li>
            <li>
              <Label>{s("s2_3Item4Label")}</Label>
              {s("s2_3Item4")}
            </li>
          </ul>

          <SubHeading>{s("s2_4Heading")}</SubHeading>
          <P>
            <Label>{s("s2_4P1Label")}</Label>
            {s("s2_4P1")}
          </P>
          <P>
            <Label>{s("s2_4P2Label")}</Label>
            {s("s2_4P2")}
          </P>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-navy/60 sm:text-base dark:text-white/60">
            <li>
              <Label>{s("s2_4Item1Label")}</Label>
              {s("s2_4Item1")}
            </li>
            <li>
              <Label>{s("s2_4Item2Label")}</Label>
              {s("s2_4Item2")}
            </li>
            <li>
              <Label>{s("s2_4Item3Label")}</Label>
              {s("s2_4Item3")}
            </li>
            <li>
              <Label>{s("s2_4Item4Label")}</Label>
              {s("s2_4Item4")}
            </li>
          </ul>

          <SubHeading>{s("s2_5Heading")}</SubHeading>
          <P>
            <Label>{s("s2_5P1Label")}</Label>
            {s("s2_5P1")}
          </P>
          <P>
            <Label>{s("s2_5P2Label")}</Label>
            {s("s2_5P2")}
          </P>
          <P>
            <Label>{s("s2_5P3Label")}</Label>
            {s("s2_5P3")}
          </P>

          <SubHeading>{s("s2_6Heading")}</SubHeading>
          <P>{s("s2_6Intro")}</P>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-navy/60 sm:text-base dark:text-white/60">
            <li>{s("s2_6Item1")}</li>
            <li>{s("s2_6Item2")}</li>
            <li>{s("s2_6Item3")}</li>
          </ul>
          <P>
            <Label>{s("s2_6P1Label")}</Label>
            {s("s2_6P1")}
          </P>
          <P>
            <Label>{s("s2_6P2Label")}</Label>
            {s("s2_6P2")}
          </P>
        </Reveal>
      </Section>
    </div>
  );
}
