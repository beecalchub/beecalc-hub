export interface RoiInputs { initialInvestment: number; annualRevenue: number; annualCosts: number; yearsToProject: number; }
export interface RoiResult { annualProfit: number; roiPercent: number; paybackYears: number; cumulativeByYear: Array<{ year: number; revenue: number; costs: number; profit: number; cumulative: number }>; totalRevenue: number; totalCosts: number; totalProfit: number; }
export function calculateRoi(inputs: RoiInputs): RoiResult {
  const { initialInvestment, annualRevenue, annualCosts, yearsToProject } = inputs;
  const annualProfit = annualRevenue - annualCosts;
  const roiPercent = initialInvestment > 0 ? Math.round((annualProfit / initialInvestment) * 10000) / 100 : 0;
  const paybackYears = annualProfit > 0 ? Math.round((initialInvestment / annualProfit) * 10) / 10 : 0;
  const cumulativeByYear: RoiResult['cumulativeByYear'] = [];
  let cumulative = -initialInvestment;
  for (let y = 1; y <= yearsToProject; y++) {
    cumulative += annualProfit;
    cumulativeByYear.push({ year: y, revenue: annualRevenue, costs: annualCosts, profit: annualProfit, cumulative: Math.round(cumulative * 100) / 100 });
  }
  return { annualProfit: Math.round(annualProfit * 100) / 100, roiPercent, paybackYears, cumulativeByYear, totalRevenue: Math.round(annualRevenue * yearsToProject * 100) / 100, totalCosts: Math.round((initialInvestment + annualCosts * yearsToProject) * 100) / 100, totalProfit: Math.round(cumulative * 100) / 100 };
}
