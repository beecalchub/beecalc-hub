export interface Inputs { moisturePercent: number; temperatureF: number; }
export interface Result { honeyStable: boolean; bottlingReady: boolean; concerns: string[]; status: string; }
export function calculate(i: Inputs): Result {
  const concerns: string[] = [];
  const stable = i.moisturePercent < 18.6;
  const ready = stable && i.temperatureF < 100;
  if (i.moisturePercent >= 18.6) concerns.push('Moisture too high - will ferment');
  if (i.temperatureF > 104) concerns.push('Temperature too high - damages enzymes');
  if (i.temperatureF < 50) concerns.push('Honey will be hard to handle when cold');
  return { honeyStable: stable, bottlingReady: ready, concerns, status: ready ? 'Ready to bottle' : stable ? 'Adjust temperature' : 'Reduce moisture first' };
}
