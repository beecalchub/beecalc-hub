'use client';

import { useT } from '@/i18n/runtime';
import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  helpText?: string;
  id?: string;
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
  error,
  helpText,
  id,
}: SelectInputProps) {
  const t = useT();
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div>
      <label htmlFor={inputId} className="label-field">{t(label)}</label>
      <select
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input-field ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{t(opt.label)}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{t(error)}</p>}
      {helpText && !error && <p className="mt-1 text-xs text-smoke-400">{t(helpText)}</p>}
    </div>
  );
}
