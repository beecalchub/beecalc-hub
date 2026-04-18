export interface CostPerHiveInputs {
  equipmentCost: number;
  equipmentLifeYears: number;
  beeCost: number;
  feedCostPerYear: number;
  treatmentCostPerYear: number;
  laborHoursPerYear: number;
  laborRatePerHour: number;
  miscCostPerYear: number;
}

export interface CostPerHiveResult {
  annualEquipmentCost: number;
  annualLaborCost: number;
  totalAnnualCost: number;
  monthlyCost: number;
  breakdown: Array<{ label: string; amount: number; percent: number }>;
}

export function calculateCostPerHive(inputs: CostPerHiveInputs): CostPerHiveResult {
  const annualEquipmentCost = inputs.equipmentLifeYears > 0 ? inputs.equipmentCost / inputs.equipmentLifeYears : 0;
  const annualLaborCost = inputs.laborHoursPerYear * inputs.laborRatePerHour;
  const totalAnnualCost = annualEquipmentCost + inputs.beeCost + inputs.feedCostPerYear + inputs.treatmentCostPerYear + annualLaborCost + inputs.miscCostPerYear;

  const breakdown = [
    { label: 'Equipment (amortized)', amount: Math.round(annualEquipmentCost * 100) / 100 },
    { label: 'Bees (replacement/purchase)', amount: inputs.beeCost },
    { label: 'Feed', amount: inputs.feedCostPerYear },
    { label: 'Treatments', amount: inputs.treatmentCostPerYear },
    { label: 'Labor', amount: Math.round(annualLaborCost * 100) / 100 },
    { label: 'Miscellaneous', amount: inputs.miscCostPerYear },
  ].map((b) => ({ ...b, percent: totalAnnualCost > 0 ? Math.round((b.amount / totalAnnualCost) * 1000) / 10 : 0 }));

  return {
    annualEquipmentCost: Math.round(annualEquipmentCost * 100) / 100,
    annualLaborCost: Math.round(annualLaborCost * 100) / 100,
    totalAnnualCost: Math.round(totalAnnualCost * 100) / 100,
    monthlyCost: Math.round((totalAnnualCost / 12) * 100) / 100,
    breakdown,
  };
}
