export interface Inputs { frameLengthIn: number; frameHeightIn: number; coveredLengthIn: number; coveredHeightIn: number; }
export interface Result { coveragePercent: number; coveredSqIn: number; totalSqIn: number; description: string; }
export function calculate(i: Inputs): Result {
  const total = i.frameLengthIn * i.frameHeightIn;
  const covered = Math.min(total, i.coveredLengthIn * i.coveredHeightIn);
  const pct = Math.round(covered / total * 1000) / 10;
  const desc = pct >= 80 ? 'Fully covered - strong colony' : pct >= 50 ? 'Partially covered - adequate' : 'Limited coverage - weak or just starting';
  return { coveragePercent: pct, coveredSqIn: Math.round(covered), totalSqIn: Math.round(total), description: desc };
}
