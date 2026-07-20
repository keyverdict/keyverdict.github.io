import Link from 'next/link';
import { CheckCircle2, XCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { revenueSources, refusedSources } from '@/lib/content';

export const metadata = { title: 'How We Make Money — KeyVerdict' };

export default function HowWeMakeMoney() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass mb-5">How We Make Money</p>
        <h1 className="font-display text-3xl md:text-[40px] leading-tight text-ink mb-5">
          Here's exactly who pays us — and who doesn't.
        </h1>
        <p className="font-serif italic text-lg leading-relaxed text-slate max-w-xl">
          The moment you have to wonder who's really paying for a verdict, it stops
          meaning anything. So we're stating it plainly, not burying it in a footer.
        </p>

        <div className="mt-16 border-t border-slate/15">
          <div className="grid md:grid-cols-2">
            <div className="py-8 md:pr-10 md:border-r border-slate/10">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-proceed mb-6">
                Where our revenue comes from
              </p>
              <div className="space-y-5">
                {revenueSources.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-proceed" />
                    <p className="text-[15px] leading-relaxed text-ink">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-8 md:pl-10">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-seal mb-6">
                What we refuse to accept
              </p>
              <div className="space-y-5">
                {refusedSources.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <XCircle size={18} className="shrink-0 mt-0.5 text-seal" />
                    <p className="text-[15px] leading-relaxed text-ink">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-display text-2xl text-ink mb-4">What happens when the verdict is "avoid"?</h2>
          <p className="text-[15px] leading-relaxed text-slate max-w-xl">
            We keep the fee. We don't offer refunds based on outcome — deliberately.
            A policy that refunds unhappy news would quietly train us to find happy
            news instead. You're paying for the check, not for a particular answer.
          </p>
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-surface shadow-card border border-brass/20">
          <div className="flex items-start gap-4">
            <ShieldCheck size={22} className="shrink-0 mt-1 text-brass" />
            <div>
              <h3 className="font-display text-xl text-ink mb-2">The Compromise Guarantee</h3>
              <p className="text-[15px] leading-relaxed text-ink max-w-xl">
                If you ever find evidence that we took money from a builder, broker,
                lender, or listing platform tied to your report, email us. We'll refund
                the full fee and publish exactly what happened — no internal review,
                no negotiation.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex items-center gap-6 flex-wrap">
          <Link
            href="/sample-report"
            className="flex items-center gap-2 text-sm px-6 py-3.5 rounded-full bg-seal text-vellum uppercase tracking-wide shadow-cta hover:shadow-[0_10px_30px_rgba(140,47,57,0.4)] transition-shadow"
          >
            Read a Sample Report <ArrowRight size={15} />
          </Link>
          <Link href="/submit" className="text-sm underline underline-offset-4 text-slate">
            Or submit a property directly
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
