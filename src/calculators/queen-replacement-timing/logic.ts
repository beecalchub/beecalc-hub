export interface Inputs { queenAgeYears: number; broodPatternQuality: 'excellent' | 'fair' | 'spotty'; temperament: 'calm' | 'moderate' | 'defensive'; honeyProduction: 'high' | 'average' | 'low'; }
export interface Result { shouldReplace: boolean; urgency: string; reasons: string[]; timing: string; }
export function calculate(i: Inputs): Result {
  let score = 0;
  const reasons: string[] = [];
  if (i.queenAgeYears >= 2) { score += 2; reasons.push('Queen is ' + i.queenAgeYears + ' years old (typical replacement at 2+ years)'); }
  if (i.broodPatternQuality === 'spotty') { score += 3; reasons.push('Spotty brood pattern indicates failing queen'); }
  else if (i.broodPatternQuality === 'fair') { score += 1; reasons.push('Brood pattern is less than ideal'); }
  if (i.temperament === 'defensive') { score += 2; reasons.push('Defensive temperament suggests poor queen genetics'); }
  if (i.honeyProduction === 'low') { score += 1; reasons.push('Lower than average honey production'); }
  const shouldReplace = score >= 3;
  const urgency = score >= 5 ? 'Replace immediately' : score >= 3 ? 'Replace this season' : 'Monitor - no rush';
  const timing = shouldReplace ? 'Late spring through mid-summer is ideal for requeening. Order now.' : 'Queen is performing well. Check again in 1 month.';
  return { shouldReplace, urgency, reasons, timing };
}
