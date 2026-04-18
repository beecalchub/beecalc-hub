export interface Inputs { totalHives: number; fieldsCount: number; daysOnSite: number; travelDaysTotal: number; }
export interface Result { hivesPerField: number; totalProjectDays: number; setupDaysNeeded: number; recommendation: string; }
export function calculate(i: Inputs): Result {
  const perField = Math.round(i.totalHives / Math.max(1, i.fieldsCount));
  const setupDays = Math.ceil(i.fieldsCount * 0.5);
  const total = i.daysOnSite + i.travelDaysTotal + setupDays;
  const rec = i.fieldsCount > 5 ? 'Multi-field deployment needs detailed logistics planning.' : 'Simple deployment - one trip each way typically works.';
  return { hivesPerField: perField, totalProjectDays: total, setupDaysNeeded: setupDays, recommendation: rec };
}
