export interface ReplacementInputs { totalHives: number; lossPercent: number; replacementMethod: 'nucs' | 'packages' | 'splits'; costPerNuc: number; costPerPackage: number; equipmentReplacement: number; lostHoneyLbsPerHive: number; honeyPrice: number; }
export interface ReplacementResult { hivesLost: number; replacementCost: number; equipmentCost: number; lostRevenue: number; totalImpact: number; costPerLostHive: number; tips: string[]; }
export function calculateReplacement(inputs: ReplacementInputs): ReplacementResult {
  const { totalHives, lossPercent, replacementMethod, costPerNuc, costPerPackage, equipmentReplacement, lostHoneyLbsPerHive, honeyPrice } = inputs;
  const hivesLost = Math.round(totalHives * lossPercent / 100);
  const beeCost = replacementMethod === 'nucs' ? costPerNuc : replacementMethod === 'packages' ? costPerPackage : 0;
  const replacementCost = hivesLost * beeCost;
  const equipmentCost = hivesLost * equipmentReplacement;
  const lostRevenue = hivesLost * lostHoneyLbsPerHive * honeyPrice;
  const totalImpact = replacementCost + equipmentCost + lostRevenue;
  const tips: string[] = [];
  if (lossPercent > 30) tips.push('Losses above 30% suggest systemic issues - review varroa management, nutrition, and queen quality.');
  if (replacementMethod === 'splits') tips.push('Making splits from survivors is cheapest but delays honey production from donor hives.');
  tips.push('Insure against losses: some policies cover colony death from specific causes.');
  tips.push('Track your losses year over year - the national average is ~30% but good management can get below 15%.');
  return { hivesLost, replacementCost: Math.round(replacementCost), equipmentCost: Math.round(equipmentCost), lostRevenue: Math.round(lostRevenue), totalImpact: Math.round(totalImpact), costPerLostHive: hivesLost > 0 ? Math.round(totalImpact / hivesLost) : 0, tips };
}
