import type { Metadata } from "next";
import Link from "next/link";
import { Home, Laptop, MessageCircle, Settings, Headset, Mail, User, Users, CheckCircle2 } from "lucide-react";
import HeroCarousel, { type HeroSlide } from "@/app/components/HeroCarousel";
import AbstractPanel from "@/app/components/AbstractPanel";
import ContactForm from "@/app/components/ContactForm";
import Section, { Container } from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";

// title/description không khai báo lại ở đây - trang chủ kế thừa default title/description
// từ app/layout.tsx (title.template không áp dụng cho page cùng segment gốc). Chỉ khai báo
// canonical + openGraph riêng cho route "/".
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const FOUNDING_DATE = "01/01/2026";

const HERO_SLIDES: HeroSlide[] = [
  {
    kicker: "Kim Housing chính thức ra mắt",
    title: "Thương hiệu căn hộ dịch vụ mới tại TP.HCM",
    description: `Kim Housing chính thức đi vào hoạt động từ ngày ${FOUNDING_DATE}, mang đến giải pháp thuê nhà minh bạch, tiện nghi và tận tâm cho khách thuê.`,
    ctaLabel: "Tìm phòng ngay",
    ctaHref: "/apartments",
  },
  {
    kicker: "Hệ sinh thái trọn gói",
    title: "Đồng hành cùng bạn suốt hành trình thuê nhà",
    description:
      "Từ tư vấn chọn phòng, hỗ trợ ký hợp đồng đến chăm sóc khách hàng 24/7 - Kim Housing lo trọn mọi khâu để bạn an tâm an cư.",
    ctaLabel: "Khám phá dịch vụ",
    ctaHref: "/services",
  },
  {
    kicker: "Dành cho chủ nhà",
    title: "Hợp tác cho thuê cùng Kim Housing",
    description:
      "Tối ưu tỷ lệ lấp đầy, minh bạch vận hành và an tâm pháp lý khi giao căn hộ của bạn cho đội ngũ Kim Housing quản lý.",
    ctaLabel: "Liên hệ hợp tác",
    ctaHref: "/contact",
  },
];

const VISION_CARDS = [
  {
    title: "Khách Hàng",
    description:
      "Lấy sự hài lòng của khách thuê làm trung tâm, minh bạch giá cả và tận tâm trong từng dịch vụ.",
    icon: User,
  },
  {
    title: "Con Người",
    description:
      "Đội ngũ Kim Housing được đào tạo bài bản, chuyên nghiệp và luôn sẵn sàng hỗ trợ khách hàng mọi lúc.",
    icon: Users,
  },
  {
    title: "Công Nghệ",
    description:
      "Ứng dụng công nghệ vào quản lý và tìm phòng, giúp việc thuê nhà nhanh chóng và thuận tiện hơn.",
    icon: Laptop,
  },
];

const ECOSYSTEM_CARDS = [
  {
    title: "Căn Hộ Dịch Vụ",
    description: "Danh mục căn hộ đa dạng diện tích, đầy đủ tiện nghi, sẵn sàng dọn vào ở ngay.",
    href: "/apartments",
    icon: Home,
  },
  {
    title: "Tư Vấn Thuê Nhà",
    description: "Đội ngũ tư vấn hỗ trợ chọn phòng phù hợp nhu cầu, ngân sách và vị trí mong muốn.",
    href: "/services",
    icon: MessageCircle,
  },
  {
    title: "Quản Lý Vận Hành",
    description: "Quy trình vận hành, bảo trì và xử lý sự cố căn hộ được chuẩn hoá, minh bạch.",
    href: "/services",
    icon: Settings,
  },
  {
    title: "Chăm Sóc Khách Hàng",
    description: "Hỗ trợ khách thuê 24/7 trong suốt thời gian ở, phản hồi nhanh mọi yêu cầu.",
    href: "/contact",
    icon: Headset,
  },
];

const SOLUTION_CARDS = [
  {
    title: "Tư Vấn Chọn Phòng",
    description: "Gợi ý căn hộ phù hợp dựa trên khu vực, ngân sách và tiện ích mong muốn.",
  },
  {
    title: "Hỗ Trợ Ký Hợp Đồng Nhanh",
    description: "Thủ tục rõ ràng, minh bạch, hỗ trợ ký hợp đồng và nhận phòng trong thời gian ngắn.",
  },
  {
    title: "Đồng Hành Dài Hạn",
    description: "Chăm sóc và hỗ trợ khách thuê xuyên suốt thời gian sinh sống tại căn hộ.",
  },
];

