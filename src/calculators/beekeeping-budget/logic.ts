export interface BudgetInputs {
  hiveCount: number;
  isFirstYear: boolean;
  hiveType: 'new-langstroth' | 'used-langstroth' | 'top-bar';
  beeSource: 'package' | 'nuc' | 'swarm';
  includeExtractor: boolean;
  includeProtectiveGear: boolean;
  includeFeeding: boolean;
  includeMiteTreatment: boolean;
}

interface LineItem { category: string; item: string; cost: number; recurring: boolean; essential: boolean; }

export interface BudgetResult {
  firstYearTotal: number;
  annualRecurring: number;
  lineItems: LineItem[];
  perHiveFirstYear: number;
  perHiveAnnual: number;
  breakEvenLbsHoney: number;
  tips: string[];
}

export function calculateBudget(inputs: BudgetInputs): BudgetResult {
  const { hiveCount, isFirstYear, hiveType, beeSource, includeExtractor, includeProtectiveGear, includeFeeding, includeMiteTreatment } = inputs;
  const items: LineItem[] = [];

  // Hive equipment
  const hiveUnitCost = hiveType === 'new-langstroth' ? 200 : hiveType === 'used-langstroth' ? 100 : 150;
  items.push({ category: 'Hive Equipment', item: `${hiveType === 'top-bar' ? 'Top bar hive' : 'Langstroth hive'} (2 deeps, bottom, cover)`, cost: hiveUnitCost * hiveCount, recurring: false, essential: true });
  items.push({ category: 'Hive Equipment', item: 'Honey super per hive', cost: 45 * hiveCount, recurring: false, essential: true });
  items.push({ category: 'Hive Equipment', item: 'Frames & foundation', cost: 30 * hiveCount, recurring: true, essential: true });

  // Bees
  const beeCost = beeSource === 'package' ? 160 : beeSource === 'nuc' ? 200 : 0;
  if (beeCost > 0) items.push({ category: 'Bees', item: `${beeSource === 'package' ? 'Package bees (3 lb)' : '5-frame nuc'} per hive`, cost: beeCost * hiveCount, recurring: false, essential: true });

  // Gear
  if (includeProtectiveGear) {
    items.push({ category: 'Protective Gear', item: 'Bee suit or jacket with veil', cost: 70, recurring: false, essential: true });
    items.push({ category: 'Protective Gear', item: 'Gloves', cost: 15, recurring: true, essential: true });
    items.push({ category: 'Tools', item: 'Smoker', cost: 35, recurring: false, essential: true });
    items.push({ category: 'Tools', item: 'Hive tool', cost: 12, recurring: false, essential: true });
    items.push({ category: 'Tools', item: 'Bee brush', cost: 8, recurring: false, essential: false });
  }

  // Feeding
  if (includeFeeding) {
    items.push({ category: 'Feeding', item: 'Feeder per hive', cost: 15 * hiveCount, recurring: false, essential: true });
    items.push({ category: 'Feeding', item: 'Sugar (annual, ~25 lbs/hive)', cost: 15 * hiveCount, recurring: true, essential: true });
  }

  // Mite treatment
  if (includeMiteTreatment) {
    items.push({ category: 'Varroa Treatment', item: 'OAV vaporizer', cost: 50, recurring: false, essential: true });
    items.push({ category: 'Varroa Treatment', item: 'Oxalic acid + backup treatment (annual)', cost: 8 * hiveCount, recurring: true, essential: true });
  }

  // Extraction
  if (includeExtractor) {
    items.push({ category: 'Extraction', item: 'Manual extractor (2-frame)', cost: 180, recurring: false, essential: false });
    items.push({ category: 'Extraction', item: 'Uncapping knife', cost: 25, recurring: false, essential: false });
    items.push({ category: 'Extraction', item: 'Strainer & bucket', cost: 40, recurring: false, essential: false });
    items.push({ category: 'Extraction', item: 'Jars, lids, labels (annual)', cost: 3 * 40 * hiveCount, recurring: true, essential: false });
  }

  const oneTimeTotal = items.filter(i => !i.recurring).reduce((s, i) => s + i.cost, 0);
  const recurringTotal = items.filter(i => i.recurring).reduce((s, i) => s + i.cost, 0);
  const firstYearTotal = oneTimeTotal + recurringTotal;
  const annualRecurring = recurringTotal + (hiveCount * 10); // misc replacement costs

  const tips: string[] = [];
  if (beeSource === 'swarm') tips.push('Catching swarms is free but unpredictable - great for experienced beekeepers.');
  if (hiveType === 'used-langstroth') tips.push('Used equipment saves money. Scorch or irradiate to kill disease before use.');
  if (!includeExtractor) tips.push('Skip the extractor in year 1 - borrow one from your bee club or use crush-and-strain.');
  tips.push('Join a local beekeeping association - mentorship is the best investment you can make.');

  return {
    firstYearTotal: Math.round(firstYearTotal),
    annualRecurring: Math.round(annualRecurring),
    lineItems: items,
    perHiveFirstYear: Math.round(firstYearTotal / hiveCount),
    perHiveAnnual: Math.round(annualRecurring / hiveCount),
    breakEvenLbsHoney: Math.round(firstYearTotal / 10), // at ~$10/lb
    tips,
  };
}
