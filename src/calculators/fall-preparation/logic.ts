export interface Inputs { hiveCount: number; currentStoresLbs: number; targetStoresLbs: number; daysUntilFirstFrost: number; miteCheckDone: boolean; }
export interface Result { storesDeficitLbs: number; sugarNeededLbs: number; costEstimate: number; urgency: string; checklist: string[]; }
export function calculate(i: Inputs): Result {
  const deficit = Math.max(0, (i.targetStoresLbs - i.currentStoresLbs) * i.hiveCount);
  const sugarNeeded = Math.ceil(deficit * 1.1);
  const cost = Math.round(sugarNeeded * 0.7 * 100) / 100;
  const urgency = i.daysUntilFirstFrost < 14 ? 'URGENT - feed now' : i.daysUntilFirstFrost < 30 ? 'Feed this week' : 'Normal schedule';
  const checklist: string[] = [];
  if (!i.miteCheckDone) checklist.push('Do mite check and treat if above 2%');
  if (deficit > 0) checklist.push(`Feed ${deficit} lbs of syrup (2:1)`);
  checklist.push('Install entrance reducer');
  checklist.push('Consolidate to minimum needed boxes');
  checklist.push('Ensure upper ventilation');
  return { storesDeficitLbs: deficit, sugarNeededLbs: sugarNeeded, costEstimate: cost, urgency, checklist };
}
