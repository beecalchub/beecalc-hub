export interface Inputs { apiary1Hives: number; apiary1Yield: number; apiary1Losses: number; apiary2Hives: number; apiary2Yield: number; apiary2Losses: number; }
export interface Result { apiary1PerHive: number; apiary2PerHive: number; betterApiary: string; yieldDifference: number; recommendation: string; }
export function calculate(i: Inputs): Result {
  const a1 = Math.round(i.apiary1Yield / Math.max(1, i.apiary1Hives) * 10) / 10;
  const a2 = Math.round(i.apiary2Yield / Math.max(1, i.apiary2Hives) * 10) / 10;
  const diff = Math.round((a1 - a2) * 10) / 10;
  const better = a1 > a2 ? 'Apiary 1' : a2 > a1 ? 'Apiary 2' : 'Tied';
  const rec = Math.abs(diff) > 15 ? `${better} significantly outperforms - investigate forage, management, or pest differences.` : 'Apiaries performing similarly - minor differences normal.';
  return { apiary1PerHive: a1, apiary2PerHive: a2, betterApiary: better, yieldDifference: Math.abs(diff), recommendation: rec };
}
