export interface Inputs { hiveCount: number; stops: number; totalMiles: number; totalRevenue: number; totalFuelCost: number; laborDays: number; laborRate: number; }
export interface Result { grossRevenue: number; totalCosts: number; netProfit: number; profitPerHive: number; profitPerMile: number; recommendation: string; }
export function calculate(i: Inputs): Result {
  const laborCost = i.laborDays * 8 * i.laborRate;
  const costs = i.totalFuelCost + laborCost;
  const profit = i.totalRevenue - costs;
  const perHive = Math.round(profit / Math.max(1, i.hiveCount) * 100) / 100;
  const perMile = Math.round(profit / Math.max(1, i.totalMiles) * 100) / 100;
  const rec = perHive > 75 ? 'Highly profitable route - expand if possible.' : perHive > 30 ? 'Decent margins - look for optimization.' : 'Margins are thin - reconsider or renegotiate rates.';
  return { grossRevenue: i.totalRevenue, totalCosts: Math.round(costs * 100) / 100, netProfit: Math.round(profit * 100) / 100, profitPerHive: perHive, profitPerMile: perMile, recommendation: rec };
}
