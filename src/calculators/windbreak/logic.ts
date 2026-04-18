export interface WindbreakInputs { apiaryWidthFt: number; dominantWindDirection: 'north' | 'south' | 'east' | 'west' | 'northwest'; avgWindSpeedMph: number; windbreakType: 'natural-trees' | 'fence' | 'building' | 'none'; windbreakHeightFt: number; distanceFromHivesFt: number; }
export interface WindbreakResult { protectionZoneFt: number; protectionAdequate: boolean; windReductionPercent: number; recommendation: string; suggestedHeight: number; suggestedDistance: number; benefits: string[]; }
export function calculateWindbreak(inputs: WindbreakInputs): WindbreakResult {
  const { apiaryWidthFt, avgWindSpeedMph, windbreakType, windbreakHeightFt, distanceFromHivesFt } = inputs;
  const protectionZoneFt = windbreakHeightFt * 10; // wind protection extends ~10x the height
  const protectionAdequate = distanceFromHivesFt <= protectionZoneFt && distanceFromHivesFt >= windbreakHeightFt;
  const typeEfficiency: Record<string, number> = { 'natural-trees': 0.7, fence: 0.5, building: 0.9, none: 0 };
  const efficiency = typeEfficiency[windbreakType];
  const distanceRatio = distanceFromHivesFt > 0 ? Math.min(1, protectionZoneFt / distanceFromHivesFt) : 0;
  const windReductionPercent = Math.round(efficiency * distanceRatio * 100);
  const suggestedHeight = Math.max(8, Math.ceil(avgWindSpeedMph / 3));
  const suggestedDistance = suggestedHeight * 3;
  const benefits: string[] = [];
  if (windReductionPercent > 50) benefits.push('Strong wind protection - bees can fly in lower winds.', 'Reduced heat loss from hives in winter.', 'Less drifting between hives.');
  else if (windReductionPercent > 20) benefits.push('Moderate protection - helps on windy days.', 'Some winter insulation benefit.');
  else benefits.push('Minimal protection - consider adding or improving windbreak.');
  if (avgWindSpeedMph > 15) benefits.push('High wind area - windbreaks significantly improve colony performance.');
  const recommendation = windbreakType === 'none' ? `No windbreak present. Plant a row of evergreens or install a fence at ${suggestedHeight}ft tall, ${suggestedDistance}ft from hives.` : protectionAdequate ? `Current windbreak reduces wind by ~${windReductionPercent}%. Good placement.` : distanceFromHivesFt > protectionZoneFt ? `Hives are too far from windbreak (${distanceFromHivesFt}ft). Move within ${protectionZoneFt}ft for protection.` : `Hives are too close to windbreak. Move to ${suggestedDistance}ft away to avoid downdrafts.`;
  return { protectionZoneFt, protectionAdequate, windReductionPercent, recommendation, suggestedHeight, suggestedDistance, benefits };
}
