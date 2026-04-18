export interface CashFlowInputs { hiveCount: number; honeyRevenue: number; waxRevenue: number; pollinationRevenue: number; nucSalesRevenue: number; springCosts: number; summerCosts: number; fallCosts: number; winterCosts: number; }
export interface CashFlowResult { seasons: Array<{ season: string; revenue: number; costs: number; net: number; cumulative: number }>; totalRevenue: number; totalCosts: number; annualNet: number; bestSeason: string; worstSeason: string; }
export function calculateCashFlow(inputs: CashFlowInputs): CashFlowResult {
  const { honeyRevenue, waxRevenue, pollinationRevenue, nucSalesRevenue, springCosts, summerCosts, fallCosts, winterCosts } = inputs;
  const seasons = [
    { season: 'Spring', revenue: Math.round(nucSalesRevenue + pollinationRevenue * 0.7), costs: springCosts },
    { season: 'Summer', revenue: Math.round(honeyRevenue * 0.6 + pollinationRevenue * 0.3), costs: summerCosts },
    { season: 'Fall', revenue: Math.round(honeyRevenue * 0.4 + waxRevenue), costs: fallCosts },
    { season: 'Winter', revenue: 0, costs: winterCosts },
  ];
  let cumulative = 0;
  const result = seasons.map(s => { const net = s.revenue - s.costs; cumulative += net; return { ...s, net, cumulative: Math.round(cumulative) }; });
  const totalRevenue = result.reduce((s, r) => s + r.revenue, 0);
  const totalCosts = result.reduce((s, r) => s + r.costs, 0);
  const best = result.reduce((a, b) => a.net > b.net ? a : b);
  const worst = result.reduce((a, b) => a.net < b.net ? a : b);
  return { seasons: result, totalRevenue, totalCosts, annualNet: totalRevenue - totalCosts, bestSeason: best.season, worstSeason: worst.season };
}
