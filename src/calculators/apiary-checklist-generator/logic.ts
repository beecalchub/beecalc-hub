export type Season = 'early-spring' | 'late-spring' | 'summer' | 'fall' | 'winter';
export interface ChecklistInputs { season: Season; hiveCount: number; isFirstYear: boolean; hasSupers: boolean; lastMiteCheck: 'recent' | 'overdue' | 'never'; }
interface CheckItem { task: string; priority: 'must' | 'should' | 'optional'; done: boolean; }
export interface ChecklistResult { checklist: Array<{ section: string; items: CheckItem[] }>; totalTasks: number; mustDoCount: number; }

export function generateChecklist(inputs: ChecklistInputs): ChecklistResult {
  const { season, hiveCount, isFirstYear, hasSupers, lastMiteCheck } = inputs;
  const sections: ChecklistResult['checklist'] = [];
  const mk = (task: string, priority: CheckItem['priority'] = 'must'): CheckItem => ({ task, priority, done: false });

  // Always
  const inspection: CheckItem[] = [
    mk('Check for queen / eggs / brood pattern'),
    mk('Assess colony population (frames of bees)'),
    mk('Check honey and pollen stores'),
    mk('Look for signs of disease (AFB, EFB, chalkbrood)'),
    mk('Record observations in hive log', 'should'),
  ];
  sections.push({ section: 'Hive Inspection', items: inspection });

  // Varroa
  const varroa: CheckItem[] = [];
  if (lastMiteCheck === 'overdue' || lastMiteCheck === 'never') {
    varroa.push(mk('Perform alcohol wash or sugar roll mite test'));
  } else {
    varroa.push(mk('Mite test if not done in 4 weeks', 'should'));
  }
  if (season === 'late-spring' || season === 'summer' || season === 'fall') {
    varroa.push(mk('Check sticky board if using one', 'should'));
    varroa.push(mk('Plan or execute treatment if above threshold'));
  }
  sections.push({ section: 'Varroa Management', items: varroa });

  // Season-specific
  if (season === 'early-spring') {
    sections.push({ section: 'Spring Tasks', items: [
      mk('Clean bottom board of winter debris'),
      mk('Begin 1:1 syrup feeding if stores are low'),
      mk('Add pollen patty if natural pollen scarce', 'should'),
      mk('Check for mouse damage', 'should'),
      mk('Remove entrance reducer when temps stay above 50°F'),
      isFirstYear ? mk('Install package bees or nucs') : mk('Check for swarm preparations', 'should'),
    ]});
  } else if (season === 'late-spring') {
    sections.push({ section: 'Late Spring Tasks', items: [
      mk('Add honey supers before nectar flow'),
      mk('Check for swarm cells weekly'),
      mk('Consider making splits if colonies are strong', 'should'),
      mk('Ensure adequate ventilation', 'should'),
    ]});
  } else if (season === 'summer') {
    sections.push({ section: 'Summer Tasks', items: [
      hasSupers ? mk('Check super fill level - add more if 80%+ full') : mk('Add honey supers', 'should'),
      mk('Ensure water source is available and clean'),
      mk('Check for SHB - add traps if needed', 'should'),
      mk('Monitor for signs of dearth (robbing behavior)'),
    ]});
  } else if (season === 'fall') {
    sections.push({ section: 'Fall Tasks', items: [
      mk('Remove honey supers and extract'),
      mk('Treat for varroa mites'),
      mk('Feed 2:1 syrup to build winter stores'),
      mk('Install mouse guards before first frost'),
      mk('Reduce entrance'),
      mk('Assess queen quality - requeen weak queens', 'should'),
      mk('Combine weak colonies', 'optional'),
    ]});
  } else {
    sections.push({ section: 'Winter Tasks', items: [
      mk('Heft hives monthly to check weight (stores)'),
      mk('Ensure ventilation - check for moisture buildup'),
      mk('Add fondant or sugar board if light', 'should'),
      mk('Clear entrance of dead bees after cold snaps'),
      mk('Leave hives closed - do not open below 50°F'),
      mk('Order spring supplies (bees, equipment)', 'optional'),
    ]});
  }

  // Equipment
  if (hiveCount > 1) {
    sections.push({ section: 'Equipment', items: [
      mk(`Prepare supplies for ${hiveCount} hives`, 'should'),
      mk('Clean and repair spare equipment', 'optional'),
    ]});
  }

  const totalTasks = sections.reduce((s, sec) => s + sec.items.length, 0);
  const mustDoCount = sections.reduce((s, sec) => s + sec.items.filter(i => i.priority === 'must').length, 0);
  return { checklist: sections, totalTasks, mustDoCount };
}
