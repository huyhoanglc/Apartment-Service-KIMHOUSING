export type WizardStep = 1 | 2 | 3;

const STEPS: { step: WizardStep; label: string }[] = [
  { step: 1, label: "Tìm dự án" },
  { step: 2, label: "Thông tin phòng" },
  { step: 3, label: "Hoàn tất" },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="m5 10 3.2 3.2L15 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Stepper({ current }: { current: WizardStep }) {
  return (
    <ol className="flex w-full max-w-xl items-start">
      {STEPS.map(({ step, label }, i) => {
        const active = step === current;
        const done = step < current;
        return (
          <li key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold shadow-sm transition-colors duration-300 ${
                  done
                    ? "bg-linear-to-br from-gold-from via-gold-via to-gold-to text-navy"
                    : active
                      ? "bg-navy text-white ring-4 ring-navy/10"
                      : "bg-white text-navy/30 ring-1 ring-navy/15"
                }`}
              >
                {done ? <CheckIcon /> : step}
              </span>
              <span
                className={`text-center text-xs font-medium whitespace-nowrap sm:text-sm ${
                  active ? "text-navy" : done ? "text-navy/60" : "text-navy/35"
                }`}
              >
                {label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div className="mx-2 mb-5 h-1 flex-1 overflow-hidden rounded-full bg-navy/10 sm:mx-4">
                <div
                  className={`h-full rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to transition-all duration-500 ${
                    step < current ? "w-full" : "w-0"
                  }`}
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
