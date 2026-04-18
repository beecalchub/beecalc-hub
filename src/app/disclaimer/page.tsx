import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disclaimer & Assumptions',
  description: 'Important information about the assumptions, limitations, and intended use of BeeCalc Hub calculators.',
};

export default function DisclaimerPage() {
  return (
    <div className="container-page py-8 sm:py-12 max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl text-smoke-900 mb-6">Disclaimer & Assumptions</h1>

      <div className="space-y-6 text-smoke-700 leading-relaxed">
        <div className="p-4 bg-honey-50 border border-honey-200 rounded-lg">
          <p className="text-sm text-honey-900">
            <strong>Key point:</strong> BeeCalc Hub calculators provide estimates and guidance based on commonly accepted
            beekeeping practices. They are not a substitute for professional advice, local knowledge, or hands-on experience.
          </p>
        </div>

        <h2 className="font-display text-xl text-smoke-900 mt-8 mb-3">General Assumptions</h2>
        <p>
          Our calculators use standard values from beekeeping literature, extension services, and widely accepted
          rules of thumb. These include average frame weights, standard hive dimensions (Langstroth), typical
          laying rates, and commonly referenced treatment protocols. Where we use specific assumptions,
          they are listed on each calculator page.
        </p>

        <h2 className="font-display text-xl text-smoke-900 mt-8 mb-3">Regional Variation</h2>
        <p>
          Beekeeping practices vary significantly by region, climate, race of bees, local flora, and management
          style. Calculators that reference winter stores, flow timing, or forage should be adapted to your
          specific conditions. A beekeeper in Alberta will have different needs than one in Georgia or the UK.
        </p>

        <h2 className="font-display text-xl text-smoke-900 mt-8 mb-3">Calculator Types</h2>
        <p>
          Each calculator is labeled by type to set appropriate expectations:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li><strong>Exact Calculator</strong> - mathematical conversion or formula with precise output</li>
          <li><strong>Estimate</strong> - approximation based on typical values; actual results will vary</li>
          <li><strong>Scorecard</strong> - weighted assessment to help evaluate a situation</li>
          <li><strong>Planner</strong> - timeline or resource planning tool</li>
          <li><strong>Projection</strong> - forward-looking estimate based on trends or rates</li>
          <li><strong>Decision Helper</strong> - guided tool to support a yes/no or action decision</li>
        </ul>

        <h2 className="font-display text-xl text-smoke-900 mt-8 mb-3">Medical & Treatment Disclaimer</h2>
        <p>
          Calculators involving varroa treatment, disease management, or chemical applications are informational
          only. Always follow product label instructions, local regulations, and consult with your state or
          provincial apiarist or veterinarian for treatment decisions. Dosage calculators should be confirmed
          against the manufacturer&apos;s guidelines.
        </p>

        <h2 className="font-display text-xl text-smoke-900 mt-8 mb-3">Financial Disclaimer</h2>
        <p>
          Business and pricing calculators provide estimates for planning purposes. Actual costs, revenues, and
          market prices vary by location, season, and market conditions. These tools do not constitute financial
          advice. Consult an accountant or financial advisor for business decisions.
        </p>

        <h2 className="font-display text-xl text-smoke-900 mt-8 mb-3">Liability</h2>
        <p>
          BeeCalc Hub is provided as-is, without warranty of any kind. The creators are not liable for any
          outcomes resulting from the use of these calculators. Use your own judgment and consult local experts
          for critical decisions affecting your bees, health, or business.
        </p>
      </div>

      <div className="mt-10">
        <Link href="/calculators" className="btn-primary">Back to Calculators</Link>
      </div>
    </div>
  );
}
