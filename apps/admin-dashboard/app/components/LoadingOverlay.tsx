export default function LoadingOverlay({ show, label }: { show: boolean; label?: string }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-navy/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-lg bg-white px-8 py-6 shadow-lg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy/15 border-t-gold" />
        {label && <p className="text-sm font-medium text-navy">{label}</p>}
      </div>
    </div>
  );
}
