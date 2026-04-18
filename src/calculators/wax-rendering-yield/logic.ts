export interface Inputs { rawWaxLbs: number; method: 'solar' | 'hot-water' | 'steam' | 'electric'; cleanliness: 'dirty' | 'medium' | 'clean'; }
export interface Result { yieldPercent: number; cleanWaxLbs: number; slumgumLbs: number; valueEstimate: number; note: string; }
export function calculate(i: Inputs): Result {
  const methodYield: Record<string, number> = { solar: 70, 'hot-water': 80, steam: 85, electric: 88 };
  const cleanMult: Record<string, number> = { dirty: 0.85, medium: 1.0, clean: 1.1 };
  const yieldPercent = Math.min(95, Math.round(methodYield[i.method] * cleanMult[i.cleanliness]));
  const cleanWaxLbs = Math.round(i.rawWaxLbs * yieldPercent / 100 * 100) / 100;
  const slumgumLbs = Math.round((i.rawWaxLbs - cleanWaxLbs) * 100) / 100;
  const valueEstimate = Math.round(cleanWaxLbs * 12 * 100) / 100;
  const note = i.method === 'solar' ? 'Solar melters are energy-free but lower yield. Best for small batches.' : i.method === 'steam' ? 'Steam rendering produces the cleanest wax with high yield.' : 'Multiple render passes improve final quality.';
  return { yieldPercent, cleanWaxLbs, slumgumLbs, valueEstimate, note };
}
