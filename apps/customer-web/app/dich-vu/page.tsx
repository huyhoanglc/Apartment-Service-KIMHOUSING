import type { Metadata } from "next";
import { FileCheck2, FileSignature, Headset, Home, MessageCircle, Settings } from "lucide-react";
import AbstractPanel from "@/app/components/AbstractPanel";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Dịch vụ",
  description:
    "Hệ sinh thái dịch vụ trọn gói của Kim Housing: tư vấn thuê nhà, quản lý vận hành, chăm sóc khách hàng và hợp tác cùng chủ nhà.",
};

const SERVICES = [
  {
    title: "Tư Vấn Chọn Căn Hộ",
    description:
      "Đội ngũ tư vấn viên lắng nghe nhu cầu, ngân sách và khu vực mong muốn để gợi ý những căn hộ dịch vụ phù hợp nhất, sắp xếp lịch xem phòng thực tế miễn phí.",
    icon: MessageCircle,
  },
  {
    title: "Hỗ Trợ Ký Hợp Đồng",
    description:
      "Chuẩn hoá thủ tục đặt cọc giữ phòng và ký hợp đồng thuê, đảm bảo điều khoản rõ ràng, minh bạch cho cả khách thuê và chủ nhà.",
    icon: FileSignature,
  },
  {
    title: "Quản Lý Vận Hành Căn Hộ",
    description:
      "Thay mặt chủ nhà quản lý, bảo trì và xử lý sự cố phát sinh trong quá trình cho thuê, đảm bảo căn hộ luôn trong tình trạng tốt nhất.",
    icon: Settings,
  },
  {
    title: "Chăm Sóc Khách Hàng",
    description:
      "Hỗ trợ khách thuê 24/7 trong suốt thời gian sinh sống tại căn hộ, tiếp nhận và phản hồi mọi yêu cầu trong thời gian sớm nhất.",
    icon: Headset,
  },
  {
    title: "Hợp Tác Cùng Chủ Nhà",
    description:
      "Nhận uỷ thác quản lý và cho thuê căn hộ, cam kết minh bạch dòng tiền, tối ưu tỷ lệ lấp đầy và hỗ trợ pháp lý trong suốt quá trình hợp tác.",
    icon: Home,
  },
  {
    title: "Hỗ Trợ Thủ Tục Cư Trú",
    description:
      "Hướng dẫn và hỗ trợ khách thuê hoàn tất thủ tục đăng ký tạm trú, tạm vắng với cơ quan chức năng theo đúng quy định pháp luật.",
    icon: FileCheck2,
  },
];

const PROCESS = [
  { step: "1", title: "Tiếp nhận nhu cầu", description: "Khách thuê hoặc chủ nhà liên hệ Kim Housing qua hotline, website." },
  { step: "2", title: "Tư vấn & khảo sát", description: "Tư vấn viên đề xuất giải pháp phù hợp, sắp xếp lịch xem căn hộ hoặc khảo sát." },
  { step: "3", title: "Ký kết hợp đồng", description: "Hoàn tất thủ tục đặt cọc, ký hợp đồng minh bạch, rõ ràng." },
  { step: "4", title: "Đồng hành dài hạn", description: "Kim Housing tiếp tục hỗ trợ, chăm sóc trong suốt thời gian thuê." },
];

export default function DichVuPage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero
        breadcrumb="Dịch vụ"
        title="Dịch Vụ Của Kim Housing"
        description="Hệ sinh thái dịch vụ trọn gói, đồng hành cùng khách thuê và chủ nhà xuyên suốt hành trình thuê căn hộ."
      />

      {/* Services grid */}
      <Section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} direction="up" delay={(i % 3) * 0.08}>
              <Card padding="lg" hoverable>
                <IconBadge icon={service.icon} size="lg" />
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
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">Quy trình phối hợp</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Đơn Giản, Rõ Ràng Từng Bước</h2>
            <div className="mt-6 space-y-5">
              {PROCESS.map((item) => (
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
          <h2 className="text-xl font-semibold text-navy sm:text-2xl dark:text-white">
            Cần Tư Vấn Dịch Vụ Phù Hợp?
          </h2>
          <p className="mt-2 text-sm text-navy/60 dark:text-white/60">
            Dù bạn là khách thuê đang tìm căn hộ hay chủ nhà muốn hợp tác cho thuê, Kim Housing luôn sẵn sàng hỗ trợ.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button href="/can-ho">Tìm căn hộ ngay</Button>
            <Button href="/lien-he" variant="outline">
              Liên hệ hợp tác
            </Button>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
