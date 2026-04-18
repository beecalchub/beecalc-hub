export interface ExpansionInputs { currentHives: number; targetHives: number; method: 'splits' | 'purchase' | 'mixed'; splitsPerYear: number; nucCost: number; newEquipmentPerHive: number; yearsAllowed: number; }
export interface ExpansionResult { hivesNeeded: number; yearlyPlan: Array<{ year: number; startHives: number; added: number; endHives: number; cost: number }>; totalCost: number; yearsToTarget: number; recommendation: string; }
export function calculateExpansion(inputs: ExpansionInputs): ExpansionResult {
  const { currentHives, targetHives, method, splitsPerYear, nucCost, newEquipmentPerHive, yearsAllowed } = inputs;
  const hivesNeeded = Math.max(0, targetHives - currentHives);
  const plan: ExpansionResult['yearlyPlan'] = [];
  let current = currentHives; let totalCost = 0; let year = 0;
  while (current < targetHives && year < yearsAllowed) {
    year++;
    let added = 0; let cost = 0;
    if (method === 'splits') {
      added = Math.min(Math.floor(current * splitsPerYear / 100) || 1, targetHives - current);
      cost = added * newEquipmentPerHive;
    } else if (method === 'purchase') {
      added = Math.min(hivesNeeded, targetHives - current);
      cost = added * (nucCost + newEquipmentPerHive);
    } else {
      const fromSplits = Math.min(Math.floor(current * splitsPerYear / 100) || 1, Math.ceil((targetHives - current) / 2));
      const fromPurchase = Math.min(targetHives - current - fromSplits, Math.ceil((targetHives - current) / 2));
      added = fromSplits + fromPurchase;
      cost = fromSplits * newEquipmentPerHive + fromPurchase * (nucCost + newEquipmentPerHive);
    }
    current += added; totalCost += cost;
    plan.push({ year, startHives: current - added, added, endHives: current, cost: Math.round(cost) });
    if (method === 'purchase') break;
  }
  const recommendation = year <= 1 ? 'Target reached in 1 year. Consider purchasing to expand quickly.' : year <= 3 ? `Achievable in ${year} years through ${method === 'splits' ? 'splits alone' : 'a mix of splits and purchases'}.` : `Will take ${year} years via splits. Purchasing nucs would speed this up significantly.`;
  return { hivesNeeded, yearlyPlan: plan, totalCost: Math.round(totalCost), yearsToTarget: year, recommendation };
}
