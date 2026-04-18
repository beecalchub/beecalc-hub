'use client';
import React, { useMemo, useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { formatCurrency } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateInventory, DEFAULT_ITEMS } from './logic';
export function InventoryValueCalculator() {
  const [items, setItems] = useState([...DEFAULT_ITEMS]);
  const update = useCallback((i: number, f: string, v: string | number) => setItems(p => { const n = [...p]; n[i] = { ...n[i], [f]: v }; return n; }), []);
  const add = () => setItems(p => [...p, { name: '', quantity: 1, unitValue: 0, category: 'Other' }]);
  const remove = (i: number) => setItems(p => p.filter((_, j) => j !== i));
  const result = useMemo(() => calculateInventory({ items }), [items]);
  const reset = () => setItems([...DEFAULT_ITEMS]);
  const copyText = () => formatResultsForCopy('Inventory Value', [{ label: 'Total', value: formatCurrency(result.totalValue) }, ...result.byCategory.map(c => ({ label: c.category, value: formatCurrency(c.value) }))]);
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm font-medium text-smoke-700 mb-3">Equipment & inventory items:</p>
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">{items.map((item, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2 p-3 bg-smoke-50 rounded-lg">
            <div className="flex-1"><label className="text-xs text-smoke-500">Item</label><input type="text" value={item.name} onChange={(e) => update(i, 'name', e.target.value)} className="input-field text-sm" /></div>
            <div className="w-20"><label className="text-xs text-smoke-500">Qty</label><input type="number" value={item.quantity} onChange={(e) => update(i, 'quantity', parseInt(e.target.value) || 0)} className="input-field text-sm" min="0" /></div>
            <div className="w-24"><label className="text-xs text-smoke-500">$/unit</label><input type="number" value={item.unitValue} onChange={(e) => update(i, 'unitValue', parseFloat(e.target.value) || 0)} className="input-field text-sm" min="0" step="5" /></div>
            <div className="w-24"><label className="text-xs text-smoke-500">Category</label><input type="text" value={item.category} onChange={(e) => update(i, 'category', e.target.value)} className="input-field text-sm" /></div>
            <button type="button" onClick={() => remove(i)} className="self-end p-2 text-smoke-400 hover:text-red-500" style={{ minHeight: 44, minWidth: 44 }} aria-label="Remove">✕</button>
          </div>
        ))}</div>
        <button type="button" onClick={add} className="mt-2 text-sm text-honey-600 hover:text-honey-700 font-medium py-2" style={{ minHeight: 44 }}>+ Add item</button>
        <div className="flex gap-2 mt-4"><ResetButton onReset={reset} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total inventory value" value={formatCurrency(result.totalValue)} highlight />
        {result.byCategory.map(c => <ResultRow key={c.category} label={c.category} value={formatCurrency(c.value)} detail={`${c.itemCount} items`} />)}
      </ResultPanel>
    </div>
  );
}
