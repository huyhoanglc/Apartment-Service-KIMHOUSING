import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-white px-4 text-center dark:bg-navy">
      <h1 className="text-xl font-semibold text-navy dark:text-white">Không tìm thấy trang</h1>
      <p className="text-sm text-navy/60 dark:text-white/60">
        Phòng bạn tìm không tồn tại hoặc đã bị gỡ.
      </p>
      <Link
        href="/"
        className="rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-4 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
      >
        Về trang danh sách phòng
      </Link>
    </div>
  );
}
