'use client';

import React from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  showValue?: boolean;
}

export function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  showValue = true,
}: SliderInputProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="label-field mb-0">{label}</label>
        {showValue && (
          <span className="text-sm font-medium text-honey-700">
            {value}{unit ? ` ${unit}` : ''}
          </span>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-smoke-200 rounded-lg appearance-none cursor-pointer accent-honey-500"
      />
      <div className="flex justify-between text-xs text-smoke-400 mt-1">
        <span>{min}{unit ? ` ${unit}` : ''}</span>
        <span>{max}{unit ? ` ${unit}` : ''}</span>
      </div>
    </div>
  );
}
