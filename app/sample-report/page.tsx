'use client';

import {
  Search, PhoneCall, MapPin, Printer, Download, ArrowUpRight,
  AlertTriangle, CheckCircle2, HelpCircle, ScrollText, FileText,
} from 'lucide-react';
import VerdictStamp from '@/components/VerdictStamp';
import Logo from '@/components/Logo';
import SectionLabel from '@/components/SectionLabel';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  property, goodPoints, concerns, verifyYourself, evidence,
} from '@/lib/content';

const iconMap = { FileText, Search, ScrollText, PhoneCall };

const navSections = [
  { index: 1, title: 'Property Summary' },
  { index: 2, title: "What's Good" },
  { index: 3, title: "What's Concerning" },
  { index: 4, title: 'Verify Yourself' },
  { index: 5, title: 'Evidence Trail' },
  { index: 6, title: 'Negotiation Guidance' },
];

export default function SampleReport() {
  return (
    <>
      <header className="border-b border-slate/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={30} />
            <span className="font-display text-lg text-ink">KeyVerdict</span>
          </Link>
          <div className="flex items-center gap-5 text-sm text-slate">
            <button onClick={() => window.print()} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface shadow-card hover:shadow-card-hover transition-shadow">
              <Printer size={15} /> Print
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface shadow-card hover:shadow-card-hover transition-shadow">
              <Download size={15} /> Download PDF
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass mb-4">Sample Report — Confidential</p>
        <h1 className="font-display text-3xl md:text-4xl text-ink mb-2 max-w-2xl">{property.name}</h1>
        <p className="flex items-center gap-1.5 text-sm text-slate mb-16">
          <MapPin size={14} /> {property.locality}
        </p>

        <div className="grid lg:grid-cols-[280px_1fr] gap-16">
          <aside className="lg:sticky lg:top-10 lg:self-start space-y-10 order-first">
            <VerdictStamp reportId={property.reportId} />
            <p className="font-serif italic text-[15px] leading-relaxed text-ink">
              "Proceed only if the builder commits, in writing, to an OC issuance
              timeline and the payment schedule is renegotiated to release less
              before that milestone."
            </p>
            <nav className="space-y-2.5 text-sm border-t border-slate/10 pt-6">
              {navSections.map((s) => (
                <a key={s.index} href={`#section-${s.index}`} className="flex items-center gap-2 hover:opacity-70 transition-opacity text-slate">
                  <span className="font-mono text-xs text-brass">§{String(s.index).padStart(2, '0')}</span>
                  {s.title}
                </a>
              ))}
            </nav>
            <div className="pt-6 border-t border-slate/10 text-xs space-y-1.5 text-slate">
              <div className="flex justify-between"><span>Asking price</span><span className="font-mono text-ink">{property.askingPrice}</span></div>
              <div className="flex justify-between"><span>Size</span><span className="font-mono text-ink">{property.size}</span></div>
              <div className="flex justify-between"><span>Builder</span><span className="font-mono text-ink">{property.builder}</span></div>
              <div className="flex justify-between"><span>Report date</span><span className="font-mono text-ink">{property.date}</span></div>
            </div>
          </aside>

          <main className="space-y-20">
            <section>
              <SectionLabel index={1} title="Property Summary" />
              <div className="rounded-2xl p-6 flex items-center gap-4 bg-surface shadow-card">
                <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-vellum">
                  <span className="font-display text-sm text-ink">
                    {property.researcher.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">Verified by {property.researcher}</p>
                  <p className="text-xs mt-0.5 text-slate">{property.researcherLine}</p>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed mt-6 max-w-2xl text-ink">
                A 3BHK unit on the 12th floor of Tower 3, offered at {property.askingPrice}
                {' '}against a builder-quoted possession this quarter. This report covers
                title and registration checks, price benchmarking against recent resales,
                builder track record, and a direct site and resident verification.
              </p>
            </section>

            <section>
              <SectionLabel index={2} title="What's Good" />
              <div className="space-y-5">
                {goodPoints.map((point, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle2 size={20} className="shrink-0 mt-0.5 text-proceed" />
                    <div>
                      <p className="text-[15px] font-medium text-ink">{point.title}</p>
                      <p className="text-sm leading-relaxed mt-1 max-w-2xl text-slate">{point.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionLabel index={3} title="What's Concerning" />
              <div className="space-y-5">
                {concerns.map((point, i) => (
                  <div key={i} className="flex gap-4">
                    <AlertTriangle size={20} className="shrink-0 mt-0.5 text-seal" />
                    <div>
                      <p className="text-[15px] font-medium text-ink">{point.title}</p>
                      <p className="text-sm leading-relaxed mt-1 max-w-2xl text-slate">{point.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionLabel index={4} title="Verify Yourself" />
              <p className="text-sm mb-5 max-w-2xl text-slate">
                Outside what we can independently verify. Handle these before you sign.
              </p>
              <div className="space-y-4">
                {verifyYourself.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <HelpCircle size={20} className="shrink-0 mt-0.5 text-brass" />
                    <p className="text-[15px] leading-relaxed max-w-2xl text-ink">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionLabel index={5} title="Evidence Trail" />
              <div className="space-y-4">
                {evidence.map((item, i) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <div key={i} className="flex items-start justify-between gap-4 py-4 border-t border-slate/10">
                      <div className="flex gap-3">
                        <Icon size={17} className="shrink-0 mt-0.5 text-brass" />
                        <div>
                          <p className="text-sm font-medium text-ink">{item.label}</p>
                          <p className="text-xs leading-relaxed mt-1 max-w-xl text-slate">{item.detail}</p>
                        </div>
                      </div>
                      <ArrowUpRight size={15} className="shrink-0 mt-1 text-slate" />
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <SectionLabel index={6} title="Negotiation Guidance" />
              <div className="p-6 rounded-2xl bg-surface shadow-card">
                <p className="text-[15px] leading-relaxed max-w-2xl text-ink">
                  Given the front-loaded payment schedule and pending Occupancy Certificate,
                  we recommend renegotiating to a staggered, possession-linked schedule —
                  no more than 50% paid before OC issuance — and requesting a written
                  commitment on OC timeline before signing. Builders in this micro-market
                  have accepted comparable terms in recent transactions.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>

      <footer className="border-t border-slate/10 mt-8">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs max-w-md leading-relaxed text-slate">
            This report reflects independent research as of {property.date} and is not
            legal or financial advice. KeyVerdict accepts no payment from builders,
            brokers, or listing platforms.
          </p>
          <Link href="/how-we-make-money" className="text-xs underline underline-offset-4 hover:opacity-70 transition-opacity shrink-0 text-ink">
            How we make money →
          </Link>
        </div>
      </footer>
    </>
  );
}
