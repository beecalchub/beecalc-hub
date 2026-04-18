export interface SyrupConversionInputs {
  mode: 'ratio-to-brix' | 'brix-to-ratio';
  sugarParts: number;
  waterParts: number;
  brix: number;
}
export interface SyrupConversionResult {
  brix: number;
  sugarPercent: number;
  ratio: string;
  densityLbPerGal: number;
  densityKgPerL: number;
  sugarLbsPerGallon: number;
  waterLbsPerGallon: number;
  use: string;
}
export function calculateSyrupConversion(inputs: SyrupConversionInputs): SyrupConversionResult {
  let sugarFrac: number;
  if (inputs.mode === 'ratio-to-brix') {
    sugarFrac = inputs.waterParts > 0 ? inputs.sugarParts / (inputs.sugarParts + inputs.waterParts) : 0;
  } else {
    sugarFrac = inputs.brix / 100;
  }
  const brix = Math.round(sugarFrac * 1000) / 10;
  const density = 1 + (sugarFrac * 0.4); // approximation
  const densityLbPerGal = Math.round(density * 8.345 * 100) / 100;
  const densityKgPerL = Math.round(density * 1000) / 1000;
  const sugarLbsPerGallon = Math.round(densityLbPerGal * sugarFrac * 100) / 100;
  const waterLbsPerGallon = Math.round(densityLbPerGal * (1 - sugarFrac) * 100) / 100;

  let ratio: string;
  if (sugarFrac < 0.35) ratio = 'Thin (~1:2)';
  else if (sugarFrac < 0.45) ratio = 'Light (~1:1.5)';
  else if (sugarFrac < 0.55) ratio = '1:1';
  else if (sugarFrac < 0.62) ratio = '3:2';
  else if (sugarFrac < 0.68) ratio = '5:3';
  else ratio = '2:1';

  let use: string;
  if (brix < 40) use = 'Very thin - spring stimulation or medication delivery';
  else if (brix <= 50) use = '1:1 - spring feeding, stimulates brood rearing';
  else if (brix <= 60) use = 'Medium - general purpose feeding';
  else use = 'Thick (2:1 range) - fall feeding, building winter stores';

  return { brix, sugarPercent: Math.round(sugarFrac * 1000) / 10, ratio, densityLbPerGal, densityKgPerL, sugarLbsPerGallon, waterLbsPerGallon, use };
}
