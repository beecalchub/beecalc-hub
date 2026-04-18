export interface FeedRequirementInputs {
  hiveCount: number;
  avgPopulationFrames: number;
  season: 'spring-buildup' | 'dearth' | 'fall-prep' | 'winter';
  currentStoresLbs: number;
  daysToFeed: number;
}

export interface FeedRequirementResult {
  dailyConsumptionLbs: number;
  totalNeededLbs: number;
  totalNeededKg: number;
  deficitLbs: number;
  deficitKg: number;
  syrupGallons: number;
  syrupLiters: number;
  sugarLbs: number;
  sugarKg: number;
  feedingSchedule: string;
}

const DAILY_LBS_PER_FRAME: Record<string, number> = {
  'spring-buildup': 0.15,
  'dearth': 0.10,
  'fall-prep': 0.12,
  'winter': 0.06,
};

export function calculateFeedRequirement(inputs: FeedRequirementInputs): FeedRequirementResult {
  const { hiveCount, avgPopulationFrames, season, currentStoresLbs, daysToFeed } = inputs;

  const dailyPerHive = avgPopulationFrames * DAILY_LBS_PER_FRAME[season];
  const dailyConsumptionLbs = Math.round(dailyPerHive * hiveCount * 100) / 100;
  const totalNeededLbs = Math.round(dailyConsumptionLbs * daysToFeed * 10) / 10;
  const totalStores = currentStoresLbs * hiveCount;
  const deficitLbs = Math.max(0, Math.round((totalNeededLbs - totalStores) * 10) / 10);

  const syrupGallons = deficitLbs > 0 ? Math.ceil(deficitLbs / 5.6) : 0;
  const sugarLbs = Math.round(syrupGallons * 5.3 * 10) / 10;

  let feedingSchedule: string;
  if (season === 'spring-buildup') feedingSchedule = '1:1 syrup in entrance or top feeder, refill every 3–5 days';
  else if (season === 'fall-prep') feedingSchedule = '2:1 syrup in top feeder, feed aggressively until capped';
  else if (season === 'winter') feedingSchedule = 'Fondant or sugar board on top bars, check monthly';
  else feedingSchedule = '1:1 syrup in small amounts, avoid robbing - feed in evening';

  return {
    dailyConsumptionLbs,
    totalNeededLbs,
    totalNeededKg: Math.round(totalNeededLbs * 0.4536 * 10) / 10,
    deficitLbs,
    deficitKg: Math.round(deficitLbs * 0.4536 * 10) / 10,
    syrupGallons,
    syrupLiters: Math.round(syrupGallons * 3.785 * 10) / 10,
    sugarLbs,
    sugarKg: Math.round(sugarLbs * 0.4536 * 10) / 10,
    feedingSchedule,
  };
}
