import React from 'react';
import { GameScenario } from '../types';
import { AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, Area } from 'recharts';
import { ArrowRight, Trophy, AlertTriangle, BarChart2, BookOpenCheck } from 'lucide-react';

interface ResultScreenProps {
  scenario: GameScenario;
  userChoice: string;
  onNext: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ scenario, userChoice, onNext }) => {
  const { outcome, companyA, companyB, year } = scenario;
  const isWinner = userChoice === outcome.winnerTicker;
  
  const chosenCompany = userChoice === companyA.ticker ? companyA : companyB;
  const winnerCompany = outcome.winnerTicker === companyA.ticker ? companyA : companyB;
  const growth = userChoice === companyA.ticker ? outcome.percentageGrowthA : outcome.percentageGrowthB;

  const chartData = outcome.stockPriceHistoryA.map((point, index) => ({
    year: point.year,
    [companyA.ticker]: point.price,
    [companyB.ticker]: outcome.stockPriceHistoryB[index]?.price || 0,
  }));

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-8 animate-fade-in pb-24">
      
      {/* Result Hero Card */}
      <div className={`relative overflow-hidden rounded-3xl p-8 md:p-12 text-center shadow-2xl mb-8 border-4 ${isWinner ? 'bg-slate-900 border-emerald-500' : 'bg-slate-900 border-rose-500'}`}>
        <div className="relative z-10">
            <div className={`inline-flex items-center justify-center p-4 rounded-full mb-6 ${isWinner ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                {isWinner ? <Trophy className="w-12 h-12" /> : <AlertTriangle className="w-12 h-12" />}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white serif mb-4">
                {isWinner ? "Excellent Analysis" : "Value Trap"}
            </h2>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-light">
                {isWinner 
                  ? `You correctly identified the stronger company. ${chosenCompany.name} proved to be the superior investment.` 
                  : `Unfortunately, ${chosenCompany.name} underperformed compared to ${winnerCompany.name}.`
                }
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="text-center border-r border-white/10">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Your ROI</p>
                    <p className={`font-mono text-2xl font-bold ${growth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {growth > 0 ? '+' : ''}{growth}%
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Winner ROI</p>
                    <p className="font-mono text-2xl font-bold text-emerald-400">
                        {outcome.winnerTicker === companyA.ticker ? `+${outcome.percentageGrowthA}%` : `+${outcome.percentageGrowthB}%`}
                    </p>
                </div>
            </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 p-6 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                  <BarChart2 className="w-5 h-5 mr-2 text-slate-500" />
                  10-Year Stock Performance
              </h3>
          </div>
          
          <div className="flex-grow w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" fontSize={12} stroke="#94a3b8" tickLine={false} axisLine={false} dy={10} />
                <YAxis fontSize={12} stroke="#94a3b8" tickLine={false} axisLine={false} dx={-10} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    itemStyle={{ fontSize: '14px', fontWeight: 600 }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }}/>
                <Area 
                    type="monotone" 
                    dataKey={companyA.ticker} 
                    name={companyA.name} 
                    stroke="#2563eb" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorA)" 
                />
                <Area 
                    type="monotone" 
                    dataKey={companyB.ticker} 
                    name={companyB.name} 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorB)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* The Lesson Card */}
        <div className="lg:col-span-1 flex flex-col">
            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100 shadow-sm flex-grow relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 text-amber-100 opacity-50">
                    <BookOpenCheck className="w-32 h-32" />
                </div>
                
                <h4 className="relative text-sm font-bold text-amber-800 uppercase tracking-widest mb-4 flex items-center">
                    <span className="w-8 h-0.5 bg-amber-600 mr-2"></span>
                    Graham's Perspective
                </h4>
                
                <div className="relative prose prose-sm text-amber-900/80 leading-relaxed font-serif text-lg italic">
                    <p>
                        "{outcome.explanation}"
                    </p>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center pb-8">
        <button
          onClick={onNext}
          className="group relative flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold py-4 px-10 rounded-full shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1"
        >
          <span>Next Scenario</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};