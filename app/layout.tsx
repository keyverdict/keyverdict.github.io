import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KeyVerdict — Never buy a property without a verdict',
  description:
    'An independent verification report for one property at a time. We take no money from builders, brokers, or listing platforms.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
