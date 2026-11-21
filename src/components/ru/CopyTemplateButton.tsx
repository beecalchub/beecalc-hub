'use client';

import React, { useState } from 'react';

export function CopyTemplateButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable - the questions are visible on the page anyway
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-smoke-200 bg-white text-sm font-medium text-smoke-700 hover:border-honey-300 hover:text-honey-700 transition-colors"
      style={{ minHeight: 36 }}
    >
      {copied ? '✓ Скопировано' : '📋 Скопировать вопросы'}
    </button>
  );
}
