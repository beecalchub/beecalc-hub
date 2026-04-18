export interface Inputs { queensPerMonth: number; seasonMonths: number; pricePerQueen: number; feedCostPerQueen: number; laborHoursPerQueen: number; laborRate: number; }
export interface Result { totalQueens: number; revenue: number; costs: number; profit: number; profitPerQueen: number; }
export function calculate(i: Inputs): Result {
  const total = i.queensPerMonth * i.seasonMonths;
  const revenue = total * i.pricePerQueen;
  const costs = total * (i.feedCostPerQueen + i.laborHoursPerQueen * i.laborRate);
  const profit = revenue - costs;
  return { totalQueens: total, revenue: Math.round(revenue * 100) / 100, costs: Math.round(costs * 100) / 100, profit: Math.round(profit * 100) / 100, profitPerQueen: total > 0 ? Math.round(profit / total * 100) / 100 : 0 };
}
