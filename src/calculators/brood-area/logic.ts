export interface BroodAreaInputs {
  frames: Array<{ coveragePercent: number }>;
  frameType: 'deep' | 'medium';
}

export interface BroodAreaResult {
  totalFrames: number;
  effectiveFullFrames: number;
  totalCells: number;
  totalSqInches: number;
  totalSqCm: number;
  queenRating: string;
  estimatedEggsPerDay: number;
}

const CELLS_PER_FRAME = { deep: 7000, medium: 4900 };
const SQIN_PER_FRAME = { deep: 160, medium: 112 };

export function calculateBroodArea(inputs: BroodAreaInputs): BroodAreaResult {
  const { frames, frameType } = inputs;
  const totalFrames = frames.length;
  const effectiveFullFrames = frames.reduce((s, f) => s + f.coveragePercent / 100, 0);
  const totalCells = Math.round(effectiveFullFrames * CELLS_PER_FRAME[frameType]);
  const totalSqInches = Math.round(effectiveFullFrames * SQIN_PER_FRAME[frameType] * 10) / 10;
  const totalSqCm = Math.round(totalSqInches * 6.4516 * 10) / 10;

  // Queen laying rate estimate: brood cycle 21 days, so cells/21 ≈ eggs/day
  const estimatedEggsPerDay = Math.round(totalCells / 21);

  let queenRating: string;
  if (effectiveFullFrames >= 8) queenRating = 'Excellent - prolific queen';
  else if (effectiveFullFrames >= 5) queenRating = 'Good - healthy queen performance';
  else if (effectiveFullFrames >= 3) queenRating = 'Fair - may need monitoring';
  else queenRating = 'Poor - consider requeening';

  return {
    totalFrames,
    effectiveFullFrames: Math.round(effectiveFullFrames * 10) / 10,
    totalCells,
    totalSqInches,
    totalSqCm,
    queenRating,
    estimatedEggsPerDay,
  };
}
