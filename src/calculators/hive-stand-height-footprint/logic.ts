export interface Inputs { accessibilityNeeds: 'low' | 'medium' | 'high'; hiveWidthInches: number; hiveDepthInches: number; }
export interface Result { recommendedHeightInches: number; footprintSqIn: number; spaceBetweenInches: number; note: string; }
export function calculate(i: Inputs): Result {
  const heights: Record<string, number> = { low: 12, medium: 18, high: 24 };
  const height = heights[i.accessibilityNeeds];
  const footprint = i.hiveWidthInches * i.hiveDepthInches;
  return { recommendedHeightInches: height, footprintSqIn: footprint, spaceBetweenInches: 24, note: 'Allow 24"+ between hives for comfortable working. Face entrances slightly different directions to reduce drift.' };
}
