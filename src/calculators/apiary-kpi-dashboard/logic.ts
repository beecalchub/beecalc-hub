export interface Inputs { hiveCount: number; harvestLbs: number; revenue: number; costs: number; lossPercent: number; avgMiteCount: number; }
export interface Result { kpis: Array<{ metric: string; value: string; status: string }>; overallHealth: string; }
export function calculate(i: Inputs): Result {
  const perHive = i.harvestLbs / Math.max(1, i.hiveCount);
  const profit = i.revenue - i.costs;
  const profitMargin = i.revenue > 0 ? Math.round(profit / i.revenue * 1000) / 10 : 0;
  const kpis = [
    { metric: 'Yield per hive', value: Math.round(perHive) + ' lbs', status: perHive > 50 ? 'Good' : 'Below avg' },
    { metric: 'Profit', value: '$' + profit.toFixed(0), status: profit > 0 ? 'Profitable' : 'Loss' },
    { metric: 'Profit margin', value: profitMargin + '%', status: profitMargin > 30 ? 'Strong' : 'Weak' },
    { metric: 'Colony losses', value: i.lossPercent + '%', status: i.lossPercent < 20 ? 'Good' : 'High' },
    { metric: 'Avg mite load', value: i.avgMiteCount.toFixed(1) + '/100', status: i.avgMiteCount < 2 ? 'Good' : 'Concerning' },
  ];
  const goodCount = kpis.filter(k => k.status.startsWith('Good') || k.status === 'Profitable' || k.status === 'Strong').length;
  const overall = goodCount >= 4 ? 'Excellent' : goodCount >= 3 ? 'Good' : goodCount >= 2 ? 'Average' : 'Needs work';
  return { kpis, overallHealth: overall };
}
