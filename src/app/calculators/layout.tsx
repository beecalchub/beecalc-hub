import type { Metadata } from 'next';

// Fix #16: SEO metadata for the all-calculators page via a layout
// (Client pages can't export metadata, but their layout can)
export const metadata: Metadata = {
  title: 'All Calculators - Browse & Search',
  description:
    'Browse, search, and filter all beekeeping calculators - feeding, honey production, varroa management, business planning, and more.',
  openGraph: {
    title: 'All Beekeeping Calculators | BeeCalc Hub',
    description: 'Browse our complete library of free beekeeping calculators.',
  },
};

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
