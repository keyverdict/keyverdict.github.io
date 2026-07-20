import Link from 'next/link';
import { ArrowRight, Search, PhoneCall, ScrollText, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReportPreviewCard from '@/components/ReportPreviewCard';

const perspectives = [
  { who: 'What a broker tells you', what: 'Whatever closes the sale fastest. Their fee depends on it.' },
  { who: 'What a builder tells you', what: "The project's strengths, marketed. Rarely its history." },
  { who: 'What we tell you', what: "What we'd tell a friend — good, bad, and what to check yourself." },
];

const steps = [
  { n: '1', title: 'You submit a property', detail: 'Location, builder, asking price, and what you already know.' },
  { n: '2', title: 'We research it', detail: 'Title and registration checks, price benchmarking, builder history, site and resident verification.' },
  { n: '3', title: 'You get a verdict', detail: 'Proceed, proceed with conditions, or avoid — with the evidence behind it, in 24–48 hours.' },
];

const evidenceIcons = [Search, PhoneCall, ScrollText, FileText];

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero — two column: copy + CTA on the left, a real report preview on the right */}
      <section className="max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass mb-6">
              An independent second opinion, before you buy
            </p>
            <h1 className="font-display text-4xl md:text-[46px] leading-[1.1] text-ink mb-6">
              You&apos;re about to spend your life&apos;s savings.
              <br />Someone should check first.
            </h1>
            <p className="text-lg leading-relaxed text-slate mb-10 max-w-md">
              An independent verification report for one property at a
              time — researched by a person, not sold by one. We take no
              money from builders, brokers, or listing platforms.
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <Link
                href="/sample-report"
                className="flex items-center gap-2 text-sm px-6 py-3.5 rounded-full bg-seal text-vellum uppercase tracking-wide shadow-cta hover:shadow-[0_10px_30px_rgba(140,47,57,0.4)] transition-shadow"
              >
                Read a Sample Report <ArrowRight size={15} />
              </Link>
              <Link href="/submit" className="text-sm underline underline-offset-4 text-slate hover:text-ink transition-colors">
                Submit a property instead
              </Link>
            </div>
          </div>

          <ReportPreviewCard />
        </div>
      </section>

      {/* The problem: three perspectives */}
      <section className="border-t border-slate/10">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-brass mb-10 text-center">
            Everyone in the room has an incentive except you
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {perspectives.map((p, i) => (
              <div
                key={i}
                className={`rounded-2xl p-7 ${i === 2 ? 'bg-ink shadow-card-hover' : 'bg-surface shadow-card'}`}
              >
                <p className={`font-display text-lg mb-3 ${i === 2 ? 'text-vellum' : 'text-ink'}`}>{p.who}</p>
                <p className={`text-[15px] leading-relaxed ${i === 2 ? 'text-vellum/70' : 'text-slate'}`}>{p.what}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate/10">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="font-display text-2xl md:text-3xl text-ink mb-14 text-center">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="bg-surface rounded-2xl shadow-card p-7">
                <span className="font-display text-4xl text-brass">{s.n}</span>
                <p className="text-[17px] font-medium text-ink mt-4 mb-2">{s.title}</p>
                <p className="text-sm leading-relaxed text-slate">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence icons strip */}
      <section className="border-t border-slate/10">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-sm text-center text-slate mb-10 max-w-lg mx-auto">
            Every claim in a report links back to how we checked it — a document,
            a phone call, a site visit, a public record.
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {evidenceIcons.map((Icon, i) => (
              <div key={i} className="w-14 h-14 rounded-full bg-surface shadow-card flex items-center justify-center">
                <Icon size={20} className="text-brass" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-slate/10">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="font-serif italic text-xl leading-relaxed text-ink mb-8 max-w-xl mx-auto">
            &quot;We&apos;re paid by you. Only you. Here&apos;s exactly how, in writing.&quot;
          </p>
          <Link href="/how-we-make-money" className="text-sm underline underline-offset-4 text-slate hover:text-ink transition-colors">
            Read how we make money →
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate/10">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="font-display text-3xl text-ink mb-8">Never buy a property without a verdict.</h2>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 text-sm px-7 py-4 rounded-full bg-seal text-vellum uppercase tracking-wide shadow-cta hover:shadow-[0_10px_30px_rgba(140,47,57,0.4)] transition-shadow"
          >
            Submit a Property <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
