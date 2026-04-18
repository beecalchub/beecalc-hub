export interface TreatmentCostInputs {
  hiveCount: number;
  treatments: Array<{
    name: string;
    enabled: boolean;
    costPerHive: number;
    roundsPerYear: number;
  }>;
}

export interface TreatmentCostResult {
  perTreatment: Array<{ name: string; costPerHive: number; totalCost: number; rounds: number }>;
  totalPerHive: number;
  totalAllHives: number;
}

export const DEFAULT_TREATMENTS = [
  { name: 'Oxalic acid (OAV)', enabled: true, costPerHive: 1.50, roundsPerYear: 3 },
  { name: 'Apivar (amitraz strips)', enabled: false, costPerHive: 5.00, roundsPerYear: 1 },
  { name: 'Formic Pro / MAQS', enabled: true, costPerHive: 4.50, roundsPerYear: 1 },
  { name: 'Apiguard (thymol)', enabled: false, costPerHive: 4.00, roundsPerYear: 1 },
  { name: 'HopGuard 3', enabled: false, costPerHive: 3.50, roundsPerYear: 2 },
];

export function calculateTreatmentCost(inputs: TreatmentCostInputs): TreatmentCostResult {
  const { hiveCount, treatments } = inputs;
  const active = treatments.filter((t) => t.enabled);

  const perTreatment = active.map((t) => ({
    name: t.name,
    costPerHive: Math.round(t.costPerHive * t.roundsPerYear * 100) / 100,
    totalCost: Math.round(t.costPerHive * t.roundsPerYear * hiveCount * 100) / 100,
    rounds: t.roundsPerYear,
  }));

  const totalPerHive = perTreatment.reduce((s, t) => s + t.costPerHive, 0);
  const totalAllHives = Math.round(totalPerHive * hiveCount * 100) / 100;

  return { perTreatment, totalPerHive: Math.round(totalPerHive * 100) / 100, totalAllHives };
}
