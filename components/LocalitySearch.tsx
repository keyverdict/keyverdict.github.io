'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';

interface GeocodeResult {
  label: string;
  lat: number;
  lng: number;
}

interface LocalitySearchProps {
  value: string;
  onChange: (label: string) => void;
  onSelect: (result: GeocodeResult) => void;
}

export default function LocalitySearch({ value, onChange, onSelect }: LocalitySearchProps) {
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!value || value.trim().length < 3) {
      setResults([]);
      return;
    }
    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setResults(data);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 450);
    return () => clearTimeout(debounceRef.current);
  }, [value]);

  return (
    <div className="relative">
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
        <input
          className="w-full pl-11 pr-10 py-3 rounded-xl border text-[15px] outline-none bg-surface border-slate/25 text-ink focus:border-seal transition-colors"
          placeholder="Search a locality or city — e.g. Whitefield, Bangalore"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />
        {loading && (
          <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate animate-spin" />
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-surface rounded-xl shadow-card-hover border border-slate/10 overflow-hidden">
          {results.map((r, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                onChange(r.label);
                onSelect(r);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-vellum-dark transition-colors flex items-start gap-2.5 border-b border-slate/10 last:border-0"
            >
              <MapPin size={14} className="shrink-0 mt-1 text-brass" />
              <span className="text-sm text-ink leading-snug">{r.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
