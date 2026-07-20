import { CheckCircle2, AlertTriangle } from 'lucide-react';

// A compact visual preview of an actual report — used in the Home hero so
// a first-time visitor immediately sees "this is a real, structured
// product," rather than only an abstract brand mark.
export default function ReportPreviewCard() {
  return (
    <div className="bg-surface rounded-2xl shadow-card-hover border border-slate/10 p-6 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[11px] text-slate">KV-0142</span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-brass bg-brass/10 px-2 py-1 rounded-full">
          Sample
        </span>
      </div>

      <span className="inline-block font-display text-sm uppercase tracking-wide text-seal bg-seal/10 px-3 py-1.5 rounded-full mb-5">
        Proceed with Caution
      </span>

      <div className="space-y-3 mb-5">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 size={15} className="text-proceed shrink-0" />
          <div className="h-2 rounded-full bg-vellum-dark w-[85%]" />
        </div>
        <div className="flex items-center gap-2.5">
          <CheckCircle2 size={15} className="text-proceed shrink-0" />
          <div className="h-2 rounded-full bg-vellum-dark w-[65%]" />
        </div>
        <div className="flex items-center gap-2.5">
          <AlertTriangle size={15} className="text-seal shrink-0" />
          <div className="h-2 rounded-full bg-vellum-dark w-[75%]" />
        </div>
        <div className="flex items-center gap-2.5">
          <AlertTriangle size={15} className="text-seal shrink-0" />
          <div className="h-2 rounded-full bg-vellum-dark w-[55%]" />
        </div>
      </div>

      <div className="pt-4 border-t border-slate/10">
        <span className="text-xs text-slate">Verified by Ananya Rao · Bangalore</span>
      </div>
    </div>
  );
}
