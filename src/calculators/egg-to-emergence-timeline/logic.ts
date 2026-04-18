export interface EggEmergenceInputs { caste: 'worker' | 'drone' | 'queen'; eggDate: string; }
export interface EggEmergenceResult { hatchDate: string; cappedDate: string; emergenceDate: string; layingDate: string; timelineDays: Array<{ day: number; event: string; date: string }>; }
const PHASES = { worker: { hatch: 3, capped: 9, emerge: 21, laying: 0 }, drone: { hatch: 3, capped: 10, emerge: 24, laying: 0 }, queen: { hatch: 3, capped: 8, emerge: 16, laying: 21 } };
function addDays(iso: string, n: number): string { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + n); return d.toISOString().split('T')[0]; }
function fmt(iso: string): string { return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }); }
export function calculateEggEmergence(inputs: EggEmergenceInputs): EggEmergenceResult {
  const p = PHASES[inputs.caste];
  const hatch = addDays(inputs.eggDate, p.hatch);
  const capped = addDays(inputs.eggDate, p.capped);
  const emerge = addDays(inputs.eggDate, p.emerge);
  const laying = p.laying > 0 ? addDays(emerge, p.laying) : '';
  const timelineDays = [
    { day: 0, event: 'Egg laid', date: fmt(inputs.eggDate) },
    { day: p.hatch, event: 'Hatches into larva', date: fmt(hatch) },
    { day: p.capped, event: 'Cell capped', date: fmt(capped) },
    { day: p.emerge, event: `${inputs.caste} emerges`, date: fmt(emerge) },
  ];
  if (p.laying > 0) timelineDays.push({ day: p.emerge + p.laying, event: 'Queen should be laying', date: fmt(laying) });
  return { hatchDate: fmt(hatch), cappedDate: fmt(capped), emergenceDate: fmt(emerge), layingDate: laying ? fmt(laying) : '', timelineDays };
}
