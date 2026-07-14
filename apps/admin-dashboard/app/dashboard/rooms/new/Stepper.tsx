export type WizardStep = 1 | 2 | 3;

const STEPS: { step: WizardStep; label: string }[] = [
  { step: 1, label: "Tìm dự án" },
  { step: 2, label: "Thông tin phòng" },
  { step: 3, label: "Hoàn tất" },
];

export default function Stepper({ current }: { current: WizardStep }) {
  return (
    <ol className="flex items-center gap-3 sm:gap-6">
      {STEPS.map(({ step, label }, i) => {
        const active = step === current;
        const done = step < current;
        return (
          <li key={step} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-300 ${
                  done
                    ? "bg-linear-to-br from-gold-from via-gold-via to-gold-to text-navy"
                    : active
                      ? "bg-navy text-white"
                      : "bg-navy/10 text-navy/40"
                }`}
              >
                {step}
              </span>
              <span
                className={`hidden text-sm font-medium sm:inline ${active ? "text-navy" : "text-navy/40"}`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && <span className="h-px w-6 bg-navy/15 sm:w-10" />}
          </li>
        );
      })}
    </ol>
  );
}
