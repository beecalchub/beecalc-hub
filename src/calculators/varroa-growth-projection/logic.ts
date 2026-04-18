export interface VarroaGrowthInputs { currentMitePercent: number; monthsToProject: number; treatmentMonth: number | null; treatmentEfficacy: number; }
export interface VarroaGrowthResult { projections: Array<{ month: number; mitePercent: number; risk: string }>; peakPercent: number; monthsUntilCritical: number | null; treatmentImpact: string; }
export function calculateVarroaGrowth(inputs: VarroaGrowthInputs): VarroaGrowthResult {
  const { currentMitePercent, monthsToProject, treatmentMonth, treatmentEfficacy } = inputs;
  const growthRate = 1.12; // ~12% monthly growth
  const projections: VarroaGrowthResult['projections'] = [];
  let peak = currentMitePercent; let critical: number | null = null;
  let current = currentMitePercent;
  for (let m = 0; m <= monthsToProject; m++) {
    if (m > 0) current *= growthRate;
    if (treatmentMonth !== null && m === treatmentMonth) current *= (1 - treatmentEfficacy / 100);
    current = Math.round(current * 100) / 100;
    if (current > peak) peak = current;
    if (critical === null && current >= 3) critical = m;
    const risk = current < 1 ? 'Low' : current < 2 ? 'Moderate' : current < 3 ? 'High' : 'Critical';
    projections.push({ month: m, mitePercent: current, risk });
  }
  const treatmentImpact = treatmentMonth !== null ? `Treatment in month ${treatmentMonth} reduces mites by ${treatmentEfficacy}%. Without it, peak would be ${Math.round(currentMitePercent * Math.pow(growthRate, monthsToProject) * 100) / 100}%.` : 'No treatment scheduled. Consider adding one to see impact.';
  return { projections, peakPercent: Math.round(peak * 100) / 100, monthsUntilCritical: critical, treatmentImpact };
}
