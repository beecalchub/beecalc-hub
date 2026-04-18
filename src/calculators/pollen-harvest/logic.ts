export interface Inputs { hiveCount: number; trapDaysPerWeek: number; seasonWeeks: number; trapEfficiency: 'high' | 'medium' | 'low'; }
export interface Result { gramsPerHiveDaily: number; totalLbsSeason: number; totalKgSeason: number; estimatedValue: number; warning: string; }
export function calculate(i: Inputs): Result {
  const grams: Record<string, number> = { high: 60, medium: 40, low: 20 };
  const gramsPerHiveDaily = grams[i.trapEfficiency];
  const totalDays = i.trapDaysPerWeek * i.seasonWeeks;
  const totalGrams = gramsPerHiveDaily * i.hiveCount * totalDays;
  const totalLbs = Math.round(totalGrams / 453.6 * 10) / 10;
  const valuePerLb = 25;
  return { gramsPerHiveDaily, totalLbsSeason: totalLbs, totalKgSeason: Math.round(totalGrams / 1000 * 10) / 10, estimatedValue: Math.round(totalLbs * valuePerLb * 100) / 100, warning: 'Only trap 3-4 days per week - bees need pollen for brood rearing. Remove traps during dearth or when colony is weak.' };
}
