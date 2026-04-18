export interface BeginnerSetupInputs {
  hiveCount: number;
  hiveType: 'langstroth' | 'top-bar';
  beeSource: 'package' | 'nuc';
  includeExtractor: boolean;
}

interface EquipmentLine { item: string; qtyPerHive: number; totalQty: number; unitCost: number; totalCost: number; essential: boolean; }

export interface BeginnerSetupResult {
  equipment: EquipmentLine[];
  totalCost: number;
  essentialCost: number;
  perHiveCost: number;
}

export function calculateBeginnerSetup(inputs: BeginnerSetupInputs): BeginnerSetupResult {
  const { hiveCount, hiveType, beeSource, includeExtractor } = inputs;
  const items: Omit<EquipmentLine, 'totalQty' | 'totalCost'>[] = [];

  if (hiveType === 'langstroth') {
    items.push(
      { item: 'Bottom board', qtyPerHive: 1, unitCost: 25, essential: true },
      { item: 'Deep brood box', qtyPerHive: 2, unitCost: 30, essential: true },
      { item: 'Frames with foundation (10-pack)', qtyPerHive: 2, unitCost: 35, essential: true },
      { item: 'Medium honey super', qtyPerHive: 1, unitCost: 25, essential: true },
      { item: 'Super frames w/ foundation (10-pack)', qtyPerHive: 1, unitCost: 30, essential: true },
      { item: 'Inner cover', qtyPerHive: 1, unitCost: 15, essential: true },
      { item: 'Telescoping outer cover', qtyPerHive: 1, unitCost: 25, essential: true },
      { item: 'Entrance reducer', qtyPerHive: 1, unitCost: 5, essential: true },
      { item: 'Queen excluder', qtyPerHive: 1, unitCost: 12, essential: false },
    );
  } else {
    items.push(
      { item: 'Top-bar hive (complete)', qtyPerHive: 1, unitCost: 200, essential: true },
      { item: 'Extra top bars (10-pack)', qtyPerHive: 1, unitCost: 20, essential: true },
    );
  }

  const beeCost = beeSource === 'package' ? 160 : 200;
  items.push({ item: beeSource === 'package' ? '3 lb bee package with queen' : '5-frame nuc', qtyPerHive: 1, unitCost: beeCost, essential: true });

  // Shared equipment (not per-hive)
  const shared: Omit<EquipmentLine, 'totalQty' | 'totalCost'>[] = [
    { item: 'Bee suit / jacket with veil', qtyPerHive: 0, unitCost: 80, essential: true },
    { item: 'Leather gloves', qtyPerHive: 0, unitCost: 20, essential: true },
    { item: 'Smoker', qtyPerHive: 0, unitCost: 35, essential: true },
    { item: 'Hive tool', qtyPerHive: 0, unitCost: 12, essential: true },
    { item: 'Bee brush', qtyPerHive: 0, unitCost: 8, essential: false },
    { item: 'Feeder (entrance or top)', qtyPerHive: 1, unitCost: 15, essential: true },
    { item: 'Varroa treatment (first round)', qtyPerHive: 1, unitCost: 10, essential: true },
  ];

  if (includeExtractor) {
    shared.push({ item: 'Hand-crank extractor (2-frame)', qtyPerHive: 0, unitCost: 180, essential: false });
    shared.push({ item: 'Uncapping knife', qtyPerHive: 0, unitCost: 25, essential: false });
    shared.push({ item: 'Strainer / bucket', qtyPerHive: 0, unitCost: 30, essential: false });
  }

  const equipment: EquipmentLine[] = [];

  for (const item of items) {
    const totalQty = item.qtyPerHive * hiveCount;
    equipment.push({ ...item, totalQty, totalCost: totalQty * item.unitCost });
  }
  for (const item of shared) {
    const totalQty = item.qtyPerHive === 0 ? 1 : item.qtyPerHive * hiveCount;
    equipment.push({ ...item, totalQty, totalCost: totalQty * item.unitCost });
  }

  const totalCost = equipment.reduce((s, e) => s + e.totalCost, 0);
  const essentialCost = equipment.filter((e) => e.essential).reduce((s, e) => s + e.totalCost, 0);
  const perHiveCost = Math.round(totalCost / hiveCount);

  return { equipment, totalCost, essentialCost, perHiveCost };
}
