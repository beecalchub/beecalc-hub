export interface NectarInputs { dominantFlora: 'clover' | 'wildflower' | 'fruit-trees' | 'canola' | 'buckwheat' | 'mixed'; acreage: number; floraHealthPercent: number; weatherQuality: 'excellent' | 'good' | 'average' | 'poor'; }
export interface NectarResult { nectarLbsPerAcre: number; totalNectarLbs: number; honeyPotentialLbs: number; honeyPotentialKg: number; hivesSupported: number; qualityNote: string; }
const NECTAR_PER_ACRE: Record<string, number> = { clover: 200, wildflower: 120, 'fruit-trees': 80, canola: 300, buckwheat: 250, mixed: 150 };
export function calculateNectar(inputs: NectarInputs): NectarResult {
  const { dominantFlora, acreage, floraHealthPercent, weatherQuality } = inputs;
  const weatherMult: Record<string, number> = { excellent: 1.3, good: 1.0, average: 0.7, poor: 0.4 };
  const base = NECTAR_PER_ACRE[dominantFlora];
  const adjusted = base * (floraHealthPercent / 100) * weatherMult[weatherQuality];
  const totalNectar = Math.round(adjusted * acreage);
  const honeyLbs = Math.round(totalNectar * 0.25); // ~4 lbs nectar = 1 lb honey
  const hivesSupported = Math.max(1, Math.floor(honeyLbs / 60)); // ~60 lbs surplus per hive
  const qualityNote = honeyLbs / acreage > 40 ? 'Excellent forage density - this area can support a strong apiary.' : honeyLbs / acreage > 20 ? 'Good forage - adequate for a small to medium apiary.' : 'Limited forage - supplement with plantings or limit hive count.';
  return { nectarLbsPerAcre: Math.round(adjusted), totalNectarLbs: totalNectar, honeyPotentialLbs: honeyLbs, honeyPotentialKg: Math.round(honeyLbs * 0.4536), hivesSupported, qualityNote };
}
