export interface RotationInputs { yearCount: number; treatmentsAvailable: string[]; }
interface YearPlan { year: number; spring: string; summer: string; fall: string; }
export interface RotationResult { plan: YearPlan[]; chemistryClasses: Array<{ treatment: string; class: string }>; explanation: string; }
const CLASSES: Record<string, string> = { 'oav': 'Organic acid', 'formic-pro': 'Organic acid', 'apivar': 'Amitraz', 'apiguard': 'Thymol (essential oil)', 'hopguard': 'Hop beta acids', 'checkmite': 'Organophosphate' };
const NAMES: Record<string, string> = { 'oav': 'OAV', 'formic-pro': 'Formic Pro', 'apivar': 'Apivar', 'apiguard': 'Apiguard', 'hopguard': 'HopGuard', 'checkmite': 'CheckMite+' };
export function getAllTreatments() { return Object.entries(NAMES).map(([v, l]) => ({ value: v, label: l })); }
export function calculateRotation(inputs: RotationInputs): RotationResult {
  const { yearCount, treatmentsAvailable } = inputs;
  const avail = treatmentsAvailable.length > 0 ? treatmentsAvailable : ['oav', 'formic-pro'];
  const plan: YearPlan[] = [];
  for (let y = 1; y <= yearCount; y++) {
    const springIdx = (y - 1) % avail.length;
    const summerIdx = (y) % avail.length;
    const fallIdx = (y + 1) % avail.length;
    plan.push({ year: y, spring: NAMES[avail[springIdx]] || avail[springIdx], summer: NAMES[avail[summerIdx]] || avail[summerIdx], fall: NAMES[avail[fallIdx]] || avail[fallIdx] });
  }
  const chemistryClasses = treatmentsAvailable.map(t => ({ treatment: NAMES[t] || t, class: CLASSES[t] || 'Unknown' }));
  const classSet = new Set(chemistryClasses.map(c => c.class));
  const explanation = classSet.size >= 2 ? `Good rotation - ${classSet.size} different chemistry classes prevents resistance buildup.` : 'Warning: All treatments use the same chemistry class. Add a treatment from a different class to slow resistance development.';
  return { plan, chemistryClasses, explanation };
}
