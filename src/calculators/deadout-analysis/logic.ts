export interface Inputs { clusterSmall: boolean; honeyRemaining: boolean; deadBroodPresent: boolean; dysentryStreaks: boolean; mitesOnBees: boolean; headsInCells: boolean; }
export interface Result { likelyCause: string; confidence: string; prevention: string[]; }
export function calculate(i: Inputs): Result {
  if (i.mitesOnBees && i.deadBroodPresent) return { likelyCause: 'Varroa mite collapse / DWV', confidence: 'High', prevention: ['Test mites monthly Aug-Oct.', 'Treat when above 2%.', 'Use multiple treatment types annually.'] };
  if (i.headsInCells && !i.honeyRemaining) return { likelyCause: 'Starvation', confidence: 'High', prevention: ['Ensure 60-90 lbs stores by late fall.', 'Check hive weight monthly in winter.', 'Have emergency fondant ready.'] };
  if (i.clusterSmall && i.honeyRemaining) return { likelyCause: 'Cluster too small - isolation starvation', confidence: 'Medium', prevention: ['Go into winter with strong colonies (8+ frames).', 'Combine weak colonies in fall.', 'Treat mites in August.'] };
  if (i.dysentryStreaks) return { likelyCause: 'Nosema or dysentery', confidence: 'Medium', prevention: ['Ensure good ventilation.', 'Use only white sugar for feed.', 'Reduce moisture in hive.'] };
  return { likelyCause: 'Uncertain - multiple possible causes', confidence: 'Low', prevention: ['Take detailed notes and photos.', 'Send sample to state lab if suspected disease.', 'Review mite and feeding records.'] };
}