const STEPS = [
  {
    number: "1",
    title: "Tìm căn hộ theo nhu cầu",
    experience:
      "Khách hàng truy cập nền tảng, xem danh mục căn hộ dịch vụ thực tế với đầy đủ thông tin, hình ảnh chân thực và giá cả niêm yết công khai.",
    privilege:
      "Không cần đăng ký. Bạn hoàn toàn có thể tìm hiểu thông tin căn hộ trên hệ thống của Kim Housing mà không cần cung cấp thông tin cá nhân.",
  },
  {
    number: "2",
    title: "Kết nối tư vấn viên & đặt lịch xem căn hộ miễn phí",
    experience:
      "Khi lựa chọn được căn hộ ưng ý, khách hàng chỉ cần nhấp vào nút liên hệ để đặt lịch xem căn hộ nhanh chóng, hoàn toàn miễn phí.",
    privilege:
      "Đội ngũ tư vấn Kim Housing sẽ liên hệ tư vấn chuyên sâu và trực tiếp dẫn bạn đi xem căn hộ thực tế.",
  },
  {
    number: "3",
    title: "Đặt cọc giữ phòng an toàn",
    experience:
      "Khi quyết định thuê, chuyên viên sẽ hỗ trợ bạn thiết lập Phiếu Đặt Cọc Giữ Phòng rõ ràng, minh bạch. Bạn có thể chuyển khoản cọc trực tiếp cho Chủ nhà hoặc uỷ quyền qua tài khoản nhận cọc hộ chính thức của Kim Housing.",
    privilege:
      "Kim Housing cam kết kết toán và chuyển giao toàn bộ số tiền cọc nhận hộ cho Chủ nhà trong vòng 24 giờ làm việc, đảm bảo an toàn tuyệt đối cho cọc giữ chỗ của bạn.",
  },
  {
    number: "4",
    title: "Nhận căn hộ và ký hợp đồng thuê",
    experience:
      "Chuyên viên Kim Housing đồng hành hỗ trợ khách hàng ký Hợp đồng thuê chính thức với Bên cho thuê.",
    privilege:
      "Phiếu cọc giữ phòng tự động hết hiệu lực sau khi ký kết hợp đồng. Bạn dọn vào ở và bắt đầu hành trình sống mới an tâm.",
  },
];

const WHY_CHOOSE_CARDS = [
  {
    title: "Hình thật, giá thật",
    description: "Mọi tin đăng đều có hình ảnh và mức giá được kiểm duyệt, không tin ảo.",
  },
  {
    title: "Miễn phí cho người thuê",
    description: "Bạn không trả phí môi giới khi tìm và đặt lịch xem căn hộ qua Kim Housing.",
  },
  {
    title: "Phản hồi nhanh",
    description: "Đội ngũ tư vấn liên hệ và sắp xếp lịch xem trong thời gian sớm nhất.",
  },
  {
    title: "Phủ rộng TP.HCM",
    description: "Kho căn hộ đa dạng khắp các quận huyện, cập nhật liên tục mỗi ngày.",
  },
];

