'use client';

import { useT } from '@/i18n/runtime';
import React, { useCallback } from 'react';
import { useIsMetricSafe } from '@/context/UnitSystemContext';
import { metricOf, roundTo } from '@/lib/autoUnits';

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
  const t = useT();
  const isMetric = useIsMetricSafe();
  // Auto-convert imperial-only fields: the user sees and types metric, the calculator still receives imperial
  const conv = isMetric ? metricOf(unit) : null;
  const shownUnit = conv ? conv.unit : unit;
  const shownValue = conv && typeof value === 'number' && isFinite(value) ? roundTo(conv.toMetric(value), conv.decimals) : value;
  const inputId = id || `input-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  // Don't coerce intermediate typing states like "3." or "" to 0
  // Clamp typed values to min/max so divisions never hit 0 or invalid ranges
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === '' || raw === '-') return;
      const parsed = parseFloat(raw);
      if (!isNaN(parsed)) {
        if (conv) {
          const imp = conv.toImperial(parsed);
          const lo = min !== undefined ? Math.max(min, imp) : imp;
          onChange(max !== undefined ? Math.min(max, lo) : lo);
          return;
        }
        const lower = min !== undefined ? Math.max(min, parsed) : parsed;
        const clamped = max !== undefined ? Math.min(max, lower) : lower;
        onChange(clamped);
      }
    },
    [onChange, min, max, conv]
  );

  return (
    <div>
      <label htmlFor={inputId} className="label-field">
        {t(label)}
        {shownUnit && <span className="text-smoke-400 font-normal ml-1">({t(shownUnit)})</span>}
      </label>
      <input
        id={inputId}
        type="number"
        inputMode="decimal"
        value={shownValue}
        onChange={handleChange}
        min={conv && min !== undefined ? roundTo(conv.toMetric(min), conv.decimals) : min}
        max={conv && max !== undefined ? roundTo(conv.toMetric(max), conv.decimals) : max}
        step={conv ? 'any' : step}
        placeholder={t(placeholder)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
        className={`input-field ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
      />
      {error && <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600" role="alert">{t(error)}</p>}
      {helpText && !error && <p id={`${inputId}-help`} className="mt-1 text-xs text-smoke-400">{t(helpText)}</p>}
    </div>
  );
}
