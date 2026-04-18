export interface HoneyDensityInputs { mode: 'weight-to-volume' | 'volume-to-weight'; weightLbs: number; volumeGallons: number; moisturePercent: number; }
export interface HoneyDensityResult { weightLbs: number; weightKg: number; volumeGallons: number; volumeLiters: number; volumeFlOz: number; densityLbPerGal: number; densityKgPerL: number; specificGravity: number; }
export function calculateHoneyDensity(inputs: HoneyDensityInputs): HoneyDensityResult {
  const { mode, moisturePercent } = inputs;
  // Honey density varies with moisture: ~1.42 kg/L at 18%, lower at higher moisture
  const sg = 1.42 - (moisturePercent - 18) * 0.005;
  const densityKgPerL = Math.round(sg * 1000) / 1000;
  const densityLbPerGal = Math.round(sg * 8.345 * 100) / 100;
  let weightLbs: number, volumeGallons: number;
  if (mode === 'weight-to-volume') {
    weightLbs = inputs.weightLbs;
    volumeGallons = densityLbPerGal > 0 ? weightLbs / densityLbPerGal : 0;
  } else {
    volumeGallons = inputs.volumeGallons;
    weightLbs = volumeGallons * densityLbPerGal;
  }
  return {
    weightLbs: Math.round(weightLbs * 100) / 100, weightKg: Math.round(weightLbs * 0.4536 * 100) / 100,
    volumeGallons: Math.round(volumeGallons * 1000) / 1000, volumeLiters: Math.round(volumeGallons * 3.785 * 1000) / 1000,
    volumeFlOz: Math.round(volumeGallons * 128 * 10) / 10, densityLbPerGal, densityKgPerL, specificGravity: Math.round(sg * 1000) / 1000,
  };
}
