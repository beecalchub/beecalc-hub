export interface Inputs { hiveCount: number; broodBoxes: number; supers: number; frameSize: 'deep' | 'medium' | 'shallow'; }
export interface Result { totalFrames: number; deepSheets: number; mediumSheets: number; shallowSheets: number; estimatedCost: number; }
export function calculate(i: Inputs): Result {
  const framesPerBox = 10;
  const deepFrames = i.hiveCount * i.broodBoxes * framesPerBox;
  const superFrames = i.hiveCount * i.supers * framesPerBox;
  const deepSheets = i.frameSize === 'deep' ? deepFrames : 0;
  const mediumSheets = i.frameSize === 'medium' ? deepFrames + superFrames : superFrames;
  const shallowSheets = i.frameSize === 'shallow' ? superFrames : 0;
  const total = deepSheets + mediumSheets + shallowSheets;
  const costPer: Record<string, number> = { deep: 1.50, medium: 1.25, shallow: 1.00 };
  const cost = deepSheets * 1.50 + mediumSheets * 1.25 + shallowSheets * 1.00;
  return { totalFrames: total, deepSheets, mediumSheets, shallowSheets, estimatedCost: Math.round(cost * 100) / 100 };
}
