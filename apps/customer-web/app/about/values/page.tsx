import type { Metadata } from "next";
import { Award, Eye, Handshake, Heart, Lightbulb, ShieldCheck } from "lucide-react";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Giá trị cốt lõi",
  description:
    "Minh bạch, tận tâm, chuyên nghiệp và đổi mới - những giá trị cốt lõi dẫn dắt mọi hoạt động của Kim Housing.",
};

const CORE_VALUES = [
  {
    title: "Minh Bạch",
    description:
      "Giá thuê, hình ảnh căn hộ và điều khoản hợp đồng đều rõ ràng, công khai - không phát sinh chi phí ẩn trong suốt quá trình thuê.",
    icon: Eye,
  },
  {
    title: "Tận Tâm",
    description:
      "Đặt sự hài lòng và trải nghiệm của khách thuê lên hàng đầu trong mọi quyết định, từ tư vấn chọn phòng đến chăm sóc sau khi ký hợp đồng.",
    icon: Heart,
  },
  {
    title: "Chuyên Nghiệp",
    description:
      "Quy trình vận hành, tư vấn và ký kết hợp đồng được chuẩn hoá bởi đội ngũ giàu kinh nghiệm trong lĩnh vực bất động sản cho thuê.",
    icon: Award,
  },
  {
    title: "Đổi Mới",
    description:
      "Không ngừng ứng dụng công nghệ vào quản lý và tìm phòng, giúp hành trình thuê căn hộ dịch vụ trở nên nhanh chóng và thuận tiện hơn.",
    icon: Lightbulb,
  },
  {
    title: "Trách Nhiệm",
    description:
      "Cam kết đồng hành lâu dài với khách thuê, đối tác chủ nhà và cộng đồng nơi Kim Housing hoạt động, hướng đến phát triển bền vững.",
    icon: ShieldCheck,
  },
  {
    title: "Hợp Tác",
    description:
      "Xây dựng mối quan hệ hợp tác cùng có lợi với chủ nhà - minh bạch dòng tiền, tối ưu tỷ lệ lấp đầy và an tâm pháp lý.",
    icon: Handshake,
  },
];

export default function GiaTriCotLoiPage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero
        breadcrumb="Giá trị cốt lõi"
        title="Giá Trị Cốt Lõi"
        description="Những giá trị nền tảng dẫn dắt mọi quyết định và hành động của đội ngũ Kim Housing."
      />

      {/* Values grid */}
      <Section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((value, i) => (
            <Reveal key={value.title} direction="up" delay={(i % 3) * 0.08}>
              <Card padding="lg" hoverable>
                <IconBadge icon={value.icon} size="lg" />
                <h3 className="mt-4 text-lg font-semibold text-navy dark:text-white">{value.title}</h3>
                <p className="mt-2 text-sm text-navy/60 dark:text-white/60">{value.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="navy">
        <Reveal direction="scale" className="text-center">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase">Cam kết của chúng tôi</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Giá Trị Được Thể Hiện Trong Từng Trải Nghiệm</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">
            Từ lúc tìm phòng đến khi ổn định chỗ ở, Kim Housing luôn giữ vững những giá trị này trong từng điểm
            chạm với khách thuê và đối tác.
          </p>
          <Button href="/about" className="mt-6">
            Tìm hiểu về Kim Housing
          </Button>
        </Reveal>
      </Section>
    </div>
  );
}
