import Link from 'next/link';
import Logo from './Logo';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Sample Report', href: '/sample-report' },
  { label: 'How We Make Money', href: '/how-we-make-money' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-vellum/80 border-b border-slate/10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={30} />
          <span className="font-display text-lg text-ink">KeyVerdict</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-slate">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/submit"
          className="text-sm px-5 py-2.5 rounded-full bg-seal text-vellum shrink-0 uppercase tracking-wide shadow-cta hover:shadow-[0_10px_28px_rgba(140,47,57,0.4)] transition-shadow"
        >
          Submit a Property
        </Link>
      </div>
    </header>
  );
}
