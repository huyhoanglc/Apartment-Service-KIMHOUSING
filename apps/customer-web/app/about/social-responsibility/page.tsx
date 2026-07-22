import type { Metadata } from "next";
import { HeartHandshake, Home, User, Users } from "lucide-react";
import AbstractPanel from "@/app/components/AbstractPanel";
import PageHero from "@/app/components/PageHero";
import Section from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";
import { pageMetadata } from "@/app/lib/site";

const TITLE = "Trách nhiệm xã hội";
const DESCRIPTION =
  "Định hướng trách nhiệm xã hội của Kim Housing với khách thuê, đối tác chủ nhà, đội ngũ nhân sự và cộng đồng tại TP.HCM.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/about/social-responsibility" }),
};

const COMMITMENTS = [
  {
    title: "Với Khách Thuê",
    description:
      "Minh bạch thông tin căn hộ, giá thuê và hợp đồng. Không để khách thuê chịu rủi ro từ tin đăng sai lệch hay chi phí phát sinh không rõ ràng.",
    icon: User,
  },
  {
    title: "Với Đối Tác Chủ Nhà",
    description:
      "Cam kết minh bạch dòng tiền, hỗ trợ pháp lý và vận hành có trách nhiệm khi được chủ nhà tin tưởng giao quản lý căn hộ.",
    icon: Home,
  },
  {
    title: "Với Đội Ngũ Nhân Sự",
    description:
      "Xây dựng môi trường làm việc công bằng, đào tạo bài bản và tạo điều kiện phát triển lâu dài cho từng thành viên Kim Housing.",
    icon: Users,
  },
  {
    title: "Với Cộng Đồng",
    description:
      "Hướng đến trở thành thương hiệu căn hộ dịch vụ có trách nhiệm tại TP.HCM, đồng hành cùng các hoạt động thiết thực cho cộng đồng nơi Kim Housing hoạt động.",
    icon: HeartHandshake,
  },
];

export default function TrachNhiemXaHoiPage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero
        breadcrumb="Trách nhiệm xã hội"
        title="Trách Nhiệm Xã Hội"
        description="Phát triển gắn với trách nhiệm với khách hàng, đối tác và cộng đồng."
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <AbstractPanel id="csr" className="aspect-video w-full lg:aspect-4/3" />
          </Reveal>
          <Reveal direction="left">
            <Badge variant="eyebrow">Định hướng phát triển</Badge>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">
              Phát Triển Bền Vững, Có Trách Nhiệm
            </h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">
              Ngay từ những ngày đầu thành lập, Kim Housing xác định trách nhiệm xã hội không phải là hoạt động
              phong trào mà là một phần trong cách vận hành hằng ngày - từ việc minh bạch thông tin cho khách thuê,
              công bằng với đối tác chủ nhà, đến chăm lo cho đội ngũ nhân sự và cộng đồng xung quanh.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Commitments */}
      <Section tone="subtle">
        <Reveal direction="up">
          <Badge variant="eyebrow">Cam kết</Badge>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white">
            Bốn Trụ Cột Trách Nhiệm Của Kim Housing
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {COMMITMENTS.map((item, i) => (
            <Reveal key={item.title} direction={i % 2 === 0 ? "right" : "left"}>
              <Card hoverable className="flex gap-4">
                <IconBadge icon={item.icon} tone="neutral" />
                <div>
                  <h3 className="text-base font-semibold text-navy dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{item.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <Reveal direction="scale" className="mx-auto max-w-2xl">
          <h2 className="text-xl font-semibold text-navy sm:text-2xl dark:text-white">
            Cùng Kim Housing Xây Dựng Cộng Đồng Thuê Nhà Đáng Tin Cậy
          </h2>
          <p className="mt-2 text-sm text-navy/60 dark:text-white/60">
            Nếu bạn có đề xuất hợp tác hoặc góp ý cho định hướng phát triển bền vững của Kim Housing, hãy liên hệ
            với chúng tôi.
          </p>
          <Button href="/contact" className="mt-6">
            Liên hệ Kim Housing
          </Button>
        </Reveal>
      </Section>
    </div>
  );
}
