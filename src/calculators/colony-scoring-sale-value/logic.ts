export interface Inputs { framesOfBees: number; queenYearsOld: number; broodFrames: number; storesFrames: number; equipmentQuality: 'new' | 'good' | 'used'; }
export interface Result { score: number; estimatedValue: number; grade: string; note: string; }
export function calculate(i: Inputs): Result {
  const popScore = Math.min(25, i.framesOfBees * 2);
  const queenScore = i.queenYearsOld === 0 ? 20 : i.queenYearsOld < 2 ? 15 : 5;
  const broodScore = Math.min(20, i.broodFrames * 3);
  const storesScore = Math.min(15, i.storesFrames * 3);
  const equipScore: Record<string, number> = { new: 20, good: 15, used: 10 };
  const score = popScore + queenScore + broodScore + storesScore + equipScore[i.equipmentQuality];
  const baseValue = 175;
  const value = Math.round(baseValue * (score / 100) * 1.5);
  const grade = score >= 85 ? 'Premium' : score >= 70 ? 'Good' : score >= 55 ? 'Average' : 'Discount';
  return { score, estimatedValue: value, grade, note: grade === 'Premium' ? 'Can command $250-400 for this colony.' : grade === 'Good' ? 'Fair market value $150-250.' : 'Sell at discount or improve first.' };
}
