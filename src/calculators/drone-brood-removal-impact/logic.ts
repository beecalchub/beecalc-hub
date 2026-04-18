export interface DroneBroodInputs { framesRemoved: number; removalFrequencyDays: number; cyclesPerSeason: number; currentMitePercent: number; }
export interface DroneBroodResult { mitesTrappedPerFrame: number; totalMitesTrapped: number; reductionPercent: number; resultingMitePercent: number; recommendation: string; }
export function calculateDroneBroodRemoval(inputs: DroneBroodInputs): DroneBroodResult {
  const { framesRemoved, cyclesPerSeason, currentMitePercent } = inputs;
  const mitesPerFrame = 200; // ~200 mites typically found in a full drone frame
  const mitesTrappedPerCycle = framesRemoved * mitesPerFrame;
  const totalMitesTrapped = mitesTrappedPerCycle * cyclesPerSeason;
  const reductionPercent = Math.min(30, cyclesPerSeason * framesRemoved * 5);
  const resultingMitePercent = Math.round(currentMitePercent * (1 - reductionPercent / 100) * 100) / 100;
  const recommendation = reductionPercent >= 20 ? 'Good supplemental IPM method. Combine with other treatments for best results.' : reductionPercent >= 10 ? 'Moderate impact. Helpful as part of an integrated mite management plan.' : 'Minimal impact alone. Consider increasing frames or frequency.';
  return { mitesTrappedPerFrame: mitesPerFrame, totalMitesTrapped, reductionPercent, resultingMitePercent, recommendation };
}
