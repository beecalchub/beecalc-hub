export type SyrupRatio = '1:1' | '2:1' | '3:2' | '5:3';

export interface SugarSyrupInputs {
  ratio: SyrupRatio;
  targetVolumeLiters: number;
}

export interface SugarSyrupResult {
  sugarKg: number;
  waterLiters: number;
  totalVolumeLiters: number;
  sugarLbs: number;
  waterGallons: number;
  totalVolumeGallons: number;
  sugarCups: number;
}

const RATIOS: Record<SyrupRatio, { sugar: number; water: number; label: string; use: string }> = {
  '1:1': { sugar: 1, water: 1, label: '1:1 (Thin)', use: 'Spring stimulation feeding' },
  '2:1': { sugar: 2, water: 1, label: '2:1 (Thick)', use: 'Fall / winter stores building' },
  '3:2': { sugar: 3, water: 2, label: '3:2 (Medium)', use: 'General purpose feeding' },
  '5:3': { sugar: 5, water: 3, label: '5:3 (Heavy)', use: 'Heavy fall feeding' },
};

export function getRatioInfo(ratio: SyrupRatio) {
  return RATIOS[ratio];
}

export function getAllRatios() {
  return Object.entries(RATIOS).map(([key, val]) => ({
    value: key as SyrupRatio,
    ...val,
  }));
}

export function calculateSugarSyrup(inputs: SugarSyrupInputs): SugarSyrupResult {
  const { ratio, targetVolumeLiters } = inputs;
  const r = RATIOS[ratio];

  // Sugar dissolves into water, reducing total volume.
  // 1 kg sugar dissolved in water adds ~0.63 liters of volume
  const sugarVolumeFactorLPerKg = 0.63;

  // For ratio S:W (sugar parts by weight to water parts by weight)
  // We solve: targetVolume = waterL + sugarKg * 0.63
  //           sugarKg = (r.sugar / r.water) * waterKg
  //           waterKg = waterL (1 kg per liter)
  // So: targetVolume = waterL + (r.sugar/r.water) * waterL * 0.63
  //     targetVolume = waterL * (1 + (r.sugar/r.water) * 0.63)
  const waterLiters = targetVolumeLiters / (1 + (r.sugar / r.water) * sugarVolumeFactorLPerKg);
  const sugarKg = (r.sugar / r.water) * waterLiters;

  return {
    sugarKg: Math.round(sugarKg * 100) / 100,
    waterLiters: Math.round(waterLiters * 100) / 100,
    totalVolumeLiters: Math.round(targetVolumeLiters * 100) / 100,
    sugarLbs: Math.round(sugarKg * 2.20462 * 100) / 100,
    waterGallons: Math.round(waterLiters * 0.264172 * 100) / 100,
    totalVolumeGallons: Math.round(targetVolumeLiters * 0.264172 * 100) / 100,
    sugarCups: Math.round((sugarKg * 1000 / 200) * 10) / 10, // ~200g per cup of sugar
  };
}
