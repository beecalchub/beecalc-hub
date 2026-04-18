export interface Inputs { trailerLengthFt: number; trailerWidthFt: number; hiveFootprintFt: number; stackHeight: number; }
export interface Result { hivesPerLayer: number; totalHives: number; weightLbs: number; note: string; }
export function calculate(i: Inputs): Result {
  const area = i.trailerLengthFt * i.trailerWidthFt;
  const hivesPerLayer = Math.floor(area / (i.hiveFootprintFt * i.hiveFootprintFt));
  const total = hivesPerLayer * i.stackHeight;
  const weight = total * 120;
  const note = i.stackHeight > 2 ? 'Stacking over 2 high requires straps and careful handling.' : weight > 10000 ? 'Heavy load - verify trailer rating.' : 'Safe load within typical trailer capacity.';
  return { hivesPerLayer, totalHives: total, weightLbs: weight, note };
}
