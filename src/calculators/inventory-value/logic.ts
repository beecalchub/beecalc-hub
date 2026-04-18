export interface InventoryInputs { items: Array<{ name: string; quantity: number; unitValue: number; category: string }> }
export interface InventoryResult { totalValue: number; byCategory: Array<{ category: string; value: number; itemCount: number }>; itemCount: number; }
export const DEFAULT_ITEMS = [
  { name: 'Complete hive (2 deep)', quantity: 5, unitValue: 250, category: 'Hives' },
  { name: 'Honey super (with frames)', quantity: 10, unitValue: 45, category: 'Hives' },
  { name: 'Bee suit', quantity: 1, unitValue: 70, category: 'Gear' },
  { name: 'Smoker', quantity: 1, unitValue: 35, category: 'Gear' },
  { name: 'Extractor', quantity: 1, unitValue: 200, category: 'Extraction' },
  { name: 'Bottling tank', quantity: 1, unitValue: 80, category: 'Extraction' },
  { name: 'Honey in stock (lbs)', quantity: 50, unitValue: 10, category: 'Inventory' },
  { name: 'Jars & lids', quantity: 200, unitValue: 1, category: 'Supplies' },
];
export function calculateInventory(inputs: InventoryInputs): InventoryResult {
  const byCatMap: Record<string, { value: number; itemCount: number }> = {};
  inputs.items.forEach(i => {
    const v = i.quantity * i.unitValue;
    if (!byCatMap[i.category]) byCatMap[i.category] = { value: 0, itemCount: 0 };
    byCatMap[i.category].value += v; byCatMap[i.category].itemCount++;
  });
  const byCategory = Object.entries(byCatMap).map(([category, d]) => ({ category, value: Math.round(d.value * 100) / 100, itemCount: d.itemCount })).sort((a, b) => b.value - a.value);
  return { totalValue: Math.round(inputs.items.reduce((s, i) => s + i.quantity * i.unitValue, 0) * 100) / 100, byCategory, itemCount: inputs.items.length };
}
