export interface Inputs { currentSuperFillPercent: number; daysIntoFlow: number; flowPeakIn: number; weatherForecast: 'ideal' | 'mixed' | 'poor'; }
export interface Result { addSuperNow: boolean; daysToFull: number; recommendation: string; }
export function calculate(i: Inputs): Result {
  const addNow = i.currentSuperFillPercent >= 70 && i.weatherForecast !== 'poor';
  const rate = i.weatherForecast === 'ideal' ? 10 : i.weatherForecast === 'mixed' ? 5 : 2;
  const daysToFull = Math.ceil((100 - i.currentSuperFillPercent) / rate);
  const rec = addNow ? 'Add a super within 24 hours.' : i.currentSuperFillPercent > 50 ? 'Add a super within a week.' : 'Wait - current super has capacity.';
  return { addSuperNow: addNow, daysToFull, recommendation: rec };
}
