import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Eye, Heart, Star, Users } from "lucide-react";
import AbstractPanel from "@/app/components/AbstractPanel";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Về Kim Housing",
  description:
    "Kim Housing là thương hiệu căn hộ dịch vụ cho thuê tại TP.HCM, đồng hành cùng khách thuê và chủ nhà bằng sự minh bạch, tận tâm và chuyên nghiệp.",
};

const ABOUT_LINKS = [
  {
    href: "/about/values",
    title: "Giá trị cốt lõi",
    description: "Những giá trị nền tảng dẫn dắt mọi hoạt động của Kim Housing.",
    icon: Star,
  },
  {
    href: "/#vision",
    title: "Tầm nhìn chiến lược",
    description: "Định hướng trở thành thương hiệu căn hộ dịch vụ đáng tin cậy hàng đầu.",
    icon: Eye,
  },
  {
    href: "/about/history",
    title: "Lịch sử hình thành",
    description: "Hành trình từ ý tưởng đến ngày Kim Housing chính thức ra mắt.",
    icon: Clock,
  },
  {
    href: "/about/social-responsibility",
    title: "Trách nhiệm xã hội",
    description: "Cam kết phát triển bền vững cùng khách hàng, đối tác và cộng đồng.",
    icon: Heart,
  },
  {
    href: "/about/team",
    title: "Đội ngũ nhân sự",
    description: "Đội ngũ sáng lập và hơn 30 nhân sự cốt lõi giàu kinh nghiệm.",
    icon: Users,
  },
];

const QUICK_FACTS = [
  { label: "Thành lập", value: "01/01/2026" },
  { label: "Nhân sự cốt lõi", value: "30+" },
  { label: "Khu vực hoạt động", value: "TP.HCM" },
  { label: "Loại hình", value: "Căn hộ dịch vụ" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero
        breadcrumb="Về chúng tôi"
        title="Thuê Căn Hộ Minh Bạch Và Dễ Dàng"
        description="Kim Housing là thương hiệu căn hộ dịch vụ cho thuê tại TP.HCM, kết nối khách thuê với những căn hộ đúng như hình ảnh, giá thật, cùng trải nghiệm đặt lịch xem phòng nhanh chóng."
      />

      {/* Giới thiệu */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <Badge variant="eyebrow">Giới thiệu</Badge>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">
              Đồng Hành Cùng Bạn Trong Hành Trình An Cư
            </h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">
              Kim Housing chính thức đi vào hoạt động từ ngày 01/01/2026 với mong muốn xây dựng một thương hiệu cho
              thuê căn hộ dịch vụ minh bạch, tận tâm và chuyên nghiệp. Chúng tôi tin rằng một chỗ ở tốt bắt đầu từ
              thông tin trung thực, giá cả rõ ràng và một đội ngũ luôn sẵn sàng đồng hành.
            </p>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">
              Từ tư vấn chọn phòng, hỗ trợ ký hợp đồng đến chăm sóc khách hàng trong suốt thời gian thuê, Kim Housing
              xây dựng hệ sinh thái dịch vụ khép kín để khách thuê an tâm và chủ nhà an tâm giao căn hộ vận hành.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {QUICK_FACTS.map((fact, i) => (
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

      {/* Điều hướng các trang liên quan */}
      <Section tone="subtle">
        <Reveal direction="up">
          <Badge variant="eyebrow">Tìm hiểu thêm</Badge>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white">
            Khám Phá Kim Housing
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_LINKS.map((item, i) => (
            <Reveal key={item.title} direction="up" delay={(i % 3) * 0.08}>
              <Card as={Link} href={item.href} hoverable className="group flex flex-col">
                <IconBadge icon={item.icon} />
                <h3 className="mt-4 text-base font-semibold text-navy dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{item.description}</p>
                <span className="mt-3 inline-block text-sm font-medium text-gold-to transition-transform duration-300 group-hover:translate-x-1">
                  Xem thêm →
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="navy">
        <Reveal direction="scale" className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Sẵn Sàng Tìm Căn Hộ Phù Hợp?</h2>
          <p className="mt-2 text-sm text-white/70">
            Khám phá danh mục căn hộ dịch vụ hoặc liên hệ đội ngũ Kim Housing để được tư vấn miễn phí.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button href="/apartments">Tìm phòng ngay</Button>
            <Button href="/contact" variant="outline-invert">
              Liên hệ tư vấn
            </Button>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
