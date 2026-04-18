export interface Inputs { hiveCount: number; wrapType: 'tar-paper' | 'foam-board' | 'quilt-box' | 'none'; winterLowF: number; windExposure: 'sheltered' | 'moderate' | 'exposed'; }
export interface Result { wrapAreaSqFt: number; materialCostEach: number; totalCost: number; rValueTarget: number; recommendation: string; }
export function calculate(i: Inputs): Result {
  const area = 8 * 4 * i.hiveCount;
  const costs: Record<string, number> = { 'tar-paper': 8, 'foam-board': 25, 'quilt-box': 35, none: 0 };
  const rValues: Record<string, number> = { 'tar-paper': 2, 'foam-board': 5, 'quilt-box': 7, none: 0 };
  const target = i.winterLowF < -10 ? 8 : i.winterLowF < 0 ? 5 : i.winterLowF < 20 ? 3 : 1;
  const rec = rValues[i.wrapType] < target ? `Target R-${target} for your climate. Consider foam board or quilt box.` : 'Wrap is adequate for your climate.';
  return { wrapAreaSqFt: area, materialCostEach: costs[i.wrapType], totalCost: costs[i.wrapType] * i.hiveCount, rValueTarget: target, recommendation: rec };
}
