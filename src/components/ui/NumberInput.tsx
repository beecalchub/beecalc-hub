'use client';

import React, { useCallback } from 'react';

interface NumberInputProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  error?: string;
  helpText?: string;
  id?: string;
}

export function NumberInput({
  label,
  value,
  onChange,
  unit,
  min,
  max,
  step = 1,
  placeholder,
  error,
  helpText,
  id,
}: NumberInputProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  // Fix #4: Don't coerce intermediate typing states like "3." or "" to 0
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === '' || raw === '-') return;
      const parsed = parseFloat(raw);
      if (!isNaN(parsed)) {
        onChange(parsed);
      }
    },
    [onChange]
  );

  return (
    <div>
      <label htmlFor={inputId} className="label-field">
        {label}
        {unit && <span className="text-smoke-400 font-normal ml-1">({unit})</span>}
      </label>
      <input
        id={inputId}
        type="number"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
        className={`input-field ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
      />
      {error && <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600" role="alert">{error}</p>}
      {helpText && !error && <p id={`${inputId}-help`} className="mt-1 text-xs text-smoke-400">{helpText}</p>}
    </div>
  );
}
