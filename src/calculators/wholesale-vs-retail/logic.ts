export interface WholesaleRetailInputs {
  totalJars: number;
  retailPricePerJar: number;
  wholesalePricePerJar: number;
  retailSellThroughPercent: number;
  wholesaleSellThroughPercent: number;
  retailTimeCostPerJar: number;
  wholesaleTimeCostPerJar: number;
  costPerJar: number;
}

export interface ScenarioResult {
  jarsSold: number;
  grossRevenue: number;
  productionCost: number;
  timeCost: number;
  netProfit: number;
  profitPerJar: number;
  profitPerHour: number;
  unsoldJars: number;
}

export interface WholesaleRetailResult {
  retail: ScenarioResult;
  wholesale: ScenarioResult;
  mixed: ScenarioResult;
  recommendation: string;
}

function calcScenario(jars: number, price: number, sellThrough: number, timeCost: number, costPerJar: number): ScenarioResult {
  const jarsSold = Math.round(jars * (sellThrough / 100));
  const grossRevenue = Math.round(jarsSold * price * 100) / 100;
  const productionCost = Math.round(jars * costPerJar * 100) / 100;
  const totalTimeCost = Math.round(jarsSold * timeCost * 100) / 100;
  const netProfit = Math.round((grossRevenue - productionCost - totalTimeCost) * 100) / 100;
  const profitPerJar = jarsSold > 0 ? Math.round((netProfit / jarsSold) * 100) / 100 : 0;
  const totalHours = totalTimeCost > 0 ? totalTimeCost / 20 : jarsSold * 0.1; // rough hrs
  const profitPerHour = totalHours > 0 ? Math.round((netProfit / totalHours) * 100) / 100 : 0;

  return { jarsSold, grossRevenue, productionCost, timeCost: totalTimeCost, netProfit, profitPerJar, profitPerHour, unsoldJars: jars - jarsSold };
}

export function calculateWholesaleRetail(inputs: WholesaleRetailInputs): WholesaleRetailResult {
  const { totalJars, retailPricePerJar, wholesalePricePerJar, retailSellThroughPercent, wholesaleSellThroughPercent, retailTimeCostPerJar, wholesaleTimeCostPerJar, costPerJar } = inputs;

  const retail = calcScenario(totalJars, retailPricePerJar, retailSellThroughPercent, retailTimeCostPerJar, costPerJar);
  const wholesale = calcScenario(totalJars, wholesalePricePerJar, wholesaleSellThroughPercent, wholesaleTimeCostPerJar, costPerJar);

  // Mixed: 60% retail, 40% wholesale
  const retailJars = Math.round(totalJars * 0.6);
  const wholesaleJars = totalJars - retailJars;
  const mixedRetail = calcScenario(retailJars, retailPricePerJar, retailSellThroughPercent, retailTimeCostPerJar, costPerJar);
  const mixedWholesale = calcScenario(wholesaleJars, wholesalePricePerJar, wholesaleSellThroughPercent, wholesaleTimeCostPerJar, costPerJar);
  const mixed: ScenarioResult = {
    jarsSold: mixedRetail.jarsSold + mixedWholesale.jarsSold,
    grossRevenue: Math.round((mixedRetail.grossRevenue + mixedWholesale.grossRevenue) * 100) / 100,
    productionCost: Math.round((mixedRetail.productionCost + mixedWholesale.productionCost) * 100) / 100,
    timeCost: Math.round((mixedRetail.timeCost + mixedWholesale.timeCost) * 100) / 100,
    netProfit: Math.round((mixedRetail.netProfit + mixedWholesale.netProfit) * 100) / 100,
    profitPerJar: (mixedRetail.jarsSold + mixedWholesale.jarsSold) > 0 ? Math.round(((mixedRetail.netProfit + mixedWholesale.netProfit) / (mixedRetail.jarsSold + mixedWholesale.jarsSold)) * 100) / 100 : 0,
    profitPerHour: 0,
    unsoldJars: mixedRetail.unsoldJars + mixedWholesale.unsoldJars,
  };

  const profits = [
    { label: 'All retail', profit: retail.netProfit },
    { label: 'All wholesale', profit: wholesale.netProfit },
    { label: 'Mixed (60/40)', profit: mixed.netProfit },
  ].sort((a, b) => b.profit - a.profit);

  const recommendation = `${profits[0].label} yields the highest net profit at ${formatMoney(profits[0].profit)}. Consider your available time, market access, and sell-through rates.`;

  return { retail, wholesale, mixed, recommendation };
}

function formatMoney(n: number): string {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
