export interface Inputs { totalJars: number; jarsPerCase: number; caseType: 'cardboard' | 'plastic' | 'shrink-wrap'; }
export interface Result { casesNeeded: number; partialCaseJars: number; materialCost: number; stackableHeight: number; }
export function calculate(i: Inputs): Result {
  const full = Math.floor(i.totalJars / i.jarsPerCase);
  const partial = i.totalJars % i.jarsPerCase;
  const cases = full + (partial > 0 ? 1 : 0);
  const costs: Record<string, number> = { cardboard: 1.5, plastic: 2.5, 'shrink-wrap': 0.75 };
  const heights: Record<string, number> = { cardboard: 5, plastic: 4, 'shrink-wrap': 10 };
  return { casesNeeded: cases, partialCaseJars: partial, materialCost: Math.round(cases * costs[i.caseType] * 100) / 100, stackableHeight: heights[i.caseType] };
}
