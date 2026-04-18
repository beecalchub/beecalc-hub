export interface HoneyExpectInputs {
  hiveCount: number; region: 'northern' | 'midwest' | 'southern' | 'west' | 'pacific-nw';
  hiveAge: 'first-year' | 'established'; colonyStrength: 'strong' | 'average' | 'weak';
  localFlora: 'excellent' | 'good' | 'moderate' | 'poor';
  weather: 'good' | 'average' | 'poor';
}
export interface HoneyExpectResult {
  perHiveLbs: number; perHiveKg: number; totalLbs: number; totalKg: number;
  jars16oz: number; revenueEstimate: number;
  rangeMin: number; rangeMax: number;
  explanation: string; tips: string[];
}
const BASE_YIELD: Record<string, number> = { northern: 50, midwest: 65, southern: 45, west: 40, 'pacific-nw': 55 };
export function calculateHoneyExpect(inputs: HoneyExpectInputs): HoneyExpectResult {
  const { hiveCount, region, hiveAge, colonyStrength, localFlora, weather } = inputs;
  let yield_ = BASE_YIELD[region];
  if (hiveAge === 'first-year') yield_ *= 0.3; // first year usually minimal surplus
  if (colonyStrength === 'strong') yield_ *= 1.2; else if (colonyStrength === 'weak') yield_ *= 0.5;
  if (localFlora === 'excellent') yield_ *= 1.3; else if (localFlora === 'moderate') yield_ *= 0.8; else if (localFlora === 'poor') yield_ *= 0.4;
  if (weather === 'good') yield_ *= 1.15; else if (weather === 'poor') yield_ *= 0.6;

  const perHiveLbs = Math.round(yield_);
  const totalLbs = perHiveLbs * hiveCount;
  const jars16oz = Math.floor(totalLbs);
  const rangeMin = Math.round(perHiveLbs * 0.6);
  const rangeMax = Math.round(perHiveLbs * 1.4);

  const tips: string[] = [];
  if (hiveAge === 'first-year') tips.push('First-year hives rarely produce surplus honey. Many beekeepers leave all honey for the bees.', 'Focus on building a strong colony - honey comes in year 2+.');
  if (localFlora === 'poor') tips.push('Plant pollinator-friendly flowers to improve forage within 2 miles of your hives.');
  if (colonyStrength === 'weak') tips.push('Build colony strength before expecting honey. Feed, requeen if needed.');
  tips.push('Always leave 60-90 lbs for the bees to overwinter (varies by region).');

  const explanation = hiveAge === 'first-year'
    ? `First-year hives in your region typically produce ${perHiveLbs > 0 ? perHiveLbs : 'little to no'} lbs of surplus honey. Most goes to colony building.`
    : `Established hives in your region typically yield ${rangeMin}–${rangeMax} lbs per hive, depending on conditions.`;

  return { perHiveLbs, perHiveKg: Math.round(perHiveLbs * 0.4536), totalLbs, totalKg: Math.round(totalLbs * 0.4536), jars16oz, revenueEstimate: Math.round(totalLbs * 10), rangeMin, rangeMax, explanation, tips };
}
