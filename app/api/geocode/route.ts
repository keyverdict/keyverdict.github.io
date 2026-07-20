import { NextRequest, NextResponse } from 'next/server';

// Proxies OpenStreetMap Nominatim through our own backend rather than
// calling it directly from the browser. Two real reasons, not just style:
// 1. Nominatim's usage policy expects a proper identifying User-Agent,
//    which browsers won't let client JS set on fetch — Node can.
// 2. Keeps the API key-free geocoding swap-in-place later for a paid
//    provider (Google Places, Mapbox) without touching the frontend.
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q');
  if (!q || q.trim().length < 3) {
    return NextResponse.json([]);
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&countrycodes=in&q=${encodeURIComponent(q)}`;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'KeyVerdict-MVP/0.1 (property due-diligence prototype)',
        'Accept-Language': 'en',
      },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error(`Nominatim returned ${res.status}: ${body}`);
      return NextResponse.json([], { status: 502 });
    }

    const data = await res.json();
    const results = data.map((item: any) => ({
      label: item.display_name as string,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    }));

    return NextResponse.json(results);
  } catch (err) {
    console.error('Geocode lookup failed:', err);
    return NextResponse.json([], { status: 502 });
  }
}
