export interface Inputs { boxCount: number; boxType: 'hive-body' | 'frame' | 'super'; fastenerType: 'nails' | 'screws' | 'both'; }
export interface Result { fastenersNeeded: number; poundsOrBoxes: number; estimatedCost: number; }
export function calculate(i: Inputs): Result {
  const perBox: Record<string, number> = { 'hive-body': 40, frame: 4, super: 40 };
  const total = i.boxCount * perBox[i.boxType];
  const packageSize = 500;
  const packages = Math.ceil(total / packageSize);
  const pricePerPackage = i.fastenerType === 'screws' ? 18 : 12;
  return { fastenersNeeded: total, poundsOrBoxes: packages, estimatedCost: Math.round(packages * pricePerPackage * 100) / 100 };
}
