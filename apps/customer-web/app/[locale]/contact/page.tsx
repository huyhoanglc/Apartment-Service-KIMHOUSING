import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import PageHero from "@/app/components/PageHero";
import ContactForm from "@/app/components/ContactForm";
import Section from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";
import { pageMetadata } from "@/app/lib/site";
import type { AppLocale } from "@/i18n/routing";

const INFO_ICONS: LucideIcon[] = [MapPin, Phone, Mail, Clock];
const INFO_HREFS: (string | undefined)[] = [undefined, undefined, "mailto:kimhousing.hrad@gmail.com", undefined];

interface ContactInfoItem {
  title: string;
  value: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    ...pageMetadata({ locale: locale as AppLocale, title, description, path: "/contact" }),
  };
}

export default async function LienHePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const info = t.raw("info") as ContactInfoItem[];

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero breadcrumb={t("hero.breadcrumb")} title={t("hero.title")} description={t("hero.description")} />

      {/* Contact info cards */}
      <Section>
        <Reveal direction="up" className="mb-8 text-center">
          <p className="text-sm font-semibold tracking-wide text-navy uppercase dark:text-white">
            {t("companyName")}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {info.map((item, i) => {
            const href = INFO_HREFS[i];
            const inner = (
              <>
                <IconBadge icon={INFO_ICONS[i]} />
                <p className="mt-4 text-sm font-semibold text-navy dark:text-white">{item.title}</p>
                <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{item.value}</p>
              </>
            );
            return (
              <Reveal key={item.title} direction="scale" delay={i * 0.08}>
                {href ? (
                  <Card as="a" href={href} hoverable>
                    {inner}
                  </Card>
                ) : (
                  <Card>{inner}</Card>
                )}
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Form + map */}
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <h2 className="text-lg font-semibold text-navy dark:text-white">{t("formHeading")}</h2>
            <div className="mt-4 border-t border-navy/10 pt-4 dark:border-white/10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal direction="left" className="overflow-hidden rounded-card border border-navy/10 dark:border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3570711312486!2d106.67911157583852!3d10.783940059053496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f294e460b1d%3A0x2c1d653af8180d80!2zMTQvNUE1IMSQLiBL4buzIMSQ4buTbmcsIE5oacOqdSBM4buZYywgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1784301028086!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 360 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("mapTitle")}
            />
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
