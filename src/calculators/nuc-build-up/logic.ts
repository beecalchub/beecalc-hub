export interface Inputs { startingFrames: number; weeksToBuildUp: number; feedingIntensity: 'aggressive' | 'moderate' | 'minimal'; }
export interface Result { weekly: Array<{ week: number; frames: number }>; readyAt: number; finalFrames: number; note: string; }
export function calculate(i: Inputs): Result {
  const growth: Record<string, number> = { aggressive: 1.15, moderate: 1.08, minimal: 1.03 };
  const weekly: Result['weekly'] = [];
  let frames = i.startingFrames;
  let readyAt = -1;
  for (let w = 0; w <= i.weeksToBuildUp; w++) {
    weekly.push({ week: w, frames: Math.round(frames * 10) / 10 });
    if (readyAt === -1 && frames >= 10) readyAt = w;
    frames = Math.min(20, frames * growth[i.feedingIntensity]);
  }
  const note = readyAt >= 0 ? `Nuc will fill a 10-frame deep by week ${readyAt}.` : 'Nuc will not fully fill a deep within projection period - extend feeding.';
  return { weekly, readyAt, finalFrames: Math.round(weekly[weekly.length - 1].frames * 10) / 10, note };
}
