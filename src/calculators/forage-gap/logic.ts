export interface Inputs { lastFlowEnd: string; nextFlowStart: string; hiveCount: number; currentStoresLbs: number; }
export interface Result { gapDays: number; consumptionLbs: number; deficitLbs: number; feedingRecommendation: string; }
export function calculate(i: Inputs): Result {
  const end = new Date(i.lastFlowEnd); const next = new Date(i.nextFlowStart);
  const days = Math.max(0, Math.ceil((next.getTime() - end.getTime()) / 86400000));
  const dailyPerHive = 0.7;
  const consumption = Math.round(days * dailyPerHive * i.hiveCount);
  const deficit = Math.max(0, consumption - i.currentStoresLbs * i.hiveCount);
  const rec = deficit === 0 ? 'Stores adequate for the gap.' : deficit < 20 ? 'Minor feeding needed.' : 'Significant feeding required to bridge the gap.';
  return { gapDays: days, consumptionLbs: consumption, deficitLbs: deficit, feedingRecommendation: rec };
}
