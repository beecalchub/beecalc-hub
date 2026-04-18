'use client';

import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

// Fix #10, #18: Shared checkbox with 44px minimum touch target
export function Checkbox({ label, checked, onChange, id }: CheckboxProps) {
  const inputId = id || `cb-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <label
      htmlFor={inputId}
      className="flex items-center gap-3 py-2 px-1 cursor-pointer -mx-1 rounded-lg hover:bg-smoke-50 transition-colors select-none"
      style={{ minHeight: 44 }}
    >
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded border-smoke-300 text-honey-500 focus:ring-honey-400 focus:ring-2 flex-shrink-0"
      />
      <span className="text-sm text-smoke-700">{label}</span>
    </label>
  );
}
