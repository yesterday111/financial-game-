import React from 'react';
import { GameScenario } from '../types';
import { TrendingUp, DollarSign, Activity, PieChart, Layers, Users, Building2, Wallet, ArrowDownUp, Globe } from 'lucide-react';

interface MetricCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
    <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center gap-2">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
      <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">{title}</h3>
    </div>
    <div className="p-0">
      {children}
    </div>
  </div>
);

interface GameScreenProps {
  scenario: GameScenario;
  onSelect: (ticker: string) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ scenario, onSelect }) => {
  const { companyA, companyB, year, theme, sector } = scenario;

  const renderVisualRow = (label: string, valA: string | number, valB: string | number, type: 'text' | 'currency' | 'percent' = 'text', highlight = false) => {
    return (
      <div className={`grid grid-cols-7 gap-2 py-3 border-b border-slate-100 items-center text-sm ${highlight ? 'bg-amber-50/50' : ''}`}>
        <div className="col-span-2 text-left pl-3 font-mono font-medium text-slate-800 break-words">{valA}</div>
        <div className="col-span-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center justify-center">{label}</div>
        <div className="col-span-2 text-right pr-3 font-mono font-medium text-slate-800 break-words">{valB}</div>
      </div>
    );
  };

  const MarketShareVisual = () => (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
      <div className="flex items-center gap-2 mb-6">
         <div className="p-2 bg-indigo-50 rounded-lg">
           <PieChart className="w-5 h-5 text-indigo-600" />
         </div>
         <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">Market Share: {sector}</h3>
      </div>
      
      <div className="space-y-6">
        {/* Company A */}
        <div>
          <div className="flex justify-between text-sm mb-2 font-medium">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              {companyA.name}
            </span>
            <span>{companyA.marketSharePercent}% of Sector</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-1000" 
              style={{ width: `${Math.min(companyA.marketSharePercent, 100)}%` }}
            />
          </div>
        </div>

        {/* Company B */}
        <div>
           <div className="flex justify-between text-sm mb-2 font-medium">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
              {companyB.name}
            </span>
            <span>{companyB.marketSharePercent}% of Sector</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-600 rounded-full transition-all duration-1000" 
              style={{ width: `${Math.min(companyB.marketSharePercent, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-8 animate-fade-in pb-32">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex justify-center gap-2 mb-4">
           <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase">
            Year: {year}
          </span>
          <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-600 text-xs font-bold tracking-widest uppercase">
            Era: {year}s
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 serif mb-4">{theme}</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Comparing two giants in the <strong>{sector}</strong> sector. 
          All figures converted to USD. Based on Benjamin Graham's principles, who survives?
        </p>
      </div>

      {/* Comparison Header */}
      <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8 sticky top-4 z-20">
        <div 
          onClick={() => onSelect(companyA.ticker)}
          className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all group"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
              {companyA.ticker[0]}
            </div>
            <div className="text-center md:text-left min-w-0">
              <h3 className="font-bold text-slate-900 text-lg leading-tight truncate">{companyA.name}</h3>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                <span className="text-blue-600 font-mono font-bold">{companyA.ticker}</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500 flex items-center gap-1">
                    <Globe className="w-3 h-3" /> {companyA.country}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div 
          onClick={() => onSelect(companyB.ticker)}
          className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border-2 border-transparent hover:border-emerald-500 cursor-pointer transition-all group"
        >
          <div className="flex flex-col md:flex-row items-center md:items-end justify-end gap-4 text-right">
             <div className="text-center md:text-right order-2 md:order-1 min-w-0">
              <h3 className="font-bold text-slate-900 text-lg leading-tight truncate">{companyB.name}</h3>
               <div className="flex items-center justify-center md:justify-end gap-2 text-sm">
                <span className="text-slate-500 flex items-center gap-1">
                    {companyB.country} <Globe className="w-3 h-3" />
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-emerald-600 font-mono font-bold">{companyB.ticker}</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors flex-shrink-0 order-1 md:order-2">
              {companyB.ticker[0]}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Left Column: Valuation & Income */}
        <div className="space-y-6">
          <MetricCard title="Market Valuation" icon={TrendingUp}>
            {renderVisualRow("Stock Price", companyA.stockPrice, companyB.stockPrice)}
            {renderVisualRow("Market Cap", companyA.marketCap, companyB.marketCap, 'text', true)}
            {renderVisualRow("P/E Ratio", companyA.peRatio, companyB.peRatio)}
            {renderVisualRow("Beta (Risk)", companyA.beta, companyB.beta)}
            {renderVisualRow("Div Yield", companyA.dividendYield, companyB.dividendYield)}
          </MetricCard>

          <MetricCard title="Income Statement" icon={DollarSign}>
            {renderVisualRow("Revenue", companyA.revenue, companyB.revenue)}
            {renderVisualRow("Net Income", companyA.netIncome, companyB.netIncome, 'text', true)}
            {renderVisualRow("EPS", companyA.eps, companyB.eps)}
            {renderVisualRow("Gross Margin", companyA.grossMargin, companyB.grossMargin)}
            {renderVisualRow("Operating Margin", companyA.operatingMargin, companyB.operatingMargin)}
          </MetricCard>
        </div>

        {/* Right Column: Balance Sheet & Health */}
        <div className="space-y-6">
           <MarketShareVisual />

           <MetricCard title="Balance Sheet" icon={Wallet}>
            {renderVisualRow("Total Assets", companyA.totalAssets, companyB.totalAssets)}
            {renderVisualRow("Cash", companyA.cashAndEquivalents, companyB.cashAndEquivalents)}
            {renderVisualRow("Total Debt", companyA.totalDebt, companyB.totalDebt, 'text', true)}
            {renderVisualRow("Liabilities", companyA.totalLiabilities, companyB.totalLiabilities)}
            {renderVisualRow("Book Value/Share", companyA.bookValuePerShare, companyB.bookValuePerShare)}
          </MetricCard>

          <MetricCard title="Financial Health" icon={Activity}>
             {renderVisualRow("Current Ratio", companyA.currentRatio, companyB.currentRatio)}
             {renderVisualRow("Debt / Equity", companyA.debtToEquity, companyB.debtToEquity)}
             {renderVisualRow("ROE", companyA.roe, companyB.roe)}
             {renderVisualRow("Employees", companyA.employees, companyB.employees)}
          </MetricCard>
        </div>

      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-30">
        <div className="max-w-4xl mx-auto flex gap-4">
          <button 
            onClick={() => onSelect(companyA.ticker)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 active:scale-95"
          >
            Invest in {companyA.ticker}
          </button>
          <button 
            onClick={() => onSelect(companyB.ticker)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 active:scale-95"
          >
            Invest in {companyB.ticker}
          </button>
        </div>
      </div>

    </div>
  );
};