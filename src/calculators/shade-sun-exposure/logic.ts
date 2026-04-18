export interface ShadeInputs { morningShade: 'full-sun' | 'partial' | 'full-shade'; afternoonShade: 'full-sun' | 'partial' | 'full-shade'; region: 'hot' | 'moderate' | 'cold'; hiveFacing: 'south' | 'east' | 'west' | 'north'; }
export interface ShadeResult { score: number; rating: string; recommendation: string; benefits: string[]; concerns: string[]; }
export function calculateShade(inputs: ShadeInputs): ShadeResult {
  const { morningShade, afternoonShade, region, hiveFacing } = inputs;
  let score = 50;
  if (morningShade === 'full-sun') score += 20; else if (morningShade === 'full-shade') score -= 15;
  if (afternoonShade === 'full-sun' && region === 'hot') score -= 10; else if (afternoonShade === 'partial' && region === 'hot') score += 15; else if (afternoonShade === 'full-sun') score += 10;
  if (hiveFacing === 'south' || hiveFacing === 'east') score += 10; else if (hiveFacing === 'north') score -= 15;
  if (region === 'cold' && morningShade === 'full-shade' && afternoonShade === 'full-shade') score -= 20;
  score = Math.max(0, Math.min(100, score));
  const rating = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Acceptable' : 'Poor';
  const benefits: string[] = []; const concerns: string[] = [];
  if (morningShade === 'full-sun') benefits.push('Morning sun warms hives early - bees start foraging sooner.'); else concerns.push('Morning shade delays foraging start.');
  if (afternoonShade === 'partial' && region === 'hot') benefits.push('Afternoon shade prevents overheating in hot climates.'); else if (afternoonShade === 'full-sun' && region === 'hot') concerns.push('Full afternoon sun in hot region - bees spend energy cooling instead of foraging.');
  if (hiveFacing === 'south' || hiveFacing === 'east') benefits.push(`${hiveFacing === 'south' ? 'South' : 'East'}-facing entrance catches early warmth.`);
  if (hiveFacing === 'north') concerns.push('North-facing entrance is cold and dark - rotate if possible.');
  const recommendation = score >= 80 ? 'This is an ideal hive location for sun exposure.' : score >= 60 ? 'Good location. Minor improvements possible.' : score >= 40 ? 'Consider repositioning or adding/removing shade structures.' : 'This location needs significant improvement. Relocate hives or modify shade.';
  return { score, rating, recommendation, benefits, concerns };
}
