import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description:
    "Chính sách Bảo mật Thông tin Cá nhân của Kim Housing - quy định thu thập, lưu trữ, xử lý, bảo vệ và chia sẻ thông tin cá nhân của khách thuê và đối tác.",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-lg font-semibold text-navy sm:text-xl dark:text-white">{children}</h2>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6 text-base font-semibold text-navy dark:text-white">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm text-navy/60 sm:text-base dark:text-white/60">{children}</p>;
}

export default function ChinhSachBaoMatPage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      {/* Hero + breadcrumb */}
      <section data-aos="fade-down" className="relative overflow-hidden bg-navy px-4 pt-6 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs text-white/70 backdrop-blur-sm">
            <Link href="/" className="transition-colors duration-300 hover:text-gold">
              Trang chủ
            </Link>
            <span>›</span>
            <span className="font-semibold text-white">Chính sách bảo mật</span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl">
          <div className="relative mx-auto -mb-24 max-w-xl rounded-2xl bg-white/95 px-8 py-10 text-center shadow-2xl dark:bg-navy-light/95">
            <h1 className="text-2xl font-bold tracking-wide text-navy uppercase sm:text-3xl dark:text-white">
              Chính Sách Bảo Mật
            </h1>
            <p className="mt-2 text-sm text-navy/60 dark:text-white/60">Chính sách Bảo mật của Kim Housing</p>
            <div className="mx-auto mt-3 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gold-to" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold-to" />
              <span className="h-px w-8 bg-gold-to" />
            </div>
          </div>
        </div>
      </section>

      {/* Nội dung */}
      <section data-aos="fade-up" className="px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading>I. Định Nghĩa &amp; Phạm Vi</SectionHeading>
          <P>
            Chính sách Bảo mật Thông tin Cá nhân quy định các tiêu chuẩn thu thập, lưu trữ, xử lý, bảo vệ và chia sẻ
            thông tin cá nhân của người dùng (bao gồm khách thuê và đối tác bên cho thuê/chủ nhà) trên toàn hệ thống
            dữ liệu của Kim Housing. Với tư cách là Bên Kiểm soát kiêm Bên Xử lý dữ liệu cá nhân, Kim Housing cam kết
            tuân thủ nghiêm ngặt các quy định pháp luật Việt Nam về bảo vệ dữ liệu (đặc biệt là Luật Bảo vệ dữ liệu
            cá nhân 2025 và Nghị định số 356/2025/NĐ-CP ngày 31/12/2025).
          </P>

          <SectionHeading>II. Nội Dung Chi Tiết</SectionHeading>

          <SubHeading>1. Nguyên tắc chung và sự đồng ý</SubHeading>
          <P>
            <span className="font-semibold text-navy dark:text-white">Tự do truy cập ẩn danh: </span>
            Kim Housing duy trì tính mở của nền tảng. Người dùng có quyền truy cập, tra cứu thông tin căn hộ dịch vụ
            hoàn toàn miễn phí và ẩn danh mà không bắt buộc phải đăng ký tài khoản hay đăng nhập.
          </P>
          <P>
            <span className="font-semibold text-navy dark:text-white">Nguyên tắc đồng thuận: </span>
            Bằng việc chủ động gửi thông tin qua các kênh liên hệ (Hotline, Zalo OA), đăng ký dịch vụ hoặc ký nhận
            trên các biểu mẫu giao dịch (Phiếu Đặt Cọc, Phiếu Nhượng Phòng), người dùng được xem là đã xác nhận và
            đồng ý cho phép Kim Housing thu thập và xử lý dữ liệu cá nhân theo các điều khoản quy định tại chính
            sách này.
          </P>

          <SubHeading>2. Danh mục dữ liệu thu thập</SubHeading>
          <P>Dữ liệu cá nhân được phân loại cụ thể như sau:</P>
          <ul className="mt-3 space-y-3 text-sm text-navy/60 sm:text-base dark:text-white/60">
            <li>
              <span className="font-semibold text-navy dark:text-white">Dữ liệu kỹ thuật (ẩn danh): </span>
              Hệ thống tự động ghi nhận các thông số phi định danh như địa chỉ IP tạm thời, loại thiết bị, hệ điều
              hành, trình duyệt web, thời gian truy cập và lịch sử thao tác chung trên website nhằm mục đích cải
              thiện hiệu năng hệ thống và trải nghiệm người dùng.
            </li>
            <li>
              <span className="font-semibold text-navy dark:text-white">Dữ liệu định danh giao dịch:</span>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  <span className="font-semibold text-navy dark:text-white">Khách thuê: </span>
                  Họ và tên, số CCCD/Hộ chiếu, số điện thoại di động, địa chỉ thường trú, thông tin tài khoản ngân
                  hàng (phục vụ dịch vụ hỗ trợ ưu đãi), số lượng thành viên ở cùng và số lượng phương tiện đi lại.
                </li>
                <li>
                  <span className="font-semibold text-navy dark:text-white">Bên cho thuê (Chủ nhà/Quản lý): </span>
                  Họ và tên, số CCCD/Hộ chiếu, số điện thoại, địa chỉ tòa nhà cho thuê, thông tin tài khoản nhận tiền
                  đặt cọc giữ phòng.
                </li>
                <li>
                  <span className="font-semibold text-navy dark:text-white">Chuyên viên kinh doanh: </span>
                  Họ và tên, số điện thoại, mã nhân viên.
                </li>
              </ul>
            </li>
          </ul>

          <SubHeading>3. Mục đích và phạm vi sử dụng thông tin</SubHeading>
          <P>Dữ liệu cá nhân thu thập được chỉ sử dụng cho các mục đích hợp pháp sau đây:</P>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-navy/60 sm:text-base dark:text-white/60">
            <li>
              <span className="font-semibold text-navy dark:text-white">Xác lập và thực hiện giao dịch: </span>
              Soạn thảo, đối chiếu và lưu giữ các chứng từ giao dịch pháp lý bao gồm Phiếu đặt cọc giữ phòng, Phiếu
              nhượng phòng và Phiếu xác nhận giao dịch thành công.
            </li>
            <li>
              <span className="font-semibold text-navy dark:text-white">Xác thực và minh bạch thông tin: </span>
              Xác minh danh tính của khách thuê và chủ nhà nhằm ngăn chặn các hành vi gian lận tài chính, tin đăng ảo
              hoặc lừa đảo cọc.
            </li>
            <li>
              <span className="font-semibold text-navy dark:text-white">Thực hiện nghĩa vụ pháp lý: </span>
              Cung cấp thông tin nhân thân của khách thuê cho bên cho thuê để hoàn tất thủ tục đăng ký tạm trú, tạm
              vắng với cơ quan Công an địa phương theo quy định của pháp luật cư trú.
            </li>
            <li>
              <span className="font-semibold text-navy dark:text-white">Chăm sóc khách hàng: </span>
              Tích hợp dữ liệu để quản lý tài khoản tích điểm trên Zalo OA; gửi tặng các chương trình ưu đãi,
              voucher dịch vụ liên kết từ các đối tác hệ sinh thái. Việc cung cấp thông tin liên hệ đồng nghĩa với
              việc đồng ý chia sẻ giới hạn thông tin cơ bản cho các đối tác này để kích hoạt ưu đãi.
            </li>
          </ul>

          <SubHeading>4. Cam kết bảo mật và chuyển giao dữ liệu (theo Điều 7, Nghị định số 356/2025/NĐ-CP)</SubHeading>
          <P>
            <span className="font-semibold text-navy dark:text-white">Cam kết không thương mại hóa: </span>
            Kim Housing cam kết bảo mật tuyệt đối dữ liệu cá nhân của người dùng. Chúng tôi không mua bán, trao đổi
            dữ liệu cá nhân cho bên thứ ba vì mục đích thương mại khi chưa được sự đồng ý bằng văn bản của người
            dùng.
          </P>
          <P>
            <span className="font-semibold text-navy dark:text-white">Quy định chuyển giao dữ liệu cá nhân: </span>
            Tuân thủ Điều 7 Nghị định số 356/2025/NĐ-CP, khi thực hiện chuyển giao dữ liệu cá nhân của người dùng cho
            bên thứ ba (Chủ nhà/Quản lý tòa nhà hoặc Đối tác hệ sinh thái), Kim Housing áp dụng các biện pháp sau:
          </P>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-navy/60 sm:text-base dark:text-white/60">
            <li>
              <span className="font-semibold text-navy dark:text-white">Thỏa thuận chuyển giao bằng văn bản: </span>
              Thiết lập điều khoản/thỏa thuận bằng văn bản rõ ràng với Bên nhận dữ liệu (Chủ nhà/Quản lý hoặc Đối
              tác), xác định rõ: mục đích chuyển giao, loại dữ liệu chuyển giao, thời hạn lưu trữ dữ liệu, cơ sở
              pháp lý xử lý dữ liệu, trách nhiệm bảo vệ dữ liệu của các bên, trách nhiệm thực hiện các quyền của chủ
              thể dữ liệu, và cơ chế phối hợp xử lý khi xảy ra sự cố hoặc vi phạm.
            </li>
            <li>
              <span className="font-semibold text-navy dark:text-white">Giới hạn mục đích và phạm vi sử dụng: </span>
              Bên nhận dữ liệu chỉ được xử lý dữ liệu cá nhân đúng mục đích chuyển giao đã cam kết, phù hợp với
              ngành, nghề đăng ký kinh doanh và không được chuyển giao tiếp cho bên thứ tư khi chưa có sự đồng ý của
              Kim Housing và chủ thể dữ liệu.
            </li>
            <li>
              <span className="font-semibold text-navy dark:text-white">Cơ chế đồng thuận minh bạch: </span>
              Đối với các hoạt động chia sẻ dữ liệu liên kết có phát sinh lợi ích kinh tế hoặc dịch vụ phụ trợ, Kim
              Housing thiết lập giao diện kỹ thuật hoặc cơ chế xác nhận rõ ràng để người dùng đồng ý một cách chính
              xác theo từng danh mục dịch vụ.
            </li>
            <li>
              <span className="font-semibold text-navy dark:text-white">Yêu cầu pháp lý: </span>
              Cung cấp dữ liệu theo yêu cầu bằng văn bản của Cơ quan Công an hoặc cơ quan hành chính nhà nước có
              thẩm quyền phục vụ công tác quản lý cư trú.
            </li>
          </ul>

          <SubHeading>5. Lưu trữ, bảo vệ và biện pháp an toàn kỹ thuật</SubHeading>
          <P>
            <span className="font-semibold text-navy dark:text-white">Thời hạn lưu trữ: </span>
            Dữ liệu giao dịch được lưu trữ an toàn trong hệ thống máy chủ nội bộ tối đa 02 (hai) năm kể từ ngày chấm
            dứt giao dịch nhằm mục đích đối soát tài chính, giải quyết khiếu nại hoặc tranh chấp phát sinh (nếu có).
            Sau thời hạn này, dữ liệu định danh sẽ được xóa bỏ hoặc mã hóa ẩn danh hoàn toàn.
          </P>
          <P>
            <span className="font-semibold text-navy dark:text-white">Biện pháp bảo vệ nội bộ: </span>
            Dữ liệu được số hóa và quản lý tập trung trên cơ sở dữ liệu nội bộ được phân quyền truy cập nghiêm ngặt.
            Chuyên viên kinh doanh chỉ được quyền tiếp cận thông tin của nhóm khách hàng do mình trực tiếp phụ
            trách.
          </P>
          <P>
            <span className="font-semibold text-navy dark:text-white">Trách nhiệm bảo mật của người dùng: </span>
            Người dùng có nghĩa vụ tự bảo quản các thông tin giao dịch cá nhân và chứng từ cọc. Kim Housing không
            chịu trách nhiệm đối với các tổn thất phát sinh do người dùng tự ý tiết lộ thông tin giao dịch hoặc
            thông tin tài khoản cho bên thứ ba không thuộc thẩm quyền của hệ thống.
          </P>

          <SubHeading>6. Quyền hạn của chủ thể dữ liệu và thời gian phản hồi xử lý</SubHeading>
          <P>Người dùng có đầy đủ các quyền của chủ thể dữ liệu theo Nghị định số 356/2025/NĐ-CP, bao gồm:</P>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-navy/60 sm:text-base dark:text-white/60">
            <li>Quyền yêu cầu kiểm tra, cập nhật hoặc đính chính thông tin cá nhân.</li>
            <li>Quyền rút lại sự đồng ý xử lý dữ liệu hoặc yêu cầu hạn chế xử lý.</li>
            <li>Quyền yêu cầu xóa bỏ hoàn toàn dữ liệu cá nhân khỏi hệ thống lưu trữ nội bộ của Kim Housing.</li>
          </ul>
          <P>
            <span className="font-semibold text-navy dark:text-white">Quy trình tiếp nhận: </span>
            Mọi yêu cầu liên quan đến quyền dữ liệu cá nhân được gửi qua Hotline hỗ trợ 0394-008-700, kênh Zalo OA
            chính thức, hoặc trực tiếp tại văn phòng Kim Housing (14/5A5 Đường Kỳ Đồng, Phường Nhiêu Lộc, TP. Hồ Chí
            Minh).
          </P>
          <P>
            <span className="font-semibold text-navy dark:text-white">Thời gian phản hồi: </span>
            Kim Housing cam kết kiểm tra, xác minh danh tính và xử lý hoàn tất yêu cầu của người dùng trong vòng tối
            đa 48 giờ làm việc kể từ khi tiếp nhận yêu cầu hợp lệ.
          </P>
        </div>
      </section>
    </div>
  );
}
