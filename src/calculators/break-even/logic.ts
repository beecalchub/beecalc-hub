export interface BreakEvenInputs {
  fixedCostsPerYear: number;
  variableCostPerUnit: number;
  revenuePerUnit: number;
  unitLabel: string;
}

export interface BreakEvenResult {
  breakEvenUnits: number;
  breakEvenRevenue: number;
  contributionMargin: number;
  contributionMarginPercent: number;
  isProfitablePerUnit: boolean;
  message: string;
}

export function calculateBreakEven(inputs: BreakEvenInputs): BreakEvenResult {
  const { fixedCostsPerYear, variableCostPerUnit, revenuePerUnit } = inputs;

  const contributionMargin = revenuePerUnit - variableCostPerUnit;
  const contributionMarginPercent = revenuePerUnit > 0 ? (contributionMargin / revenuePerUnit) * 100 : 0;
  const isProfitablePerUnit = contributionMargin > 0;

  let breakEvenUnits = 0;
  let breakEvenRevenue = 0;
  let message: string;

  if (contributionMargin <= 0) {
    breakEvenUnits = Infinity;
    breakEvenRevenue = Infinity;
    message = 'Cannot break even - each unit sold loses money. Increase price or reduce variable costs.';
  } else {
    breakEvenUnits = Math.ceil(fixedCostsPerYear / contributionMargin);
    breakEvenRevenue = Math.round(breakEvenUnits * revenuePerUnit * 100) / 100;
    message = `You need to sell ${breakEvenUnits} units to cover all fixed costs. Every unit beyond that is profit.`;
  }

  return {
    breakEvenUnits: isFinite(breakEvenUnits) ? breakEvenUnits : 0,
    breakEvenRevenue: isFinite(breakEvenRevenue) ? breakEvenRevenue : 0,
    contributionMargin: Math.round(contributionMargin * 100) / 100,
    contributionMarginPercent: Math.round(contributionMarginPercent * 10) / 10,
    isProfitablePerUnit,
    message,
  };
}