const OWNER_BENEFITS = [
  "Cam kết minh bạch về giá thuê và dòng tiền",
  "Quy trình hợp tác rõ ràng, nhanh gọn",
  "Hỗ trợ pháp lý và hợp đồng tận tâm",
  "Tối ưu tỷ lệ lấp đầy căn hộ",
];

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Container>
          <HeroCarousel slides={HERO_SLIDES} />
        </Container>
      </section>

      {/* Tầm nhìn */}
      <Section id="vision">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal direction="right">
            <Badge variant="eyebrow">Tầm nhìn &amp; giá trị cốt lõi</Badge>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">
              Xây dựng thương hiệu căn hộ dịch vụ đáng tin cậy
            </h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">
              Ra đời từ ngày {FOUNDING_DATE}, Kim Housing đặt mục tiêu trở thành thương hiệu căn hộ dịch
              vụ được tin tưởng hàng đầu, đồng hành cùng khách thuê và chủ nhà bằng sự minh bạch, tận
              tâm và không ngừng đổi mới.
            </p>
            <Button href="/about" variant="outline" className="mt-6">
              Xem thêm
            </Button>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VISION_CARDS.map((card, i) => (
              <Reveal key={card.title} direction="scale" delay={i * 0.08}>
                <Card hoverable>
                  <IconBadge icon={card.icon} />
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
            <h2 className="text-2xl font-bold sm:text-3xl">Vận Hành Bởi Đội Ngũ Tận Tâm</h2>
            <p className="mt-4 text-sm text-white/70 sm:text-base">
              Kim Housing được thành lập vào ngày {FOUNDING_DATE} bởi đội ngũ có kinh nghiệm trong lĩnh
              vực bất động sản cho thuê. Chúng tôi tin rằng một chỗ ở tốt bắt đầu từ sự minh bạch, dịch vụ
              chu đáo và trải nghiệm thuê nhà không phiền hà.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button href="/about">Tìm hiểu thêm</Button>
              <Link
                href="/about/history"
                className="text-sm font-semibold text-white/80 underline-offset-4 transition-colors duration-300 hover:text-gold hover:underline"
              >
                Xem lịch sử hình thành →
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Hệ sinh thái */}
      <Section id="ecosystem" tone="subtle">
        <Reveal direction="up">
          <Badge variant="eyebrow">Hệ sinh thái</Badge>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white">
            Dịch vụ trọn gói cho hành trình thuê nhà
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-navy/60 sm:text-base dark:text-white/60">
            Kim Housing xây dựng hệ sinh thái dịch vụ khép kín, đồng hành cùng khách thuê từ lúc tìm phòng
            đến khi ổn định chỗ ở.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ECOSYSTEM_CARDS.map((card, i) => (
            <Reveal key={card.title} direction="up" delay={i * 0.08}>
              <Card as={Link} href={card.href} hoverable className="flex gap-4">
                <IconBadge icon={card.icon} tone="neutral" size="lg" />
                <div>
                  <h3 className="text-base font-semibold text-navy dark:text-white">{card.title}</h3>
                  <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{card.description}</p>
                  <span className="mt-2 inline-block text-sm font-medium text-gold-to">Chi tiết →</span>
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
            {SOLUTION_CARDS.map((card, i) => (
              <Reveal key={card.title} direction="up" delay={i * 0.08}>
                <div className="rounded-card bg-white p-5 text-navy shadow-soft-md transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-base font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm text-navy/60">{card.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal direction="left">
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">
              Giải pháp tiên phong
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Đơn giản hoá hành trình thuê căn hộ dịch vụ
            </h2>
            <p className="mt-4 text-sm text-white/70">
              Kim Housing tập trung vào trải nghiệm khách thuê, giúp bạn dễ dàng tìm được nơi ở phù hợp
              và an tâm trong suốt quá trình thuê.
            </p>
            <Button href="/apartments" className="mt-6">
              Tìm phòng ngay
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* Quy trình 4 bước */}
      <Section tone="subtle">
        <Reveal direction="up">
          <Badge variant="eyebrow">Quy trình thuê căn hộ</Badge>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white">
            Tìm Căn Hộ Nhanh Chóng - 4 Bước Không Cần Đăng Ký
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} direction={i % 2 === 0 ? "right" : "left"} delay={Math.floor(i / 2) * 0.1}>
              <Card padding="lg" hoverable>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to text-sm font-bold text-navy">
                  {step.number}
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy dark:text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-navy/60 dark:text-white/60">
                  <span className="font-semibold text-navy dark:text-white">Trải nghiệm: </span>
                  {step.experience}
                </p>
                <p className="mt-2 text-sm text-navy/60 dark:text-white/60">
                  <span className="font-semibold text-navy dark:text-white">Đặc quyền: </span>
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
          <h2 className="text-xl font-semibold text-navy sm:text-2xl dark:text-white">
            Vì Sao Chọn Kim Housing
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_CARDS.map((item, i) => (
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
            <p className="text-xs font-semibold tracking-widest text-gold-to uppercase">Dành cho chủ nhà</p>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">
              Hợp tác cho thuê cùng Kim Housing
            </h2>
            <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">
              Kim Housing ưu tiên chủ nhà cùng tham gia hợp tác vận hành, cam kết minh bạch thông tin, đảm
              bảo dòng tiền ổn định và uy tín với khách thuê.
            </p>
            <ul className="mt-6 space-y-3">
              {OWNER_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-navy dark:text-white">
                  <CheckCircle2 size={18} strokeWidth={1.75} className="shrink-0 text-gold-to" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Button href="/contact" className="mt-6">
              Hợp tác ngay →
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
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">Cam kết của chúng tôi</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Phát Triển Bền Vững</h2>
            <p className="mt-4 text-sm text-white/70 sm:text-base">
              Ngay từ những ngày đầu thành lập, Kim Housing định hướng phát triển gắn với trách nhiệm với
              khách hàng, đối tác và cộng đồng - hướng đến một thương hiệu bền vững, đáng tin cậy trong dài
              hạn.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Liên hệ */}
      <Section>
        <Reveal direction="scale" className="text-center">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl dark:text-white">Tham Gia Cùng Chúng Tôi</h2>
          <p className="mt-2 text-sm text-navy/60 dark:text-white/60">
            Hãy liên hệ với Kim Housing theo thông tin dưới đây
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <h3 className="text-lg font-semibold text-navy dark:text-white">Gửi tin nhắn</h3>
            <div className="mt-4 border-t border-navy/10 pt-4 dark:border-white/10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal direction="left">
            <h3 className="text-lg font-semibold text-navy dark:text-white">Kết nối nhanh</h3>
            <div className="mt-4 space-y-5 border-t border-navy/10 pt-4 dark:border-white/10">
              <p className="text-sm text-navy/60 dark:text-white/60">
                Cần hỗ trợ ngay? Gửi email cho đội ngũ tư vấn Kim Housing.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  href="mailto:kimhousing.hrad@gmail.com"
                  variant="outline"
                  icon={<Mail size={16} strokeWidth={2} />}
                >
                  Gửi email
                </Button>
              </div>
              <Link
                href="/contact"
                className="inline-block text-sm font-medium text-gold-to underline-offset-4 transition-colors duration-300 hover:underline"
              >
                Xem đầy đủ thông tin liên hệ →
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
