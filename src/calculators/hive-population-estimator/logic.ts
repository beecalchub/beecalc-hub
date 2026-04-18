export interface PopulationInputs {
  framesCoveredWithBees: number;
  framesOfBrood: number;
  boxType: 'deep' | 'medium';
}

export interface PopulationResult {
  estimatedBees: number;
  strength: 'weak' | 'moderate' | 'strong' | 'very-strong';
  strengthLabel: string;
  beesPerFrame: number;
  emergingBees: number;
  projectedPeakPop: number;
}

export function calculatePopulation(inputs: PopulationInputs): PopulationResult {
  const { framesCoveredWithBees, framesOfBrood, boxType } = inputs;
  const beesPerFrame = boxType === 'deep' ? 2500 : 1750;
  const estimatedBees = Math.round(framesCoveredWithBees * beesPerFrame);
  const cellsPerFrame = boxType === 'deep' ? 7000 : 4900;
  const emergingBees = Math.round(framesOfBrood * cellsPerFrame * 0.8 * 0.9);
  const projectedPeakPop = estimatedBees + emergingBees;

  let strength: PopulationResult['strength'];
  let strengthLabel: string;
  if (estimatedBees < 15000) { strength = 'weak'; strengthLabel = 'Weak colony - may need combining or support'; }
  else if (estimatedBees < 35000) { strength = 'moderate'; strengthLabel = 'Moderate colony - building nicely'; }
  else if (estimatedBees < 55000) { strength = 'strong'; strengthLabel = 'Strong colony - ready for supers or splits'; }
  else { strength = 'very-strong'; strengthLabel = 'Very strong - excellent production colony, swarm watch'; }

  return { estimatedBees, strength, strengthLabel, beesPerFrame, emergingBees, projectedPeakPop };
}
