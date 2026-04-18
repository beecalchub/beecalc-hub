export interface ApiaryProfitInputs {
  hiveCount: number;
  honeyRevenuePerHive: number;
  otherRevenuePerHive: number;
  costPerHive: number;
  fixedCosts: number;
}

export interface ApiaryProfitResult {
  totalRevenue: number;
  totalCosts: number;
  netProfit: number;
  profitPerHive: number;
  profitMargin: number;
  isProfitable: boolean;
}

export function calculateApiaryProfit(inputs: ApiaryProfitInputs): ApiaryProfitResult {
  const { hiveCount, honeyRevenuePerHive, otherRevenuePerHive, costPerHive, fixedCosts } = inputs;
  const totalRevenue = hiveCount * (honeyRevenuePerHive + otherRevenuePerHive);
  const totalCosts = (hiveCount * costPerHive) + fixedCosts;
  const netProfit = totalRevenue - totalCosts;
  const profitPerHive = hiveCount > 0 ? netProfit / hiveCount : 0;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  return {
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    totalCosts: Math.round(totalCosts * 100) / 100,
    netProfit: Math.round(netProfit * 100) / 100,
    profitPerHive: Math.round(profitPerHive * 100) / 100,
    profitMargin: Math.round(profitMargin * 10) / 10,
    isProfitable: netProfit > 0,
  };
}
