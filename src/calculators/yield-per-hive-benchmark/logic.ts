export interface Inputs { yourYieldLbs: number; hiveCount: number; region: 'northern' | 'midwest' | 'southern' | 'west'; }
export interface Result { yourAverage: number; regionalAverage: number; percentOfAverage: number; rank: string; }
export function calculate(i: Inputs): Result {
  const avgs: Record<string, number> = { northern: 50, midwest: 65, southern: 45, west: 40 };
  const yourAvg = Math.round(i.yourYieldLbs / Math.max(1, i.hiveCount) * 10) / 10;
  const regional = avgs[i.region];
  const pct = Math.round(yourAvg / regional * 1000) / 10;
  const rank = pct >= 125 ? 'Top 10% - exceptional' : pct >= 100 ? 'Above average' : pct >= 75 ? 'Average' : pct >= 50 ? 'Below average' : 'Needs improvement';
  return { yourAverage: yourAvg, regionalAverage: regional, percentOfAverage: pct, rank };
}
