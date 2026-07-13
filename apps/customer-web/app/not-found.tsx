import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 px-4 text-center dark:bg-black">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Không tìm thấy trang
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Phòng bạn tìm không tồn tại hoặc đã bị gỡ.
      </p>
      <Link
        href="/"
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Về trang danh sách phòng
      </Link>
    </div>
  );
}
