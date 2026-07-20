import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// MVP-appropriate storage: a flat JSON file, not a database. Per the Wizard-
// of-Oz MVP strategy — this is meant to be opened and read by a human, not
// queried. Swap for Postgres once submission volume actually justifies it.
const DATA_FILE = path.join(process.cwd(), 'data', 'submissions.json');

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.email || !body.locality) {
      return NextResponse.json(
        { error: 'Missing required fields: email and locality.' },
        { status: 400 }
      );
    }

    ensureDataFile();
    const existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

    const submission = {
      id: `KV-${Date.now().toString(36).toUpperCase()}`,
      submittedAt: new Date().toISOString(),
      status: 'received',
      ...body,
    };

    existing.push(submission);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2));

    // TODO: replace this with a real notification — Resend/SendGrid email to
    // the founder, or a Slack webhook. Needs an API key you provide; the
    // storage above works today without one.
    console.log(`New submission ${submission.id} — notify founder:`, submission);

    return NextResponse.json({ id: submission.id, status: 'received' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}

// Basic "admin view" without building an admin UI — open this route in a
// browser to see every submission as JSON.
export async function GET() {
  ensureDataFile();
  const existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  return NextResponse.json(existing);
}
