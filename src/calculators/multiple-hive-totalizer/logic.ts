export interface Inputs { hives: number; avgHarvestPerHive: number; avgCostPerHive: number; avgRevenuePerHive: number; }
export interface Result { totalHarvest: number; totalCost: number; totalRevenue: number; totalProfit: number; avgProfit: number; }
export function calculate(i: Inputs): Result {
  const harvest = i.hives * i.avgHarvestPerHive;
  const cost = i.hives * i.avgCostPerHive;
  const revenue = i.hives * i.avgRevenuePerHive;
  const profit = revenue - cost;
  return { totalHarvest: harvest, totalCost: Math.round(cost * 100) / 100, totalRevenue: Math.round(revenue * 100) / 100, totalProfit: Math.round(profit * 100) / 100, avgProfit: Math.round(profit / Math.max(1, i.hives) * 100) / 100 };
}
