export interface Inputs { forageAcres: number; floraQuality: 'excellent' | 'good' | 'moderate' | 'poor'; competingHivesNearby: number; }
export interface Result { maxHives: number; recommendedHives: number; note: string; }
export function calculate(i: Inputs): Result {
  const hivesPerAcre: Record<string, number> = { excellent: 2.5, good: 1.5, moderate: 0.8, poor: 0.4 };
  const maxHives = Math.floor(i.forageAcres * hivesPerAcre[i.floraQuality] - i.competingHivesNearby * 0.5);
  const recommendedHives = Math.max(1, Math.floor(maxHives * 0.7));
  const note = maxHives <= 2 ? 'Limited carrying capacity - consider improving forage or limiting hives.' : maxHives <= 10 ? 'Moderate capacity - good for hobbyist operation.' : 'Strong capacity - can support commercial-scale beekeeping.';
  return { maxHives: Math.max(1, maxHives), recommendedHives, note };
}
