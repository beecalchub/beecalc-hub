export interface Inputs { hiveCount: number; trapType: 'screen' | 'gate' | 'none'; collectionMonths: number; }
export interface Result { gramsPerHive: number; totalGrams: number; totalOz: number; estimatedValue: number; note: string; }
export function calculate(i: Inputs): Result {
  const yieldPerMonth: Record<string, number> = { screen: 15, gate: 8, none: 2 };
  const gramsPerHive = yieldPerMonth[i.trapType] * i.collectionMonths;
  const totalGrams = gramsPerHive * i.hiveCount;
  const valuePerGram = 0.25;
  const note = i.trapType === 'screen' ? 'Propolis screens yield 3-5x more than scraping.' : i.trapType === 'none' ? 'Without a trap, yield is minimal. Install propolis traps in summer.' : 'Moderate yield with gate traps.';
  return { gramsPerHive, totalGrams, totalOz: Math.round(totalGrams / 28.35 * 10) / 10, estimatedValue: Math.round(totalGrams * valuePerGram * 100) / 100, note };
}
