import type { Metadata } from "next";
import { FileText, Home, Newspaper } from "lucide-react";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";
import { pageMetadata } from "@/app/lib/site";

const TITLE = "Blog";
const DESCRIPTION = "Chuyên mục tin tức, kinh nghiệm thuê nhà và hướng dẫn thủ tục của Kim Housing.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/news" }),
};

const CATEGORIES = [
  {
    title: "Kinh Nghiệm Thuê Nhà",
    description: "Mẹo chọn căn hộ phù hợp, so sánh khu vực và tối ưu ngân sách thuê nhà tại TP.HCM.",
    icon: Home,
  },
  {
    title: "Tin Tức Kim Housing",
    description: "Cập nhật hoạt động, dự án căn hộ mới và các chương trình ưu đãi từ Kim Housing.",
    icon: Newspaper,
  },
  {
    title: "Hướng Dẫn Thủ Tục",
    description: "Hướng dẫn đặt cọc, ký hợp đồng và đăng ký tạm trú khi thuê căn hộ dịch vụ.",
    icon: FileText,
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero
        breadcrumb="Blog"
        title="Blog Kim Housing"
        description="Chuyên mục tin tức, chia sẻ kinh nghiệm thuê nhà đang được đội ngũ Kim Housing hoàn thiện."
      />

      {/* Categories */}
      <Section>
        <Reveal direction="up">
          <Badge variant="eyebrow">Sắp ra mắt</Badge>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white">
            Các Chuyên Mục Đang Được Chuẩn Bị
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {CATEGORIES.map((category, i) => (
            <Reveal key={category.title} direction="up" delay={i * 0.08}>
              <Card padding="lg" className="relative">
                <Badge variant="chip" className="absolute top-4 right-4">
                  Sắp ra mắt
                </Badge>
                <IconBadge icon={category.icon} size="lg" />
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
          <h2 className="text-xl font-semibold sm:text-2xl">Đừng Bỏ Lỡ Bài Viết Đầu Tiên</h2>
          <p className="mt-2 text-sm text-white/70">
            Liên hệ Kim Housing qua hotline hoặc email để được thông báo ngay khi blog chính thức ra mắt.
          </p>
          <Button href="/contact" className="mt-6">
            Liên hệ Kim Housing
          </Button>
        </Reveal>
      </Section>
    </div>
  );
}
