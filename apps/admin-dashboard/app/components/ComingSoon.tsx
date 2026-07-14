function ToolIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
      <path d="M11.5 4.5a3 3 0 0 0-4 3l-5 5 2 2 5-5a3 3 0 0 0 3-4l-2 2-1.5-1.5 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ComingSoon({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-navy">{title}</h1>
      <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-navy/10 bg-white px-6 py-20 text-center shadow-sm">
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-gold-from via-gold-via to-gold-to text-navy">
          <ToolIcon />
        </span>
        <p className="text-sm font-medium text-navy">Tính năng đang được phát triển</p>
        <p className="mt-2 max-w-sm text-sm text-navy/50">
          {description ?? `${title} sẽ sớm ra mắt trong bản cập nhật tiếp theo.`}
        </p>
      </div>
    </div>
  );
}
