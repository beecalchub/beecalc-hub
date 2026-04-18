export interface Inputs { hiveCount: number; setupLevel: 'basic' | 'standard' | 'commercial'; }
export interface Result { items: Array<{ name: string; qty: number; cost: number }>; totalCost: number; }
export function calculate(i: Inputs): Result {
  const multi: Record<string, number> = { basic: 1, standard: 1.3, commercial: 1.6 };
  const m = multi[i.setupLevel];
  const items = [
    { name: 'Hive bodies (complete)', qty: i.hiveCount, cost: Math.round(i.hiveCount * 200 * m) },
    { name: 'Honey supers', qty: i.hiveCount * 2, cost: Math.round(i.hiveCount * 2 * 45) },
    { name: 'Frames and foundation', qty: i.hiveCount * 30, cost: Math.round(i.hiveCount * 75) },
    { name: 'Bee suits / jackets', qty: Math.max(1, Math.ceil(i.hiveCount / 10)), cost: Math.round(Math.max(1, Math.ceil(i.hiveCount / 10)) * 80) },
    { name: 'Smoker', qty: Math.max(1, Math.ceil(i.hiveCount / 20)), cost: Math.round(Math.max(1, Math.ceil(i.hiveCount / 20)) * 40) },
    { name: 'Hive tools', qty: Math.max(1, Math.ceil(i.hiveCount / 15)), cost: Math.round(Math.max(1, Math.ceil(i.hiveCount / 15)) * 15) },
    { name: 'Feeders', qty: i.hiveCount, cost: Math.round(i.hiveCount * 15) },
    { name: 'Extractor', qty: i.setupLevel === 'basic' ? 0 : 1, cost: i.setupLevel === 'basic' ? 0 : i.setupLevel === 'commercial' ? 1500 : 300 },
  ].filter(item => item.qty > 0);
  return { items, totalCost: items.reduce((s, it) => s + it.cost, 0) };
}
