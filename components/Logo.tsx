// The KeyVerdict logo — a minted-medallion monogram. Kept deliberately
// separate from VerdictStamp: the stamp marks an actual verdict on a report,
// the logo identifies the brand. Reusing the stamp as the logo made the
// mark read as a gimmick rather than an identity — this fixes that.

export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="19" className="fill-ink" />
      <circle cx="20" cy="20" r="19" className="stroke-brass" strokeWidth="1" />
      <circle cx="20" cy="20" r="15" className="stroke-brass" strokeWidth="0.5" opacity="0.55" />
      <g strokeLinecap="round" className="stroke-vellum" strokeWidth="2.4">
        <line x1="15" y1="11" x2="15" y2="29" />
        <line x1="15" y1="20" x2="25.5" y2="11" />
        <line x1="15" y1="20.5" x2="25.5" y2="29" />
      </g>
    </svg>
  );
}
