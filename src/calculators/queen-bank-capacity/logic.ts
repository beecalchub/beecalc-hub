export interface Inputs { frameCount: number; queenCagesPerFrame: number; attendantBees: 'heavy' | 'moderate' | 'light'; }
export interface Result { maxQueens: number; recommendedLoad: number; nurseBeesNeeded: number; note: string; }
export function calculate(i: Inputs): Result {
  const max = i.frameCount * i.queenCagesPerFrame;
  const recommended = Math.floor(max * 0.8);
  const nurseMulti: Record<string, number> = { heavy: 200, moderate: 150, light: 100 };
  const nurses = recommended * nurseMulti[i.attendantBees];
  return { maxQueens: max, recommendedLoad: recommended, nurseBeesNeeded: nurses, note: 'Queen banks need constant fresh nurse bees - rotate in young bees weekly.' };
}
