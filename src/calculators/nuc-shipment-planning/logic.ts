export interface Inputs { nucsToShip: number; boxType: 'cardboard' | 'wood' | 'plastic'; shippingMethod: 'freight' | 'air' | 'hand'; }
export interface Result { boxesNeeded: number; screenAreaSqFt: number; estimatedShippingCost: number; recommendations: string[]; }
export function calculate(i: Inputs): Result {
  const screen = Math.round(i.nucsToShip * 0.25 * 10) / 10;
  const costs: Record<string, Record<string, number>> = {
    cardboard: { freight: 15, air: 35, hand: 5 },
    wood: { freight: 25, air: 60, hand: 8 },
    plastic: { freight: 20, air: 45, hand: 7 },
  };
  const perNuc = costs[i.boxType][i.shippingMethod];
  const total = perNuc * i.nucsToShip;
  const recs: string[] = [];
  if (i.shippingMethod === 'air') recs.push('Use water bottles with drip feeders for flights over 24h');
  if (i.boxType === 'cardboard') recs.push('Staple screen cleanly - escape = disaster');
  recs.push('Ship early morning when bees are cool');
  recs.push('Include health certificate for interstate shipping');
  return { boxesNeeded: i.nucsToShip, screenAreaSqFt: screen, estimatedShippingCost: total, recommendations: recs };
}
