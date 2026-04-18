export interface LandAreaInputs { lengthFt: number; widthFt: number; shape: 'rectangle' | 'circle' | 'triangle'; radiusFt: number; }
export interface LandAreaResult { sqFt: number; acres: number; hectares: number; sqMeters: number; hivesSupported: number; plantingRows: number; note: string; }
export function calculateLandArea(inputs: LandAreaInputs): LandAreaResult {
  const { lengthFt, widthFt, shape, radiusFt } = inputs;
  let sqFt: number;
  if (shape === 'circle') sqFt = Math.PI * radiusFt * radiusFt;
  else if (shape === 'triangle') sqFt = 0.5 * lengthFt * widthFt;
  else sqFt = lengthFt * widthFt;
  const acres = sqFt / 43560; const hectares = acres * 0.4047; const sqMeters = sqFt * 0.0929;
  const hivesSupported = Math.max(1, Math.floor(acres * 2)); // ~2 hives per acre of good forage
  const plantingRows = Math.floor(Math.sqrt(sqFt) / 3); // 3ft spacing
  const note = acres < 0.5 ? 'Small plot - excellent for a pollinator garden supporting 1–2 hives.' : acres < 5 ? 'Good-sized forage area. Consider planting a diverse mix of bee-friendly flowers.' : 'Large area - could support a substantial apiary with diverse plantings.';
  return { sqFt: Math.round(sqFt), acres: Math.round(acres * 1000) / 1000, hectares: Math.round(hectares * 1000) / 1000, sqMeters: Math.round(sqMeters), hivesSupported, plantingRows, note };
}
