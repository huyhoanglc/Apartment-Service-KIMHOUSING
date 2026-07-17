import Link from "next/link";
import HeroCarousel, { type HeroSlide } from "@/app/components/HeroCarousel";
import AbstractPanel from "@/app/components/AbstractPanel";

// Không khai báo metadata riêng ở đây - trang chủ kế thừa title/description
// mặc định từ app/layout.tsx (layout.template không áp dụng cho page cùng segment gốc).

const FOUNDING_DATE = "01/01/2026";

const HERO_SLIDES: HeroSlide[] = [
  {
    kicker: "Kim Housing chính thức ra mắt",
    title: "Thương hiệu căn hộ dịch vụ mới tại TP.HCM",
    description: `Kim Housing chính thức đi vào hoạt động từ ngày ${FOUNDING_DATE}, mang đến giải pháp thuê nhà minh bạch, tiện nghi và tận tâm cho khách thuê.`,
    ctaLabel: "Tìm phòng ngay",
    ctaHref: "/can-ho",
  },
  {
    kicker: "Hệ sinh thái trọn gói",
    title: "Đồng hành cùng bạn suốt hành trình thuê nhà",
    description:
      "Từ tư vấn chọn phòng, hỗ trợ ký hợp đồng đến chăm sóc khách hàng 24/7 - Kim Housing lo trọn mọi khâu để bạn an tâm an cư.",
    ctaLabel: "Khám phá dịch vụ",
    ctaHref: "/dich-vu",
  },
  {
    kicker: "Dành cho chủ nhà",
    title: "Hợp tác cho thuê cùng Kim Housing",
    description:
      "Tối ưu tỷ lệ lấp đầy, minh bạch vận hành và an tâm pháp lý khi giao căn hộ của bạn cho đội ngũ Kim Housing quản lý.",
    ctaLabel: "Liên hệ hợp tác",
    ctaHref: "/lien-he",
  },
];

