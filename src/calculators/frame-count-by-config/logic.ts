export interface Inputs { hives: number; deepBoxes: number; mediumBoxes: number; shallowBoxes: number; boxWidth: number; }
export interface Result { deepFrames: number; mediumFrames: number; shallowFrames: number; totalFrames: number; estimatedCost: number; }
export function calculate(i: Inputs): Result {
  const deep = i.hives * i.deepBoxes * i.boxWidth;
  const medium = i.hives * i.mediumBoxes * i.boxWidth;
  const shallow = i.hives * i.shallowBoxes * i.boxWidth;
  const total = deep + medium + shallow;
  return { deepFrames: deep, mediumFrames: medium, shallowFrames: shallow, totalFrames: total, estimatedCost: Math.round((deep * 2.5 + medium * 2 + shallow * 1.75) * 100) / 100 };
}
