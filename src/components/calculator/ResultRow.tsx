import React from 'react';

interface ResultRowProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
  detail?: string;
}

// Fix #13: detail renders inline, not detached. Whole row is one semantic block.
export function ResultRow({ label, value, unit, highlight = false, detail }: ResultRowProps) {
  return (
    <div
      className={`py-2.5 ${
        highlight ? 'bg-honey-100/50 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-lg' : ''
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
        <span className="text-sm text-smoke-600">{label}</span>
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-mono font-medium ${
              highlight ? 'text-xl text-honey-800' : 'text-base text-smoke-800'
            }`}
          >
            {value}
          </span>
          {unit && <span className="text-sm text-smoke-500">{unit}</span>}
        </div>
      </div>
      {detail && (
        <p className="text-xs text-smoke-400 mt-0.5">{detail}</p>
      )}
    </div>
  );
}