const VISION_CARDS = [
  {
    title: "Khách Hàng",
    description:
      "Lấy sự hài lòng của khách thuê làm trung tâm, minh bạch giá cả và tận tâm trong từng dịch vụ.",
    icon: (
      <path
        d="M4 18a6 6 0 0 1 12 0M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Con Người",
    description:
      "Đội ngũ Kim Housing được đào tạo bài bản, chuyên nghiệp và luôn sẵn sàng hỗ trợ khách hàng mọi lúc.",
    icon: (
      <path
        d="M7 17a3 3 0 0 1 6 0M10 10a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Zm-6 7a2.4 2.4 0 0 1 3.6-2.1M16 17a2.4 2.4 0 0 0-3.6-2.1M5.6 8.6a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm8.8 0a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Công Nghệ",
    description:
      "Ứng dụng công nghệ vào quản lý và tìm phòng, giúp việc thuê nhà nhanh chóng và thuận tiện hơn.",
    icon: (
      <path
        d="M3 5.5h14v9H3v-9Zm4 12h6M10 14.5v3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const ECOSYSTEM_CARDS = [
  {
    title: "Căn Hộ Dịch Vụ",
    description: "Danh mục căn hộ đa dạng diện tích, đầy đủ tiện nghi, sẵn sàng dọn vào ở ngay.",
    href: "/can-ho",
    icon: (
      <path
        d="M3 17V8l7-4 7 4v9M7 17v-5h6v5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Tư Vấn Thuê Nhà",
    description: "Đội ngũ tư vấn hỗ trợ chọn phòng phù hợp nhu cầu, ngân sách và vị trí mong muốn.",
    href: "/dich-vu",
    icon: (
      <path
        d="M4 15V6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H8l-4 4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Quản Lý Vận Hành",
    description: "Quy trình vận hành, bảo trì và xử lý sự cố căn hộ được chuẩn hoá, minh bạch.",
    href: "/dich-vu",
    icon: (
      <path
        d="M10 3v2m0 10v2m7-7h-2M5 10H3m11.5-5.5-1.4 1.4M6.9 13.1l-1.4 1.4m0-9 1.4 1.4m7.2 7.2 1.4 1.4M13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Chăm Sóc Khách Hàng",
    description: "Hỗ trợ khách thuê 24/7 trong suốt thời gian ở, phản hồi nhanh mọi yêu cầu.",
    href: "/lien-he",
    icon: (
      <path
        d="M4 10a6 6 0 0 1 12 0v3a2 2 0 0 1-2 2h-1M4 13v-.5A1.5 1.5 0 0 1 5.5 11h0A1.5 1.5 0 0 1 7 12.5v2A1.5 1.5 0 0 1 5.5 16h0A1.5 1.5 0 0 1 4 14.5V13Zm12 0v-.5a1.5 1.5 0 0 0-1.5-1.5h0a1.5 1.5 0 0 0-1.5 1.5v2a1.5 1.5 0 0 0 1.5 1.5h0a1.5 1.5 0 0 0 1.5-1.5V13Zm-5 5h-1a2 2 0 0 1-2-2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 shrink-0 text-gold-to">
      <path d="m4 10 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      {/* Hero */}
      <section data-aos="fade-down" className="relative overflow-hidden bg-navy px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-medium tracking-wide text-white/50">
            Công ty Cổ phần Kim Housing · Thành lập ngày {FOUNDING_DATE} · Email: info@kimhousing.vn
          </p>
          <HeroCarousel slides={HERO_SLIDES} />
        </div>
      </section>

      {/* Tầm nhìn */}
      <section id="tam-nhin" className="bg-white px-4 py-16 sm:px-6 lg:px-8 dark:bg-navy">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div data-aos="fade-right">
              <p className="text-xs font-semibold tracking-widest text-gold-to uppercase">
                Tầm nhìn &amp; giá trị cốt lõi
              </p>
              <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl dark:text-white">
                Xây dựng thương hiệu căn hộ dịch vụ đáng tin cậy
              </h2>
              <p className="mt-4 text-sm text-navy/60 sm:text-base dark:text-white/60">
                Ra đời từ ngày {FOUNDING_DATE}, Kim Housing đặt mục tiêu trở thành thương hiệu căn hộ dịch
                vụ được tin tưởng hàng đầu, đồng hành cùng khách thuê và chủ nhà bằng sự minh bạch, tận
                tâm và không ngừng đổi mới.
              </p>
              <Link
                href="/lien-he"
                className="mt-6 inline-flex rounded-full border border-navy/15 px-5 py-2 text-sm font-semibold text-navy transition-colors duration-300 hover:border-gold hover:text-gold-to dark:border-white/15 dark:text-white"
              >
                Xem thêm
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {VISION_CARDS.map((card, i) => (
                <div
                  key={card.title}
                  data-aos="zoom-in"
                  data-aos-delay={i * 100}
                  className="rounded-lg border border-navy/10 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to text-navy">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
                      {card.icon}
                    </svg>
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-navy dark:text-white">{card.title}</h3>
                  <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Về Kim Housing */}
      <section className="bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <AbstractPanel id="about" data-aos="fade-right" className="aspect-video w-full lg:aspect-4/3" />
          <div data-aos="fade-left">
            <h2 className="text-2xl font-bold sm:text-3xl">Vận Hành Bởi Đội Ngũ Tận Tâm</h2>
            <p className="mt-4 text-sm text-white/70 sm:text-base">
              Kim Housing được thành lập vào ngày {FOUNDING_DATE} bởi đội ngũ có kinh nghiệm trong lĩnh
              vực bất động sản cho thuê. Chúng tôi tin rằng một chỗ ở tốt bắt đầu từ sự minh bạch, dịch vụ
              chu đáo và trải nghiệm thuê nhà không phiền hà.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/lien-he"
                className="inline-flex rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-5 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
              >
                Tìm hiểu thêm
              </Link>
              <Link
                href="/lich-su"
                className="text-sm font-semibold text-white/80 underline-offset-4 transition-colors duration-300 hover:text-gold hover:underline"
              >
                Xem lịch sử hình thành →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hệ sinh thái */}
      <section id="he-sinh-thai" className="bg-navy/3 px-4 py-16 sm:px-6 lg:px-8 dark:bg-white/3">
        <div className="mx-auto max-w-7xl">
          <p data-aos="fade-up" className="text-xs font-semibold tracking-widest text-gold-to uppercase">
            Hệ sinh thái
          </p>
          <h2
            data-aos="fade-up"
            className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white"
          >
            Dịch vụ trọn gói cho hành trình thuê nhà
          </h2>
          <p data-aos="fade-up" className="mt-4 max-w-2xl text-sm text-navy/60 sm:text-base dark:text-white/60">
            Kim Housing xây dựng hệ sinh thái dịch vụ khép kín, đồng hành cùng khách thuê từ lúc tìm phòng
            đến khi ổn định chỗ ở.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ECOSYSTEM_CARDS.map((card, i) => (
              <Link
                key={card.title}
                href={card.href}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="flex gap-4 rounded-lg border border-navy/10 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:bg-navy"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy dark:bg-white/10 dark:text-white">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
                    {card.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="text-base font-semibold text-navy dark:text-white">{card.title}</h3>
                  <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{card.description}</p>
                  <span className="mt-2 inline-block text-sm font-medium text-gold-to">Chi tiết →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Giải pháp tiên phong */}
      <section className="bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SOLUTION_CARDS.map((card, i) => (
                <div
                  key={card.title}
                  data-aos="flip-up"
                  data-aos-delay={i * 100}
                  className="rounded-lg bg-white p-5 text-navy shadow-lg transition-transform duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-base font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm text-navy/60">{card.description}</p>
                </div>
              ))}
            </div>

            <div data-aos="fade-left">
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
              <Link
                href="/can-ho"
                className="mt-6 inline-flex rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-5 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
              >
                Tìm phòng ngay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quy trình 4 bước */}
      <section className="bg-navy/3 px-4 py-16 sm:px-6 lg:px-8 dark:bg-white/3">
        <div className="mx-auto max-w-7xl">
          <p data-aos="fade-up" className="text-xs font-semibold tracking-widest text-gold-to uppercase">
            Quy trình thuê căn hộ
          </p>
          <h2
            data-aos="fade-up"
            className="mt-2 max-w-2xl text-2xl font-bold text-navy sm:text-3xl dark:text-white"
          >
            Tìm Căn Hộ Nhanh Chóng - 4 Bước Không Cần Đăng Ký
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={Math.floor(i / 2) * 120}
                className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:bg-navy"
              >
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vì sao chọn Kim Housing */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 dark:bg-navy">
        <div className="mx-auto max-w-7xl">
          <h2 data-aos="fade-up" className="text-xl font-semibold text-navy sm:text-2xl dark:text-white">
            Vì Sao Chọn Kim Housing
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_CARDS.map((item, i) => (
              <div
                key={item.title}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
                className="rounded-lg border border-navy/10 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="text-base font-semibold text-navy dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-navy/60 dark:text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chủ nhà hợp tác */}
      <section id="chu-nha" className="bg-white px-4 py-16 sm:px-6 lg:px-8 dark:bg-navy">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div data-aos="fade-right">
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
                  <CheckIcon />
                  {benefit}
                </li>
              ))}
            </ul>
            <Link
              href="/lien-he"
              className="mt-6 inline-flex rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-5 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
            >
              Hợp tác ngay →
            </Link>
          </div>

          <AbstractPanel id="chu-nha" data-aos="fade-left" className="aspect-video w-full lg:aspect-4/3" />
        </div>
      </section>

      {/* Cam kết phát triển bền vững */}
      <section className="bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <AbstractPanel id="sustain" data-aos="fade-right" className="aspect-video w-full lg:aspect-4/3" />
          <div data-aos="fade-left">
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">Cam kết của chúng tôi</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Phát Triển Bền Vững</h2>
            <p className="mt-4 text-sm text-white/70 sm:text-base">
              Ngay từ những ngày đầu thành lập, Kim Housing định hướng phát triển gắn với trách nhiệm với
              khách hàng, đối tác và cộng đồng - hướng đến một thương hiệu bền vững, đáng tin cậy trong dài
              hạn.
            </p>
          </div>
        </div>
      </section>

      {/* Liên hệ */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 dark:bg-navy">
        <div data-aos="zoom-in" className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl dark:text-white">Tham Gia Cùng Chúng Tôi</h2>
          <p className="mt-2 text-sm text-navy/60 dark:text-white/60">
            Hãy liên hệ với Kim Housing theo thông tin dưới đây
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2">
          <div data-aos="fade-right">
            <h3 className="text-lg font-semibold text-navy dark:text-white">Gửi tin nhắn</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 border-t border-navy/10 pt-4 sm:grid-cols-2 dark:border-white/10">
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-xs font-medium text-navy/70 dark:text-white/70">
                  Họ và tên
                </label>
                <input
                  id="contact-name"
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold dark:border-white/15 dark:bg-white/5 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1 block text-xs font-medium text-navy/70 dark:text-white/70">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="example@email.com"
                  className="w-full rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold dark:border-white/15 dark:bg-white/5 dark:text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-phone" className="mb-1 block text-xs font-medium text-navy/70 dark:text-white/70">
                  Số điện thoại
                </label>
                <input
                  id="contact-phone"
                  placeholder="0912 345 678"
                  className="w-full rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold dark:border-white/15 dark:bg-white/5 dark:text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="mb-1 block text-xs font-medium text-navy/70 dark:text-white/70">
                  Nội dung
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Bạn cần hỗ trợ điều gì?"
                  className="w-full rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold dark:border-white/15 dark:bg-white/5 dark:text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="button"
                  className="rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-6 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
                >
                  Gửi ngay
                </button>
              </div>
            </div>
          </div>

          <div data-aos="fade-left">
            <h3 className="text-lg font-semibold text-navy dark:text-white">Thông tin liên hệ</h3>
            <div className="mt-4 space-y-3 border-t border-navy/10 pt-4 text-sm text-navy/70 dark:border-white/10 dark:text-white/70">
              <p className="font-semibold text-navy dark:text-white">CÔNG TY CỔ PHẦN KIM HOUSING</p>
              <p>Thành lập ngày: {FOUNDING_DATE}</p>
              <p>Địa chỉ: 14/5A5 Đường Kỳ Đồng, Phường Nhiêu Lộc, TP Hồ Chí Minh</p>
              <p>Hotline: 0394-008-700</p>
              <p>Email: kimhousinghr@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
