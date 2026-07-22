import type { Metadata } from "next";
import { Home, Laptop, MessageCircle, Settings, Headset, Mail, User, Users, CheckCircle2, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import HeroCarousel, { type HeroSlide } from "@/app/components/HeroCarousel";
import AbstractPanel from "@/app/components/AbstractPanel";
import ContactForm from "@/app/components/ContactForm";
import Section, { Container } from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";
import { Link } from "@/i18n/navigation";

// title/description không khai báo lại ở đây - trang chủ kế thừa default title/description
// từ app/[locale]/layout.tsx (title.template không áp dụng cho page cùng segment gốc). Chỉ khai
// báo canonical riêng cho route "/" (openGraph inherit từ layout để không mất siteName/images).
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const VISION_ICONS: LucideIcon[] = [User, Users, Laptop];
const ECOSYSTEM_ICONS: LucideIcon[] = [Home, MessageCircle, Settings, Headset];

interface CardItem {
  title: string;
  description: string;
}

interface EcosystemCardItem extends CardItem {
  href: string;
}

interface StepItem {
  number: string;
  title: string;
  experience: string;
  privilege: string;
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const slides = t.raw("hero.slides") as HeroSlide[];
  const visionCards = t.raw("vision.cards") as CardItem[];
  const ecosystemCards = t.raw("ecosystem.cards") as EcosystemCardItem[];
  const solutionCards = t.raw("solution.cards") as CardItem[];
  const steps = t.raw("steps.items") as StepItem[];
  const whyChooseCards = t.raw("whyChoose.cards") as CardItem[];
  const ownerBenefits = t.raw("partners.benefits") as string[];

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Container>
          <HeroCarousel slides={slides} />
        </Container>
      </section>

      {/* Tầm nhìn */}
      <Section id="vision">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal direction="right">
            <Badge variant="eyebrow">{t("vision.eyebrow")}</Badge>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">{t("vision.heading")}</h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">{t("vision.paragraph")}</p>
            <Button href="/about" variant="outline" className="mt-6">
              {t("vision.cta")}
            </Button>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visionCards.map((card, i) => (
              <Reveal key={card.title} direction="scale" delay={i * 0.08}>
                <Card hoverable>
                  <IconBadge icon={VISION_ICONS[i]} />
                  <h3 className="mt-4 text-base font-semibold text-navy dark:text-white">{card.title}</h3>
                  <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{card.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Về Kim Housing */}
      <Section tone="navy">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <AbstractPanel id="about" className="aspect-video w-full lg:aspect-4/3" />
          </Reveal>
          <Reveal direction="left">
            <h2 className="text-2xl font-bold sm:text-3xl">{t("aboutUs.heading")}</h2>
            <p className="mt-4 text-sm text-white/70 sm:text-base">{t("aboutUs.paragraph")}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button href="/about">{t("aboutUs.ctaPrimary")}</Button>
              <Link
                href="/about/history"
                className="text-sm font-semibold text-white/80 underline-offset-4 transition-colors duration-300 hover:text-gold hover:underline"
              >
                {t("aboutUs.ctaHistory")}
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Hệ sinh thái */}
      <Section id="ecosystem" tone="subtle">
        <Reveal direction="up">
          <Badge variant="eyebrow">{t("ecosystem.eyebrow")}</Badge>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white">
            {t("ecosystem.heading")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-navy/60 sm:text-base dark:text-white/60">
            {t("ecosystem.paragraph")}
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ecosystemCards.map((card, i) => (
            <Reveal key={card.title} direction="up" delay={i * 0.08}>
              <Card as={Link} href={card.href} hoverable className="flex gap-4">
                <IconBadge icon={ECOSYSTEM_ICONS[i]} tone="neutral" size="lg" />
                <div>
                  <h3 className="text-base font-semibold text-navy dark:text-white">{card.title}</h3>
                  <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{card.description}</p>
                  <span className="mt-2 inline-block text-sm font-medium text-gold-to">{tCommon("details")}</span>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Giải pháp tiên phong */}
      <Section tone="navy">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutionCards.map((card, i) => (
              <Reveal key={card.title} direction="up" delay={i * 0.08}>
                <div className="rounded-card bg-white p-5 text-navy shadow-soft-md transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-base font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm text-navy/60">{card.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal direction="left">
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">{t("solution.eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t("solution.heading")}</h2>
            <p className="mt-4 text-sm text-white/70">{t("solution.paragraph")}</p>
            <Button href="/apartments" className="mt-6">
              {t("solution.cta")}
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* Quy trình 4 bước */}
      <Section tone="subtle">
        <Reveal direction="up">
          <Badge variant="eyebrow">{t("steps.eyebrow")}</Badge>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white">
            {t("steps.heading")}
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {steps.map((step, i) => (
            <Reveal key={step.number} direction={i % 2 === 0 ? "right" : "left"} delay={Math.floor(i / 2) * 0.1}>
              <Card padding="lg" hoverable>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to text-sm font-bold text-navy">
                  {step.number}
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy dark:text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-navy/60 dark:text-white/60">
                  <span className="font-semibold text-navy dark:text-white">{t("steps.experienceLabel")}</span>
                  {step.experience}
                </p>
                <p className="mt-2 text-sm text-navy/60 dark:text-white/60">
                  <span className="font-semibold text-navy dark:text-white">{t("steps.privilegeLabel")}</span>
                  {step.privilege}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Vì sao chọn Kim Housing */}
      <Section>
        <Reveal direction="up">
          <h2 className="text-xl font-semibold text-navy sm:text-2xl dark:text-white">{t("whyChoose.heading")}</h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseCards.map((item, i) => (
            <Reveal key={item.title} direction="scale" delay={i * 0.08}>
              <Card hoverable>
                <h3 className="text-base font-semibold text-navy dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-navy/60 dark:text-white/60">{item.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Chủ nhà hợp tác */}
      <Section id="partners">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <p className="text-xs font-semibold tracking-widest text-gold-to uppercase">{t("partners.eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">
              {t("partners.heading")}
            </h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">{t("partners.paragraph")}</p>
            <ul className="mt-6 space-y-3">
              {ownerBenefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-navy dark:text-white">
                  <CheckCircle2 size={18} strokeWidth={1.75} className="shrink-0 text-gold-to" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Button href="/contact" className="mt-6">
              {t("partners.cta")}
            </Button>
          </Reveal>

          <Reveal direction="left">
            <AbstractPanel id="partners-panel" className="aspect-video w-full lg:aspect-4/3" />
          </Reveal>
        </div>
      </Section>

      {/* Cam kết phát triển bền vững */}
      <Section tone="navy">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <AbstractPanel id="sustain" className="aspect-video w-full lg:aspect-4/3" />
          </Reveal>
          <Reveal direction="left">
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">{t("sustainability.eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t("sustainability.heading")}</h2>
            <p className="mt-4 text-sm text-white/70 sm:text-base">{t("sustainability.paragraph")}</p>
          </Reveal>
        </div>
      </Section>

      {/* Liên hệ */}
      <Section>
        <Reveal direction="scale" className="text-center">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl dark:text-white">
            {t("contactSection.heading")}
          </h2>
          <p className="mt-2 text-sm text-navy/60 dark:text-white/60">{t("contactSection.paragraph")}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <h3 className="text-lg font-semibold text-navy dark:text-white">{t("contactSection.formHeading")}</h3>
            <div className="mt-4 border-t border-navy/10 pt-4 dark:border-white/10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal direction="left">
            <h3 className="text-lg font-semibold text-navy dark:text-white">
              {t("contactSection.quickConnectHeading")}
            </h3>
            <div className="mt-4 space-y-5 border-t border-navy/10 pt-4 dark:border-white/10">
              <p className="text-sm text-navy/60 dark:text-white/60">{t("contactSection.quickConnectParagraph")}</p>
              <div className="flex flex-wrap gap-3">
                <Button
                  href="mailto:kimhousing.hrad@gmail.com"
                  variant="outline"
                  icon={<Mail size={16} strokeWidth={2} />}
                >
                  {t("contactSection.sendEmail")}
                </Button>
              </div>
              <Link
                href="/contact"
                className="inline-block text-sm font-medium text-gold-to underline-offset-4 transition-colors duration-300 hover:underline"
              >
                {t("contactSection.fullContactLink")}
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
