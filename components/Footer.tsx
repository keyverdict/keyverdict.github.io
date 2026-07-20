import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate/10 mt-8">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-xs text-slate">
          KeyVerdict — an independent verification report for one property at a time.
        </p>
        <div className="flex gap-6 text-xs text-slate">
          <Link href="/how-we-make-money" className="hover:text-ink transition-colors">
            How We Make Money
          </Link>
          <Link href="/sample-report" className="hover:text-ink transition-colors">
            Sample Report
          </Link>
        </div>
      </div>
    </footer>
  );
}
