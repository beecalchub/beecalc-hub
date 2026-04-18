export interface MiteDropInputs { readings: Array<{ date: string; count: number }>; boardDays: number; }
export interface MiteDropResult { dailyAverages: Array<{ date: string; dailyDrop: number }>; trend: 'decreasing' | 'stable' | 'increasing'; trendMessage: string; latestDailyDrop: number; projectedWeeklyDrop: number; treatmentEffective: boolean; }
export function calculateMiteDrop(inputs: MiteDropInputs): MiteDropResult {
  const { readings, boardDays } = inputs;
  const dailyAverages = readings.map((r) => ({ date: r.date, dailyDrop: boardDays > 0 ? Math.round((r.count / boardDays) * 10) / 10 : 0 }));
  const latest = dailyAverages[dailyAverages.length - 1]?.dailyDrop || 0;
  let trend: MiteDropResult['trend'] = 'stable';
  if (dailyAverages.length >= 2) {
    const first = dailyAverages[0].dailyDrop; const last = dailyAverages[dailyAverages.length - 1].dailyDrop;
    if (last < first * 0.7) trend = 'decreasing'; else if (last > first * 1.3) trend = 'increasing';
  }
  const trendMessages = { decreasing: 'Mite drop is declining - treatment appears effective.', stable: 'Mite drop is stable - monitor closely and consider additional treatment.', increasing: 'Mite drop is increasing - treatment may not be effective or reinfestation occurring.' };
  return { dailyAverages, trend, trendMessage: trendMessages[trend], latestDailyDrop: latest, projectedWeeklyDrop: Math.round(latest * 7 * 10) / 10, treatmentEffective: trend === 'decreasing' };
}
