// The Verdict Stamp — KeyVerdict's signature visual element.
// See the Product & Design Proposal §4.4 for full rationale: a minimal,
// hand-stamped-looking mark evoking a notary/customs stamp, used at three
// scales throughout the product (micro badge, large report hero, outline
// progress state).

type StampSize = 'micro' | 'large' | 'hero';

interface VerdictStampProps {
  size?: StampSize;
  verdict?: string;
  label?: string;
  reportId?: string;
  filled?: boolean;
}

const dimensions: Record<StampSize, string> = {
  micro: 'w-8 h-8',
  large: 'w-44 h-44',
  hero: 'w-56 h-56',
};

export default function VerdictStamp({
  size = 'large',
  verdict = 'Proceed with Caution',
  label = 'Verdict',
  reportId,
  filled = true,
}: VerdictStampProps) {
  const ring = filled ? 'border-seal' : 'border-slate/40';
  const text = filled ? 'text-seal' : 'text-slate';

  if (size === 'micro') {
    return (
      <div
        className={`relative ${dimensions.micro} shrink-0`}
        style={{ transform: 'rotate(-6deg)' }}
      >
        <div className={`absolute inset-0 rounded-full border-2 border-double ${ring}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[8px] font-medium text-seal">KV</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${dimensions[size]} shrink-0 mx-auto`}
      style={{ transform: 'rotate(-4deg)' }}
    >
      <div
        className={`absolute inset-0 rounded-full border-[3px] border-double ${ring} transition-colors duration-700`}
      />
      <div
        className={`absolute inset-[10px] rounded-full border ${ring} transition-colors duration-700`}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
        <span className={`font-mono text-[10px] uppercase tracking-[0.25em] ${text} transition-colors duration-700`}>
          {label}
        </span>
        <span className={`font-display text-xl font-semibold uppercase leading-tight mt-1 ${text} transition-colors duration-700`}>
          {verdict}
        </span>
        {reportId && (
          <span className="font-mono text-[9px] mt-2 text-seal/70">{reportId}</span>
        )}
      </div>
    </div>
  );
}
