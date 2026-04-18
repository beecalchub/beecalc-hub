export interface Inputs { hivesDeployed: number; ratePerHive: number; crops: number; bonusPerCrop: number; }
export interface Result { baseRevenue: number; bonusRevenue: number; totalRevenue: number; revenuePerHive: number; }
export function calculate(i: Inputs): Result {
  const base = i.hivesDeployed * i.ratePerHive;
  const bonus = i.crops * i.bonusPerCrop;
  return { baseRevenue: base, bonusRevenue: bonus, totalRevenue: base + bonus, revenuePerHive: Math.round((base + bonus) / Math.max(1, i.hivesDeployed) * 100) / 100 };
}
