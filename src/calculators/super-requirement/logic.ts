export interface SuperInputs {
  hiveCount: number;
  flowStrength: 'light' | 'moderate' | 'heavy';
  frameType: 'deep' | 'medium' | 'shallow';
  framesPerBox: number;
}

export interface SuperResult {
  supersPerHive: number;
  totalSupers: number;
  totalFrames: number;
  estimatedYieldLbs: number;
  estimatedYieldKg: number;
}

const SUPERS_BY_FLOW = { light: 1, moderate: 2, heavy: 3 };
const LBS_PER_SUPER: Record<string, number> = { deep: 80, medium: 50, shallow: 35 };

export function calculateSuperRequirement(inputs: SuperInputs): SuperResult {
  const { hiveCount, flowStrength, frameType, framesPerBox } = inputs;
  const supersPerHive = SUPERS_BY_FLOW[flowStrength];
  const totalSupers = supersPerHive * hiveCount;
  const totalFrames = totalSupers * framesPerBox;
  const estimatedYieldLbs = totalSupers * LBS_PER_SUPER[frameType];
  const estimatedYieldKg = Math.round(estimatedYieldLbs * 0.453592);
  return { supersPerHive, totalSupers, totalFrames, estimatedYieldLbs, estimatedYieldKg };
}
