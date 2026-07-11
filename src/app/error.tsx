'use client';

import React from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-page py-16 sm:py-24 text-center max-w-lg mx-auto">
      <span className="text-6xl block mb-6" aria-hidden="true">🍯</span>
      <h1 className="font-display text-4xl text-smoke-900 mb-3">Something Went Sticky</h1>
      <p className="text-smoke-600 mb-8">
        An unexpected error occurred. You can try again, or head back to the calculators.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-honey-500 text-white font-semibold hover:bg-honey-600 transition-colors"
          style={{ minHeight: 48 }}
        >
          Try Again
        </button>
        <Link
          href="/calculators"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-smoke-700 font-semibold border-2 border-smoke-200 hover:border-honey-300 transition-colors"
          style={{ minHeight: 48 }}
        >
          Browse Calculators
        </Link>
      </div>
      {error?.digest && (
        <p className="text-xs text-smoke-400 mt-6">Error reference: {error.digest}</p>
      )}
    </div>
  );
}
