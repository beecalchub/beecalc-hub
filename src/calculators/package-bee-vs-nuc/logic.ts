export interface PkgVsNucInputs { packageCost: number; nucCost: number; hiveCount: number; honeyPricePerLb: number; }
export interface PkgVsNucResult { comparison: Array<{ factor: string; package_: string; nuc: string; winner: 'package' | 'nuc' | 'tie' }>; packageFirstYearHoney: number; nucFirstYearHoney: number; packageNetCost: number; nucNetCost: number; recommendation: string; }
export function calculatePkgVsNuc(inputs: PkgVsNucInputs): PkgVsNucResult {
  const { packageCost, nucCost, hiveCount, honeyPricePerLb } = inputs;
  const pkgHoney = 10; const nucHoney = 30; // first-year lbs surplus
  const pkgRevenue = pkgHoney * honeyPricePerLb; const nucRevenue = nucHoney * honeyPricePerLb;
  const comparison = [
    { factor: 'Cost', package_: `${(packageCost * hiveCount).toFixed(0)}`, nuc: `${(nucCost * hiveCount).toFixed(0)}`, winner: packageCost < nucCost ? 'package' as const : 'nuc' as const },
    { factor: 'First-year honey', package_: `~${pkgHoney} lbs/hive`, nuc: `~${nucHoney} lbs/hive`, winner: 'nuc' as const },
    { factor: 'Build-up speed', package_: '8–12 weeks to full strength', nuc: '4–6 weeks (already established)', winner: 'nuc' as const },
    { factor: 'Queen acceptance', package_: 'Sometimes rejected (5–10%)', nuc: 'Already accepted and laying', winner: 'nuc' as const },
    { factor: 'Drawn comb', package_: 'None - must build from scratch', nuc: '5 frames of drawn comb', winner: 'nuc' as const },
    { factor: 'Availability', package_: 'Widely available, ships easily', nuc: 'Local pickup usually required', winner: 'package' as const },
    { factor: 'Swarm risk (yr 1)', package_: 'Low', nuc: 'Moderate (strong early)', winner: 'package' as const },
    { factor: 'Disease risk', package_: 'Lower (new comb)', nuc: 'Check source reputation', winner: 'package' as const },
  ];
  const recommendation = nucCost - packageCost < 50 ? 'Nucs are worth the extra cost for beginners - the head start in comb, brood, and population makes a huge difference in first-year success.' : nucCost > packageCost * 1.5 ? 'Nucs are significantly more expensive in your area. Packages are a solid choice if you can feed aggressively in spring.' : 'Both options work well. Nucs give a faster start; packages are more affordable and easier to find.';
  return { comparison, packageFirstYearHoney: pkgHoney * hiveCount, nucFirstYearHoney: nucHoney * hiveCount, packageNetCost: Math.round(packageCost * hiveCount - pkgRevenue * hiveCount), nucNetCost: Math.round(nucCost * hiveCount - nucRevenue * hiveCount), recommendation };
}
