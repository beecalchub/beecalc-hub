export interface Inputs { graftsAttempted: number; graftsAccepted: number; larvaeAge: 'under-24h' | '24-36h' | 'over-36h'; starterStrength: 'strong' | 'moderate' | 'weak'; }
export interface Result { acceptancePercent: number; grade: string; tips: string[]; }
export function calculate(i: Inputs): Result {
  const pct = i.graftsAttempted > 0 ? Math.round(i.graftsAccepted / i.graftsAttempted * 1000) / 10 : 0;
  const grade = pct >= 80 ? 'A - Excellent' : pct >= 60 ? 'B - Good' : pct >= 40 ? 'C - Fair' : 'D - Needs improvement';
  const tips: string[] = [];
  if (i.larvaeAge !== 'under-24h') tips.push('Graft only larvae under 24 hours old for best acceptance.');
  if (i.starterStrength !== 'strong') tips.push('Use strong queenless starter colonies packed with nurse bees.');
  if (pct < 50) tips.push('Check grafting tool, lighting, and larvae positioning.');
  tips.push('Moisten cell cups with royal jelly diluted 1:1 with water for priming.');
  return { acceptancePercent: pct, grade, tips };
}
