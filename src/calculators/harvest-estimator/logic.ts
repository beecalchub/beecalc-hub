export interface HarvestInputs {
  superCount: number;
  framesPerSuper: number;
  avgCoveragePercent: number;
  frameType: 'deep' | 'medium' | 'shallow';
}

export interface HarvestResult {
  totalFrames: number;
  effectiveFrames: number;
  totalHoneyLbs: number;
  totalHoneyKg: number;
  totalGallons: number;
  totalLiters: number;
}

const LBS_PER_FRAME: Record<string, number> = { deep: 8, medium: 5, shallow: 3.5 };

export function calculateHarvest(inputs: HarvestInputs): HarvestResult {
  const { superCount, framesPerSuper, avgCoveragePercent, frameType } = inputs;
  const totalFrames = superCount * framesPerSuper;
  const effectiveFrames = totalFrames * (avgCoveragePercent / 100);
  const lbsPerFrame = LBS_PER_FRAME[frameType];
  const totalHoneyLbs = Math.round(effectiveFrames * lbsPerFrame * 10) / 10;
  const totalHoneyKg = Math.round(totalHoneyLbs * 0.453592 * 10) / 10;
  const totalGallons = Math.round((totalHoneyLbs / 12) * 10) / 10;
  const totalLiters = Math.round(totalGallons * 3.78541 * 10) / 10;

  return { totalFrames, effectiveFrames: Math.round(effectiveFrames * 10) / 10, totalHoneyLbs, totalHoneyKg, totalGallons, totalLiters };
}
