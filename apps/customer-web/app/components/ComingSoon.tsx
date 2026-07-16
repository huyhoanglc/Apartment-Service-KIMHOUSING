export default function ComingSoon({
  kicker,
  description,
}: {
  kicker: string;
  description: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-white px-4 py-24 text-center dark:bg-navy">
      <p className="text-xs font-semibold tracking-widest text-gold-to uppercase">{kicker}</p>
      <h1 className="text-2xl font-semibold text-navy dark:text-white">Đang cập nhật</h1>
      <p className="max-w-md text-sm text-navy/60 dark:text-white/60">{description}</p>
    </div>
  );
}
