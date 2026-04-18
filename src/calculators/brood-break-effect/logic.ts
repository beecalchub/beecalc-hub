export interface BroodBreakInputs { currentMitePercent: number; breakDays: number; treatDuringBreak: boolean; treatmentEfficacy: number; }
export interface BroodBreakResult { miteReductionPercent: number; resultingMitePercent: number; broodCyclesDisrupted: number; explanation: string; }
export function calculateBroodBreak(inputs: BroodBreakInputs): BroodBreakResult {
  const { currentMitePercent, breakDays, treatDuringBreak, treatmentEfficacy } = inputs;
  const broodCycles = breakDays / 21;
  const naturalReduction = Math.min(0.5, broodCycles * 0.15); // up to 50% natural reduction
  let totalReduction = naturalReduction;
  if (treatDuringBreak) totalReduction = naturalReduction + (1 - naturalReduction) * (treatmentEfficacy / 100);
  totalReduction = Math.min(0.98, totalReduction);
  const resultingMitePercent = Math.round(currentMitePercent * (1 - totalReduction) * 100) / 100;
  const explanation = treatDuringBreak
    ? `A ${breakDays}-day brood break exposes phoretic mites, then treatment kills ${treatmentEfficacy}% of remaining. Combined effect: ${Math.round(totalReduction * 100)}% reduction.`
    : `A ${breakDays}-day brood break naturally reduces mites ~${Math.round(naturalReduction * 100)}% as mites cannot reproduce without brood.`;
  return { miteReductionPercent: Math.round(totalReduction * 100), resultingMitePercent, broodCyclesDisrupted: Math.round(broodCycles * 10) / 10, explanation };
}
