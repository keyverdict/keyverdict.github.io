// Sample report content — fictional property, fictional builder, fictional
// researcher, used to demonstrate the Sample Report page. Replace with real
// report data once you're generating actual reports.

export const property = {
  name: 'Meridian Grove — Tower 3, Unit 1204',
  locality: 'Whitefield, Bangalore',
  builder: 'Ashford Developers',
  askingPrice: '₹1.42 Cr',
  size: '1,450 sq ft · 3BHK',
  reportId: 'KV-0142',
  date: '17 Jul 2026',
  researcher: 'Ananya Rao',
  researcherLine: 'Field researcher, Bangalore · 7 years in real estate legal due diligence',
};

export const goodPoints = [
  {
    title: 'RERA registration verified and active',
    detail:
      'Project registration matches unit, tower, and builder details on record. No discrepancies found between the sale agreement and the registered plan.',
  },
  {
    title: 'Asking price is close to fair market range',
    detail:
      'Within 4% of six comparable resale transactions in the same micro-market over the last six months.',
  },
  {
    title: 'No litigation history found against the builder',
    detail:
      'Checked against Karnataka RERA complaint records and consumer court filings. No active or resolved cases on record for Ashford Developers.',
  },
];

export const concerns = [
  {
    title: 'Occupancy Certificate not yet issued',
    detail:
      'Possession is being offered ahead of OC issuance for Tower 3. This can affect your home loan disbursal, insurance eligibility, and resale value until resolved.',
  },
  {
    title: "Builder's prior project had a 14-month possession delay",
    detail:
      'A comparable Ashford Developers project 2km away was delivered 14 months past its promised date. Two residents we spoke to corroborated this independently.',
  },
  {
    title: 'Payment schedule is front-loaded',
    detail:
      '70% of the payment is due before Occupancy Certificate issuance — steeper than the staggered, possession-linked schedules typical for this price band.',
  },
];

export const verifyYourself = [
  'Confirm with your bank in writing that loan disbursal is not contingent on OC issuance, or get a clear timeline if it is.',
  'Commission an independent structural/civil engineer walkthrough before making any payment past 50%.',
  "Get the builder's maintenance deposit terms confirmed in writing — verbal quotes from the sales office did not match the draft agreement.",
];

export const evidence = [
  {
    icon: 'FileText' as const,
    label: 'RERA registration record',
    detail: 'PRM/KA/RERA/1251/446/PR/240115/007xxx — cross-checked against Karnataka RERA public portal, 16 Jul 2026.',
  },
  {
    icon: 'Search' as const,
    label: 'Comparable transaction data',
    detail: 'Six resale listings in the Whitefield micro-market, verified across three independent sources.',
  },
  {
    icon: 'ScrollText' as const,
    label: 'Litigation and complaint search',
    detail: 'Karnataka RERA public complaints and district consumer forum records — no active filings against Ashford Developers.',
  },
  {
    icon: 'PhoneCall' as const,
    label: 'Resident phone verification',
    detail: "Spoke with two current residents of Ashford Developers' prior project regarding possession delay and post-handover experience.",
  },
];

export const revenueSources = [
  'A flat report fee, paid directly by the buyer, before research begins',
  'In future, anonymized aggregate risk data licensed to lenders — buyer identity never included, and only if it never influences a verdict',
];

export const refusedSources = [
  'Placement or "featured builder" fees, in any form',
  'Commission or referral fees from brokers',
  'Payment from builders or developers, for any reason',
  'Payment from listing platforms for traffic or leads',
  'Kickbacks from lenders for loan referrals sourced from a buyer relationship',
];
