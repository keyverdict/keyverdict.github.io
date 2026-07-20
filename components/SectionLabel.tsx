// Legal-memo style clause numbering (§01, §02…) rather than a generic
// 01/02/03 process badge — justified because the report is structured as a
// numbered document, the way a due-diligence memo actually is.

interface SectionLabelProps {
  index: number;
  title: string;
}

export default function SectionLabel({ index, title }: SectionLabelProps) {
  return (
    <div className="flex items-baseline gap-3 mb-6" id={`section-${index}`}>
      <span className="font-mono text-xs tracking-widest text-brass">
        §{String(index).padStart(2, '0')}
      </span>
      <h2 className="font-display text-2xl md:text-[28px] text-ink">{title}</h2>
    </div>
  );
}
