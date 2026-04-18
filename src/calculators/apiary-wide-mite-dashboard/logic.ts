export interface MiteDashboardInputs { hives: Array<{ name: string; mitesPerHundred: number; lastTestDate: string }>; }
export interface MiteDashboardResult { avgMiteLevel: number; maxMiteLevel: number; hivesAboveThreshold: number; hivesNeedingTest: number; overallRisk: string; perHive: Array<{ name: string; level: number; risk: string; daysSinceTest: number }>; }
export function calculateMiteDashboard(inputs: MiteDashboardInputs): MiteDashboardResult {
  const today = new Date();
  const perHive = inputs.hives.map((h) => {
    const daysSinceTest = Math.round((today.getTime() - new Date(h.lastTestDate + 'T12:00:00').getTime()) / 86400000);
    const risk = h.mitesPerHundred >= 3 ? 'Critical' : h.mitesPerHundred >= 2 ? 'High' : h.mitesPerHundred >= 1 ? 'Moderate' : 'Low';
    return { name: h.name, level: h.mitesPerHundred, risk, daysSinceTest: Math.max(0, daysSinceTest) };
  });
  const levels = perHive.map(h => h.level);
  const avg = levels.length > 0 ? Math.round(levels.reduce((a, b) => a + b, 0) / levels.length * 100) / 100 : 0;
  const max = levels.length > 0 ? Math.max(...levels) : 0;
  const above = perHive.filter(h => h.level >= 2).length;
  const needTest = perHive.filter(h => h.daysSinceTest > 30).length;
  const overallRisk = avg >= 3 ? 'Critical - treat entire apiary' : avg >= 2 ? 'High - multiple hives need treatment' : avg >= 1 ? 'Moderate - monitor closely' : 'Low - continue regular testing';
  return { avgMiteLevel: avg, maxMiteLevel: max, hivesAboveThreshold: above, hivesNeedingTest: needTest, overallRisk, perHive };
}
export function createDefaultHives(n: number) { const d = new Date().toISOString().split('T')[0]; return Array.from({ length: n }, (_, i) => ({ name: `Hive ${i + 1}`, mitesPerHundred: 1, lastTestDate: d })); }
