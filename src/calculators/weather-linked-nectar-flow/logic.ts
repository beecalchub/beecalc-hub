export interface Inputs { tempHighF: number; tempLowF: number; rainfallInches: number; daylight: number; }
export interface Result { nectarFlowIndex: number; condition: string; recommendation: string; }
export function calculate(i: Inputs): Result {
  let score = 50;
  if (i.tempHighF >= 70 && i.tempHighF <= 90) score += 20;
  else if (i.tempHighF < 60 || i.tempHighF > 95) score -= 20;
  if (i.tempLowF >= 55) score += 15;
  else if (i.tempLowF < 45) score -= 20;
  if (i.rainfallInches >= 1 && i.rainfallInches <= 3) score += 15;
  else if (i.rainfallInches < 0.5) score -= 15;
  if (i.daylight >= 13) score += 10;
  score = Math.max(0, Math.min(100, score));
  const cond = score >= 75 ? 'Excellent flow' : score >= 60 ? 'Good flow' : score >= 40 ? 'Moderate' : 'Poor conditions';
  const rec = score >= 75 ? 'Add supers - bees will fill quickly.' : score >= 60 ? 'Monitor weekly - flow is active.' : score >= 40 ? 'Flow slowing - start checking stores.' : 'Consider feeding if conditions persist.';
  return { nectarFlowIndex: score, condition: cond, recommendation: rec };
}
