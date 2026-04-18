export interface MoistureShrinkInputs { startingWeightLbs: number; startingMoisture: number; targetMoisture: number; }
export interface MoistureShrinkResult { waterRemovedLbs: number; waterRemovedKg: number; finalWeightLbs: number; finalWeightKg: number; weightLossPercent: number; revenueLostAtPricePerLb: number; }
export function calculateMoistureShrink(inputs: MoistureShrinkInputs): MoistureShrinkResult {
  const { startingWeightLbs, startingMoisture, targetMoisture } = inputs;
  if (targetMoisture >= startingMoisture) return { waterRemovedLbs: 0, waterRemovedKg: 0, finalWeightLbs: startingWeightLbs, finalWeightKg: Math.round(startingWeightLbs * 0.4536 * 100) / 100, weightLossPercent: 0, revenueLostAtPricePerLb: 0 };
  const finalWeight = startingWeightLbs * ((100 - startingMoisture) / (100 - targetMoisture));
  const waterRemoved = startingWeightLbs - finalWeight;
  const lossPercent = (waterRemoved / startingWeightLbs) * 100;
  return {
    waterRemovedLbs: Math.round(waterRemoved * 100) / 100, waterRemovedKg: Math.round(waterRemoved * 0.4536 * 100) / 100,
    finalWeightLbs: Math.round(finalWeight * 100) / 100, finalWeightKg: Math.round(finalWeight * 0.4536 * 100) / 100,
    weightLossPercent: Math.round(lossPercent * 100) / 100, revenueLostAtPricePerLb: Math.round(waterRemoved * 10 * 100) / 100, // $10/lb honey
  };
}
