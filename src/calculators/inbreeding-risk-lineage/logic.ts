export interface Inputs { generationsTracked: number; breederColoniesUsed: number; outcrossFrequency: 'annual' | 'biennial' | 'rare' | 'never'; }
export interface Result { inbreedingRiskPercent: number; riskLevel: string; recommendation: string; }
export function calculate(i: Inputs): Result {
  const outcrossPenalty: Record<string, number> = { annual: 5, biennial: 15, rare: 40, never: 70 };
  const genPenalty = Math.min(30, i.generationsTracked * 3);
  const colonyBonus = Math.min(30, i.breederColoniesUsed * 2);
  const risk = Math.max(0, outcrossPenalty[i.outcrossFrequency] + genPenalty - colonyBonus);
  const level = risk < 20 ? 'Low' : risk < 50 ? 'Moderate' : 'High';
  const rec = risk >= 50 ? 'Introduce fresh genetics immediately. Import breeder queens.' : risk >= 20 ? 'Plan outcross within 1-2 seasons.' : 'Genetics remain diverse.';
  return { inbreedingRiskPercent: risk, riskLevel: level, recommendation: rec };
}
