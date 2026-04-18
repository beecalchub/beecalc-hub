export interface Inputs { perimeterFt: number; bearPressure: 'low' | 'medium' | 'high'; hasGround: boolean; }
export interface Result { wireStrands: number; totalWireFt: number; energizerJoules: number; estimatedCost: number; tips: string[]; }
export function calculate(i: Inputs): Result {
  const strands: Record<string, number> = { low: 4, medium: 5, high: 6 };
  const strand = strands[i.bearPressure];
  const wireFt = i.perimeterFt * strand;
  const joules: Record<string, number> = { low: 1, medium: 3, high: 6 };
  const cost = Math.round((wireFt * 0.15 + joules[i.bearPressure] * 150 + i.perimeterFt * 0.5) * 100) / 100;
  const tips: string[] = [];
  if (!i.hasGround) tips.push('Install 3+ ground rods 10 feet apart.');
  if (i.bearPressure === 'high') tips.push('Add bait (peanut butter) on strands to teach bears.');
  tips.push('Test voltage weekly - should be 5000V+ at the fence.');
  tips.push('Keep vegetation off wires to prevent shorts.');
  return { wireStrands: strand, totalWireFt: wireFt, energizerJoules: joules[i.bearPressure], estimatedCost: cost, tips };
}
