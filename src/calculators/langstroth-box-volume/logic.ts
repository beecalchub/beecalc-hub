export interface Inputs { boxType: 'deep' | 'medium' | 'shallow'; frameCount: number; }
export interface Result { volumeCuIn: number; volumeLiters: number; honeyCapacityLbs: number; weightFullLbs: number; }
export function calculate(i: Inputs): Result {
  const depths: Record<string, number> = { deep: 9.625, medium: 6.625, shallow: 5.75 };
  const width = i.frameCount === 8 ? 15.9 : 19.875;
  const cuIn = depths[i.boxType] * width * 16.25;
  const honeyLbs = cuIn * 0.0432;
  return { volumeCuIn: Math.round(cuIn), volumeLiters: Math.round(cuIn * 0.01639 * 10) / 10, honeyCapacityLbs: Math.round(honeyLbs), weightFullLbs: Math.round(honeyLbs + 8) };
}
