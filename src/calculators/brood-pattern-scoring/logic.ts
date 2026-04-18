export interface Inputs { emptyCells: number; totalCells: number; cappedRatio: number; solidityVisual: 'solid' | 'mostly-solid' | 'mixed' | 'spotty'; }
export interface Result { score: number; grade: string; emptyPercent: number; diagnosis: string; }
export function calculate(i: Inputs): Result {
  const emptyPct = i.totalCells > 0 ? Math.round(i.emptyCells / i.totalCells * 1000) / 10 : 0;
  const visualScore: Record<string, number> = { solid: 40, 'mostly-solid': 30, mixed: 15, spotty: 5 };
  let score = 30 - emptyPct + visualScore[i.solidityVisual] + (i.cappedRatio >= 80 ? 30 : i.cappedRatio >= 60 ? 20 : 10);
  score = Math.max(0, Math.min(100, score));
  const grade = score >= 80 ? 'A - Excellent' : score >= 65 ? 'B - Good' : score >= 50 ? 'C - Fair' : score >= 30 ? 'D - Poor' : 'F - Failing';
  const diagnosis = score >= 65 ? 'Healthy queen laying well.' : score >= 50 ? 'Minor issues - monitor closely.' : 'Poor pattern suggests failing queen, disease, or nutrition issues.';
  return { score, grade, emptyPercent: emptyPct, diagnosis };
}
