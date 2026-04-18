import React from 'react';
import Link from 'next/link';

const BEGINNER_TOOLS = [
  { slug: 'beginner-hive-setup', icon: '🌱', label: 'Plan Your First Hive', desc: 'Equipment list and cost breakdown' },
  { slug: 'sugar-syrup', icon: '🧪', label: 'Mix Sugar Syrup', desc: 'Get the ratio right every time' },
  { slug: 'varroa-infestation-rate', icon: '🔬', label: 'Check Mite Levels', desc: 'Know when to treat' },
  { slug: 'honey-bottling', icon: '🫙', label: 'Bottle Your Honey', desc: 'Plan jars for your harvest' },
];

export function BeginnerSection() {
  return (
    <section className="bg-gradient-to-br from-honey-50 to-comb-100 py-12 sm:py-16">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl text-smoke-900 mb-2">New to Beekeeping?</h2>
          <p className="text-smoke-600">
            Start with these essential calculators. Each one helps you make
            confident decisions from your very first season.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {BEGINNER_TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={`/calculator/${tool.slug}`}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-card hover:shadow-warm transition-all group"
            >
              <span className="text-3xl flex-shrink-0">{tool.icon}</span>
              <div>
                <p className="font-display text-base text-smoke-800 group-hover:text-honey-700 transition-colors">
                  {tool.label}
                </p>
                <p className="text-sm text-smoke-500">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/category/education-and-hobbyist" className="btn-secondary">
            See All Beginner Tools
          </Link>
        </div>
      </div>
    </section>
  );
}
