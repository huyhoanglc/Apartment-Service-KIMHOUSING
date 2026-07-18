import type { Metadata } from "next";
import { GraduationCap, TrendingUp, Users, Wallet } from "lucide-react";
import AbstractPanel from "@/app/components/AbstractPanel";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Tuyển dụng",
  description:
    "Cơ hội nghề nghiệp tại Kim Housing - môi trường làm việc năng động, chế độ đãi ngộ cạnh tranh cho các vị trí tư vấn, kinh doanh và vận hành.",
};

const BENEFITS = [
  {
    title: "Lương Thưởng Cạnh Tranh",
    description: "Thu nhập xứng đáng với năng lực, cùng chính sách thưởng theo hiệu quả công việc.",
    icon: Wallet,
  },
  {
    title: "Môi Trường Trẻ, Năng Động",
    description: "Làm việc cùng đội ngũ nhiệt huyết, văn hoá cởi mở và luôn hỗ trợ lẫn nhau.",
    icon: Users,
  },
  {
    title: "Đào Tạo Bài Bản",
    description: "Được đào tạo quy trình tư vấn, vận hành ngay từ ngày đầu, đồng hành cùng đội ngũ giàu kinh nghiệm.",
    icon: GraduationCap,
  },
  {
    title: "Cơ Hội Thăng Tiến",
    description: "Lộ trình phát triển sự nghiệp rõ ràng khi Kim Housing không ngừng mở rộng quy mô hoạt động.",
    icon: TrendingUp,
  },
];

export default function TuyenDungPage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero
        breadcrumb="Tuyển dụng"
        title="Gia Nhập Kim Housing"
        description="Cùng xây dựng thương hiệu căn hộ dịch vụ minh bạch và tận tâm hàng đầu TP.HCM."
      />

      {/* Giới thiệu */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <AbstractPanel id="tuyen-dung" className="aspect-video w-full lg:aspect-4/3" />
          </Reveal>
          <Reveal direction="left">
            <Badge variant="eyebrow">Vì sao chọn Kim Housing</Badge>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">
              Phát Triển Sự Nghiệp Cùng Chúng Tôi
            </h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">
              Kim Housing đang từng bước xây dựng đội ngũ nhân sự vững mạnh cho hành trình phát triển dài hạn. Chúng
              tôi tìm kiếm những con người tận tâm, chủ động và mong muốn gắn bó cùng một thương hiệu căn hộ dịch vụ
              đang lớn mạnh mỗi ngày tại TP.HCM.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Benefits */}
      <Section tone="subtle">
        <Reveal direction="up">
          <Badge variant="eyebrow">Quyền lợi</Badge>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white">
            Đãi Ngộ Dành Cho Nhân Viên Kim Housing
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, i) => (
            <Reveal key={benefit.title} direction="scale" delay={i * 0.08}>
              <Card hoverable>
                <IconBadge icon={benefit.icon} />
                <h3 className="mt-4 text-base font-semibold text-navy dark:text-white">{benefit.title}</h3>
                <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{benefit.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Vị trí tuyển dụng */}
      <Section>
        <Reveal direction="scale">
          <Card padding="lg" className="mx-auto max-w-3xl text-center">
            <Badge variant="eyebrow">Vị trí tuyển dụng</Badge>
            <h2 className="mt-2 text-xl font-semibold text-navy sm:text-2xl dark:text-white">
              Hiện Chưa Có Vị Trí Đang Mở
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-navy/60 dark:text-white/60">
              Kim Housing luôn chào đón những ứng viên tiềm năng cho các vị trí tư vấn viên, chuyên viên kinh doanh và
              vận hành căn hộ. Gửi CV cho chúng tôi để được liên hệ ngay khi có vị trí phù hợp.
            </p>
            <Button href="mailto:kimhousinghr@gmail.com?subject=Ứng%20tuyển%20vào%20Kim%20Housing" className="mt-6">
              Gửi CV ứng tuyển
            </Button>
            <p className="mt-3 text-xs text-navy/50 dark:text-white/50">kimhousinghr@gmail.com</p>
          </Card>
        </Reveal>
      </Section>
    </div>
  );
}
