export interface Inputs { colonyCount: number; expectedLossPercent: number; replacementType: 'nuc' | 'package' | 'splits'; avgPriceEach: number; }
export interface Result { lossesExpected: number; replacementCost: number; splitAlternative: string; note: string; }
export function calculate(i: Inputs): Result {
  const losses = Math.ceil(i.colonyCount * i.expectedLossPercent / 100);
  const cost = losses * i.avgPriceEach;
  return { lossesExpected: losses, replacementCost: Math.round(cost * 100) / 100, splitAlternative: `You could split ${losses} surviving colonies instead of purchasing.`, note: i.expectedLossPercent > 30 ? 'Loss rate is high - review mite management and queen quality.' : 'Budget for at least this replacement cost each spring.' };
}
