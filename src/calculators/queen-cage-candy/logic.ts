export interface Inputs { cageCount: number; }
export interface Result { powderedSugarOz: number; honeyOz: number; total: number; instructions: string; }
export function calculate(i: Inputs): Result {
  const sugar = Math.round(i.cageCount * 0.5 * 10) / 10;
  const honey = Math.round(i.cageCount * 0.15 * 10) / 10;
  return { powderedSugarOz: sugar, honeyOz: honey, total: sugar + honey, instructions: 'Mix powdered sugar with honey until dough-like. Press into queen cage candy hole. Cover with wax paper to prevent drying.' };
}
