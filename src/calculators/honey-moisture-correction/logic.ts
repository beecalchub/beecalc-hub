export interface MoistureInputs {
  currentMoisture: number;
  targetMoisture: number;
  honeyWeightLbs: number;
}

export interface MoistureResult {
  isAcceptable: boolean;
  needsDrying: boolean;
  waterToRemoveLbs: number;
  waterToRemoveKg: number;
  finalWeightLbs: number;
  finalWeightKg: number;
  weightLossPercent: number;
  status: string;
}

export function calculateMoistureCorrection(inputs: MoistureInputs): MoistureResult {
  const { currentMoisture, targetMoisture, honeyWeightLbs } = inputs;

  const isAcceptable = currentMoisture <= 18.6;
  const needsDrying = currentMoisture > targetMoisture;

  // Formula: weight_to_remove = original_weight * (1 - (100 - current%) / (100 - target%))
  let waterToRemoveLbs = 0;
  let finalWeightLbs = honeyWeightLbs;

  if (needsDrying && currentMoisture > 0 && targetMoisture < currentMoisture) {
    waterToRemoveLbs = honeyWeightLbs * (1 - (100 - currentMoisture) / (100 - targetMoisture));
    finalWeightLbs = honeyWeightLbs - waterToRemoveLbs;
  }

  const waterToRemoveKg = waterToRemoveLbs * 0.453592;
  const finalWeightKg = finalWeightLbs * 0.453592;
  const weightLossPercent = honeyWeightLbs > 0 ? (waterToRemoveLbs / honeyWeightLbs) * 100 : 0;

  let status: string;
  if (currentMoisture <= 17) {
    status = 'Excellent - honey is very stable and ready for bottling.';
  } else if (currentMoisture <= 18) {
    status = 'Good - within ideal range for bottling and long-term storage.';
  } else if (currentMoisture <= 18.6) {
    status = 'Acceptable - meets legal standards but consider drying for best quality.';
  } else if (currentMoisture <= 20) {
    status = 'Too wet - needs dehumidification before bottling. Risk of fermentation.';
  } else {
    status = 'Very high moisture - significant drying needed. High fermentation risk.';
  }

  return {
    isAcceptable,
    needsDrying,
    waterToRemoveLbs: Math.round(waterToRemoveLbs * 100) / 100,
    waterToRemoveKg: Math.round(waterToRemoveKg * 100) / 100,
    finalWeightLbs: Math.round(finalWeightLbs * 100) / 100,
    finalWeightKg: Math.round(finalWeightKg * 100) / 100,
    weightLossPercent: Math.round(weightLossPercent * 100) / 100,
    status,
  };
}
