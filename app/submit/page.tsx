'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import VerdictStamp from '@/components/VerdictStamp';
import Logo from '@/components/Logo';
import LocalitySearch from '@/components/LocalitySearch';

const LocationPicker = dynamic(() => import('@/components/LocationPicker'), {
  ssr: false,
  loading: () => (
    <div className="h-[260px] rounded-xl border border-slate/25 flex items-center justify-center text-sm text-slate">
      Loading map…
    </div>
  ),
});

// Steps reordered deliberately to reduce drop-off:
// 1. Locality search — fast, satisfying, low-effort "quick win" first.
// 2. Property basics — a bit more typing, but momentum is already built.
// 3. Pin exact location — the heaviest interaction, isolated and skippable
//    so it never blocks someone from finishing.
// 4. Contact — email asked for last, not first, which is the single
//    biggest lever against early abandonment on intake forms.
const steps = ['Location', 'Property', 'Pin It', 'Contact'];

interface FormState {
  locality: string;
  building: string;
  builder: string;
  price: string;
  size: string;
  possession: string;
  email: string;
  phone: string;
  notes: string;
}

const emptyForm: FormState = {
  locality: '', building: '', builder: '',
  price: '', size: '', possession: '',
  email: '', phone: '', notes: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Submit() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState<FormState>(emptyForm);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const markTouched = (key: string) => setTouched((t) => ({ ...t, [key]: true }));

  // Real per-step validation — this is what stops an empty form from
  // advancing. Each step declares what it actually needs before "Continue"
  // is allowed to do anything.
  const stepErrors: Record<number, Record<string, string>> = {
    0: { locality: form.locality.trim().length < 3 ? 'Enter at least 3 characters so we can search for it.' : '' },
    1: {
      building: form.building.trim() === '' ? 'Building or project name is required.' : '',
      price: form.price.trim() === '' ? 'Asking price is required.' : '',
      size: form.size.trim() === '' ? 'Size or configuration is required.' : '',
    },
    2: {}, // pinning the map is optional by design
    3: {
      email: form.email.trim() === '' ? 'Email is required.' : !EMAIL_RE.test(form.email) ? 'That doesn\u2019t look like a valid email address.' : '',
    },
  };

  const currentErrors = stepErrors[step];
  const isStepValid = Object.values(currentErrors).every((v) => v === '');

  const field = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-[15px] outline-none bg-surface text-ink transition-colors ${
      hasError ? 'border-seal focus:border-seal' : 'border-slate/25 focus:border-brass'
    }`;
  const label = 'block text-sm mb-2 text-slate';
  const errorText = 'text-xs text-seal mt-1.5';
  const button = 'flex items-center gap-2 text-sm px-6 py-3.5 rounded-full bg-seal text-vellum uppercase tracking-wide shadow-cta hover:shadow-[0_10px_30px_rgba(140,47,57,0.4)] transition-all disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none';

  const touchAllInStep = () => {
    const keys = Object.keys(currentErrors);
    setTouched((t) => {
      const next = { ...t };
      keys.forEach((k) => { next[k] = true; });
      return next;
    });
  };

  const next = () => {
    if (!isStepValid) {
      touchAllInStep();
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const skipPin = () => setStep((s) => Math.min(s + 1, steps.length - 1));

  const handleSubmit = async () => {
    if (!isStepValid) {
      touchAllInStep();
      return;
    }
    setSubmitting(true);
    setServerError('');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, location }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed');
      }
      setSubmitted(true);
    } catch {
      setServerError("We couldn't submit this — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center">
        <div className="max-w-md mx-auto px-6 py-24 text-center">
          <VerdictStamp filled label="Received" verdict="Submission" />
          <h1 className="font-display text-2xl text-ink mt-10 mb-4">We&apos;ve got it.</h1>
          <p className="text-[15px] leading-relaxed text-slate mb-8">
            We&apos;ll email you at <span className="text-ink font-medium">{form.email}</span> within
            24–48 hours with your report. Verified research takes real time — that
            wait is the point.
          </p>
          <Link href="/" className="text-sm underline underline-offset-4 text-slate">
            Back to home →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate/15">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-2.5">
          <Logo size={30} />
          <span className="font-display text-lg text-ink">KeyVerdict</span>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-16 md:py-20">
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-brass">
              Step {step + 1} of {steps.length} — {steps[step]}
            </span>
            {step === 0 && <span className="text-xs text-slate">~2 minutes</span>}
          </div>
          <div className="h-[3px] w-full rounded-full bg-slate/15">
            <div
              className="h-[3px] rounded-full bg-seal transition-all duration-500"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 0 — Location (quick win first) */}
        {step === 0 && (
          <div className="space-y-6">
            <h1 className="font-display text-2xl text-ink mb-2">Where is the property?</h1>
            <p className="text-sm text-slate -mt-4 mb-2">Start typing — we&apos;ll search real locations as you go.</p>
            <div>
              <LocalitySearch
                value={form.locality}
                onChange={(v) => setForm({ ...form, locality: v })}
                onSelect={(r) => setLocation({ lat: r.lat, lng: r.lng })}
              />
              {touched.locality && currentErrors.locality && (
                <p className={errorText}>{currentErrors.locality}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 1 — Property basics */}
        {step === 1 && (
          <div className="space-y-6">
            <h1 className="font-display text-2xl text-ink mb-2">Tell us about the property</h1>
            <div>
              <label className={label}>Building / project name</label>
              <input
                className={field(!!(touched.building && currentErrors.building))}
                placeholder="e.g. Meridian Grove, Tower 3"
                value={form.building}
                onChange={update('building')}
                onBlur={() => markTouched('building')}
              />
              {touched.building && currentErrors.building && <p className={errorText}>{currentErrors.building}</p>}
            </div>
            <div>
              <label className={label}>Builder / developer name (optional)</label>
              <input className={field(false)} placeholder="e.g. Ashford Developers" value={form.builder} onChange={update('builder')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={label}>Asking price</label>
                <input
                  className={field(!!(touched.price && currentErrors.price))}
                  placeholder="₹1.42 Cr"
                  value={form.price}
                  onChange={update('price')}
                  onBlur={() => markTouched('price')}
                />
                {touched.price && currentErrors.price && <p className={errorText}>{currentErrors.price}</p>}
              </div>
              <div>
                <label className={label}>Size / config</label>
                <input
                  className={field(!!(touched.size && currentErrors.size))}
                  placeholder="1,450 sq ft · 3BHK"
                  value={form.size}
                  onChange={update('size')}
                  onBlur={() => markTouched('size')}
                />
                {touched.size && currentErrors.size && <p className={errorText}>{currentErrors.size}</p>}
              </div>
            </div>
            <div>
              <label className={label}>Possession status (optional)</label>
              <select className={field(false)} value={form.possession} onChange={update('possession')}>
                <option value="">Select one</option>
                <option value="ready">Ready to move in</option>
                <option value="under-construction">Under construction</option>
                <option value="not-sure">Not sure</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 2 — Pin it (optional, isolated so it never blocks) */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-display text-2xl text-ink mb-2">Pin the exact spot</h1>
              <span className="text-xs uppercase tracking-wide text-brass shrink-0 mt-1.5">Optional</span>
            </div>
            <p className="text-sm text-slate -mt-4">
              Helps our researcher find the right building on the first visit. Skip this if you&apos;re not sure yet.
            </p>
            <LocationPicker
              initialPosition={location ? [location.lat, location.lng] : undefined}
              onChange={(lat, lng) => setLocation({ lat, lng })}
            />
            {location && (
              <p className="text-xs text-slate font-mono">
                Pinned: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
              </p>
            )}
          </div>
        )}

        {/* Step 3 — Contact, asked last */}
        {step === 3 && (
          <div className="space-y-6">
            <h1 className="font-display text-2xl text-ink mb-2">Where should we send your report?</h1>
            <div>
              <label className={label}>Email</label>
              <input
                className={field(!!(touched.email && currentErrors.email))}
                placeholder="you@example.com"
                value={form.email}
                onChange={update('email')}
                onBlur={() => markTouched('email')}
              />
              {touched.email && currentErrors.email && <p className={errorText}>{currentErrors.email}</p>}
            </div>
            <div>
              <label className={label}>Phone (optional)</label>
              <input className={field(false)} placeholder="For urgent findings only" value={form.phone} onChange={update('phone')} />
            </div>
            <div>
              <label className={label}>Anything you already know or are unsure about? (optional)</label>
              <textarea className={field(false)} style={{ minHeight: '96px' }} placeholder="Helps us focus the research" value={form.notes} onChange={update('notes')} />
            </div>
            <div className="flex items-start gap-3 pt-2">
              <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-proceed" />
              <p className="text-xs leading-relaxed text-slate">
                We&apos;ll tell you not to buy if that&apos;s the honest answer. Most reports
                come back &quot;proceed with conditions,&quot; not a flat yes or no.
              </p>
            </div>
            {serverError && (
              <div className="flex items-start gap-3 pt-2">
                <AlertTriangle size={16} className="shrink-0 mt-0.5 text-seal" />
                <p className="text-xs leading-relaxed text-seal">{serverError}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-12">
          {step > 0 ? (
            <button onClick={back} className="flex items-center gap-2 text-sm text-slate">
              <ArrowLeft size={15} /> Back
            </button>
          ) : <span />}

          <div className="flex items-center gap-4">
            {step === 2 && (
              <button onClick={skipPin} className="text-sm text-slate underline underline-offset-4">
                Skip
              </button>
            )}
            {step < steps.length - 1 ? (
              <button onClick={next} className={button}>
                Continue <ArrowRight size={15} />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting} className={button}>
                {submitting ? 'Submitting…' : 'Submit Property'} <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
