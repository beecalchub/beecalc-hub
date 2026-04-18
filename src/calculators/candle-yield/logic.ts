export interface Inputs { waxOz: number; candleType: 'taper' | 'votive' | 'pillar' | 'tealight'; addWickCotton: boolean; }
export interface Result { candleCount: number; wickLengthFt: number; totalCost: number; potentialRevenue: number; profit: number; }
export function calculate(i: Inputs): Result {
  const ozPerCandle: Record<string, number> = { taper: 2, votive: 3, pillar: 8, tealight: 0.5 };
  const pricePerCandle: Record<string, number> = { taper: 8, votive: 10, pillar: 25, tealight: 2.5 };
  const wickPerCandle: Record<string, number> = { taper: 1, votive: 0.5, pillar: 1.5, tealight: 0.25 };
  const candleCount = Math.floor(i.waxOz / ozPerCandle[i.candleType]);
  const wickLengthFt = Math.round(candleCount * wickPerCandle[i.candleType] * 10) / 10;
  const wickCost = i.addWickCotton ? wickLengthFt * 0.25 : 0;
  const totalCost = Math.round((candleCount * 0.5 + wickCost) * 100) / 100;
  const revenue = candleCount * pricePerCandle[i.candleType];
  return { candleCount, wickLengthFt, totalCost, potentialRevenue: revenue, profit: Math.round((revenue - totalCost) * 100) / 100 };
}
