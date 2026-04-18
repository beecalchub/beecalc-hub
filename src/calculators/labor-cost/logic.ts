export interface LaborCostInputs {
  hiveCount: number; hourlyRate: number;
  inspectionHoursPerHive: number; inspectionsPerYear: number;
  feedingHoursPerRound: number; feedingRounds: number;
  treatmentHoursPerRound: number; treatmentRounds: number;
  extractionHoursTotal: number;
  miscHoursPerYear: number;
}
export interface LaborCostResult {
  totalHours: number; totalCost: number; costPerHive: number;
  breakdown: Array<{ task: string; hours: number; cost: number }>;
  hourlyEquivalent: number;
}
export function calculateLaborCost(inputs: LaborCostInputs): LaborCostResult {
  const { hiveCount, hourlyRate, inspectionHoursPerHive, inspectionsPerYear, feedingHoursPerRound, feedingRounds, treatmentHoursPerRound, treatmentRounds, extractionHoursTotal, miscHoursPerYear } = inputs;
  const breakdown = [
    { task: 'Inspections', hours: Math.round(inspectionHoursPerHive * hiveCount * inspectionsPerYear * 10) / 10, cost: 0 },
    { task: 'Feeding', hours: Math.round(feedingHoursPerRound * hiveCount * feedingRounds * 10) / 10, cost: 0 },
    { task: 'Mite treatments', hours: Math.round(treatmentHoursPerRound * hiveCount * treatmentRounds * 10) / 10, cost: 0 },
    { task: 'Extraction & bottling', hours: extractionHoursTotal, cost: 0 },
    { task: 'Misc (repairs, cleaning, admin)', hours: miscHoursPerYear, cost: 0 },
  ];
  breakdown.forEach(b => b.cost = Math.round(b.hours * hourlyRate * 100) / 100);
  const totalHours = Math.round(breakdown.reduce((s, b) => s + b.hours, 0) * 10) / 10;
  const totalCost = Math.round(totalHours * hourlyRate * 100) / 100;
  return { totalHours, totalCost, costPerHive: hiveCount > 0 ? Math.round(totalCost / hiveCount * 100) / 100 : 0, breakdown, hourlyEquivalent: hourlyRate };
}
