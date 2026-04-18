import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with BeeCalc Hub.',
};

const EMAIL = 'beecalchub@gmail.com';

export default function ContactPage() {
  return (
    <div className="container-page py-8 sm:py-12 max-w-2xl">
      <h1 className="font-display text-3xl sm:text-4xl text-smoke-900 mb-6">Contact</h1>

      <div className="card-base p-6 sm:p-8">
        <div className="text-center mb-6">
          <span className="text-5xl mb-4 block">📬</span>
          <h2 className="font-display text-xl text-smoke-800 mb-3">We&apos;d Love to Hear From You</h2>
          <p className="text-smoke-600 max-w-md mx-auto">
            Have a suggestion for a new calculator? Found a bug? Reach out and let us know.
          </p>
        </div>

        <div className="space-y-3 max-w-sm mx-auto">
          <a href={`mailto:${EMAIL}?subject=BeeCalc%20Hub%20-%20General%20Inquiry`}
             className="flex items-center gap-3 p-4 bg-smoke-50 rounded-lg hover:bg-honey-50 transition-colors"
             style={{ minHeight: 60 }}>
            <span className="text-2xl">📧</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-smoke-700">Email</p>
              <p className="text-sm text-honey-600">{EMAIL}</p>
            </div>
          </a>
          <a href={`mailto:${EMAIL}?subject=BeeCalc%20Hub%20-%20Bug%20Report&body=Please%20describe%20the%20bug%3A%0A%0AWhat%20were%20you%20trying%20to%20do%3F%0A%0AWhat%20happened%20instead%3F%0A%0ABrowser%2Fdevice%3A`}
             className="flex items-center gap-3 p-4 bg-smoke-50 rounded-lg hover:bg-honey-50 transition-colors"
             style={{ minHeight: 60 }}>
            <span className="text-2xl">🐛</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-smoke-700">Report a Bug</p>
              <p className="text-sm text-honey-600">{EMAIL}</p>
            </div>
          </a>
          <a href={`mailto:${EMAIL}?subject=BeeCalc%20Hub%20-%20Feature%20Request&body=What%20calculator%20or%20feature%20would%20you%20like%20to%20see%3F%0A%0AHow%20would%20you%20use%20it%3F`}
             className="flex items-center gap-3 p-4 bg-smoke-50 rounded-lg hover:bg-honey-50 transition-colors"
             style={{ minHeight: 60 }}>
            <span className="text-2xl">💡</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-smoke-700">Feature Request</p>
              <p className="text-sm text-honey-600">{EMAIL}</p>
            </div>
          </a>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/calculators" className="btn-secondary">Back to Calculators</Link>
      </div>
    </div>
  );
}
