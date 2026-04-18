export interface ProteinInputs {
  hiveCount: number;
  avgBroodFrames: number;
  naturalPollenAvailable: 'abundant' | 'moderate' | 'scarce' | 'none';
  weeksToSupplement: number;
}
export interface ProteinResult {
  proteinNeededLbs: number;
  proteinNeededKg: number;
  pattyCount8oz: number;
  pollenSubLbs: number;
  pollenSubKg: number;
  estimatedCost: number;
  recommendation: string;
}
export function calculateProteinNeed(inputs: ProteinInputs): ProteinResult {
  const { hiveCount, avgBroodFrames, naturalPollenAvailable, weeksToSupplement } = inputs;
  const pollenMult: Record<string, number> = { abundant: 0, moderate: 0.3, scarce: 0.7, none: 1.0 };
  const mult = pollenMult[naturalPollenAvailable];
  const weeklyPerHiveLbs = avgBroodFrames * 0.06 * mult;
  const totalLbs = Math.round(weeklyPerHiveLbs * hiveCount * weeksToSupplement * 10) / 10;
  const pattyCount8oz = Math.ceil(totalLbs * 2);
  const pollenSubLbs = Math.round(totalLbs * 0.35 * 10) / 10;
  let recommendation: string;
  if (mult === 0) recommendation = 'Natural pollen is abundant - no supplementation needed.';
  else if (totalLbs < 5) recommendation = 'Light supplementation. A few patties should suffice.';
  else recommendation = `Feed ${pattyCount8oz} patties (8 oz each) over ${weeksToSupplement} weeks. Replace when consumed.`;
  return {
    proteinNeededLbs: totalLbs, proteinNeededKg: Math.round(totalLbs * 0.4536 * 10) / 10,
    pattyCount8oz, pollenSubLbs, pollenSubKg: Math.round(pollenSubLbs * 0.4536 * 10) / 10,
    estimatedCost: Math.round(totalLbs * 3.5 * 100) / 100, recommendation,
  };
}
