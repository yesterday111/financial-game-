import React from 'react';

interface StatRowProps {
  label: string;
  valueA: string | number;
  valueB: string | number;
  highlight?: boolean;
}

export const StatRow: React.FC<StatRowProps> = ({ label, valueA, valueB, highlight = false }) => {
  return (
    <div className={`grid grid-cols-3 gap-4 py-3 border-b border-slate-200 text-sm ${highlight ? 'bg-amber-50' : ''}`}>
      <div className="font-semibold text-slate-700 text-right md:text-center col-span-1 md:col-start-2 order-2 md:order-1 flex items-center justify-end md:justify-center">
        {label}
      </div>
      <div className="text-slate-900 font-mono col-span-1 md:col-start-1 order-1 md:order-2 flex items-center">
        {valueA}
      </div>
      <div className="text-slate-900 font-mono text-right col-span-1 order-3 flex items-center justify-end">
        {valueB}
      </div>
    </div>
  );
};
