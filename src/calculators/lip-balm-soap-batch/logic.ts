export interface Inputs { productType: 'lip-balm' | 'lotion-bar' | 'soap'; batchQuantity: number; beeswaxPerUnit: number; }
export interface Result { totalBeeswaxOz: number; totalOilsOz: number; totalEssentialsOz: number; totalCost: number; sellingPrice: number; profit: number; }
export function calculate(i: Inputs): Result {
  const beeswax = i.batchQuantity * i.beeswaxPerUnit;
  const oilRatio: Record<string, number> = { 'lip-balm': 2, 'lotion-bar': 1.5, soap: 4 };
  const pricePer: Record<string, number> = { 'lip-balm': 5, 'lotion-bar': 10, soap: 8 };
  const oils = beeswax * oilRatio[i.productType];
  const essentials = beeswax * 0.1;
  const totalCost = Math.round((beeswax * 1.5 + oils * 0.8 + essentials * 2) * 100) / 100;
  const revenue = i.batchQuantity * pricePer[i.productType];
  return { totalBeeswaxOz: Math.round(beeswax * 10) / 10, totalOilsOz: Math.round(oils * 10) / 10, totalEssentialsOz: Math.round(essentials * 10) / 10, totalCost, sellingPrice: revenue, profit: Math.round((revenue - totalCost) * 100) / 100 };
}
