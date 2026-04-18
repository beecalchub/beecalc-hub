export type UnitSystem = 'metric' | 'imperial';

export type UnitCategory =
  | 'weight'
  | 'volume'
  | 'length'
  | 'area'
  | 'temperature';

export interface UnitLabel {
  metric: string;
  imperial: string;
}

export interface UnitConversion {
  toMetric: (value: number) => number;
  toImperial: (value: number) => number;
  labels: UnitLabel;
}
