export interface CombHoneyInputs { sectionCount: number; sectionType: 'ross-round' | 'cut-comb' | 'cassette'; avgCompletionPercent: number; }
export interface CombHoneyResult { completedSections: number; totalWeightOz: number; totalWeightLbs: number; totalWeightKg: number; estimatedValue: number; ozPerSection: number; }
const OZ_PER_SECTION: Record<string, number> = { 'ross-round': 8, 'cut-comb': 12, 'cassette': 10 };
const PRICE_PER_OZ = 1.5; // premium comb honey
export function calculateCombHoney(inputs: CombHoneyInputs): CombHoneyResult {
  const { sectionCount, sectionType, avgCompletionPercent } = inputs;
  const completedSections = Math.round(sectionCount * (avgCompletionPercent / 100));
  const ozPerSection = OZ_PER_SECTION[sectionType];
  const totalWeightOz = completedSections * ozPerSection;
  return { completedSections, totalWeightOz, totalWeightLbs: Math.round(totalWeightOz / 16 * 10) / 10, totalWeightKg: Math.round(totalWeightOz * 0.02835 * 10) / 10, estimatedValue: Math.round(totalWeightOz * PRICE_PER_OZ * 100) / 100, ozPerSection };
}
