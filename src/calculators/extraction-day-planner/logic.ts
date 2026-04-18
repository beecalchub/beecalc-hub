export interface ExtractionDayInputs { totalFrames: number; extractorCapacity: number; minutesPerLoad: number; setupMinutes: number; cleanupMinutes: number; helpersCount: number; }
export interface ExtractionDayResult { totalLoads: number; extractionMinutes: number; totalMinutes: number; totalHours: number; startTimeFor5pm: string; timeline: Array<{ time: string; task: string }>; }
export function calculateExtractionDay(inputs: ExtractionDayInputs): ExtractionDayResult {
  const { totalFrames, extractorCapacity, minutesPerLoad, setupMinutes, cleanupMinutes, helpersCount } = inputs;
  const totalLoads = Math.ceil(totalFrames / extractorCapacity);
  const extractionMinutes = totalLoads * minutesPerLoad;
  const helperBonus = helpersCount > 1 ? 0.7 : 1; // helpers speed up uncapping
  const adjustedExtraction = Math.round(extractionMinutes * helperBonus);
  const totalMinutes = setupMinutes + adjustedExtraction + cleanupMinutes;
  const totalHours = Math.round(totalMinutes / 6) / 10;
  const finishBy = 17 * 60; // 5 PM
  const startMin = finishBy - totalMinutes;
  const startH = Math.floor(startMin / 60);
  const startM = startMin % 60;
  const startTimeFor5pm = `${startH > 12 ? startH - 12 : startH}:${String(startM).padStart(2, '0')} ${startH >= 12 ? 'PM' : 'AM'}`;
  const timeline = [
    { time: '0:00', task: `Setup: warm knives, prepare strainer, test extractor (${setupMinutes} min)` },
    { time: `${setupMinutes} min`, task: `Begin uncapping and extracting - ${totalLoads} loads × ${minutesPerLoad} min` },
    { time: `${setupMinutes + adjustedExtraction} min`, task: `Extraction complete. Begin cleanup (${cleanupMinutes} min)` },
    { time: `${totalMinutes} min`, task: 'Done! Let honey settle in tank before bottling.' },
  ];
  return { totalLoads, extractionMinutes: adjustedExtraction, totalMinutes, totalHours, startTimeFor5pm, timeline };
}
