import React from 'react';
import Link from 'next/link';

export function DisclaimerBar() {
  return (
    <div className="mt-6 px-4 py-3 bg-smoke-50 border border-smoke-100 rounded-lg text-xs text-smoke-500 leading-relaxed">
      <strong className="text-smoke-600">Disclaimer:</strong> BeeCalc Hub calculators provide estimates and guidance based on
      common beekeeping practices. Results should be adapted to your local conditions, climate, and hive setup.
      Always consult experienced beekeepers or extension services for critical management decisions.{' '}
      <Link href="/disclaimer" className="text-honey-700 hover:underline">Read full disclaimer →</Link>
    </div>
  );
}
