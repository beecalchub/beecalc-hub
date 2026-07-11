export interface Inputs { cageCount: number; }
export interface Result { powderedSugarOz: number; honeyOz: number; total: number; instructions: string; }
export function calculate(i: Inputs): Result {
  // ~0.2 oz powdered sugar + ~0.06 oz honey per candy plug (about 1 tsp of finished candy)
  const sugar = Math.round(i.cageCount * 0.2 * 10) / 10;
  const honey = Math.round(i.cageCount * 0.06 * 100) / 100;
  return { powderedSugarOz: sugar, honeyOz: honey, total: sugar + honey, instructions: 'Mix powdered sugar with honey until dough-like. Press into queen cage candy hole. Cover with wax paper to prevent drying.' };
}
