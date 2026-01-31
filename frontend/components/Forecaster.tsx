import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  FileSearch,
  Zap,
  Send
} from 'lucide-react';
import { DailyRecord, MenuItem, ForecastResponse } from '../types';
import { generateDemandForecast } from '../services/geminiService';
import FoodDonation from './FoodDonation';
import WhatIfSimulator from './WhatIfSimulator';

interface ForecasterProps {
  history: DailyRecord[];
  menu: MenuItem[];
  forecast: ForecastResponse | null;
  setForecast: (f: ForecastResponse) => void;
  authToken?: string;
}

const Forecaster: React.FC<ForecasterProps> = ({ history, menu, forecast, setForecast, authToken = '' }) => {
  const [loading, setLoading] = useState(false);
  const [committed, setCommitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async () => {
    setLoading(true);
    setCommitted(false);
    setError(null);
    try {
      const result = await generateDemandForecast(history, menu, authToken);
      setForecast(result);
    } catch (err) {
      setError("Unable to generate forecast. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCommit = () => {
    setCommitted(true);
    setTimeout(() => setCommitted(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="bg-dark-secondary p-8 rounded-[32px] border border-border-muted shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.05] text-accent-teal pointer-events-none">
          <CpuIcon size={240} />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-accent-teal/10 text-accent-teal px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            AI Core: Gemini 3 Flash
          </div>
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
            Predictive Kitchen Intelligence
          </h2>
          <p className="text-text-muted text-lg mb-8 leading-relaxed">
            Our neural engine analyzes 14+ variables including historical velocity, day-of-week trends, and waste coefficients to prevent over-stocking.
          </p>

          <button
            onClick={runAnalysis}
            disabled={loading}
            className="group bg-accent-teal hover:bg-accent-teal-hover disabled:bg-dark-tertiary text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-accent-teal/20 transition-all flex items-center gap-3 active:scale-95"
          >
            {loading ? (
              <RefreshCw className="animate-spin" size={20} />
            ) : (
              <Zap size={20} className="fill-current" />
            )}
            {loading ? 'Crunching Demand Data...' : 'Run Tomorrow\'s Forecast'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-[24px] flex items-start gap-4 text-red-400 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-2 bg-red-500/20 rounded-xl">
            <AlertCircle size={24} />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Forecasting Error</h4>
            <p className="text-red-400/80 leading-relaxed">
              {error}
            </p>
            {error.includes('Quota Exceeded') && (
              <div className="mt-4 p-4 bg-dark-primary/50 border border-red-500/10 rounded-xl text-sm">
                <p className="font-semibold mb-2">💡 Quick Fix:</p>
                <ul className="list-disc list-inside space-y-1 text-red-400/60">
                  <li>Generate a new API key in <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="underline font-bold">Google AI Studio</a></li>
                  <li>Update <code>backend/.env</code> and <code>.env.local</code></li>
                  <li>Restart the backend server</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {forecast && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">Suggested Production</h3>
                <button
                  onClick={handleCommit}
                  disabled={committed}
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${committed
                    ? 'bg-accent-teal/20 text-accent-teal'
                    : 'bg-white text-dark-primary hover:bg-slate-100'
                    }`}
                >
                  {committed ? <CheckCircle2 size={18} /> : <Send size={18} />}
                  {committed ? 'Sent to Kitchen!' : 'Export to Prep Station'}
                </button>
              </div>

              <div className="bg-dark-secondary rounded-[24px] border border-border-muted overflow-hidden shadow-lg">
                <table className="w-full text-left">
                  <thead className="bg-dark-tertiary/20 border-b border-border-muted">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest">Item Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest">Suggested Qty</th>
                      <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest">Confidence</th>
                      <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-widest">Core Reasoning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-muted">
                    {forecast.predictions.map((p) => (
                      <tr key={p.itemId} className="hover:bg-dark-tertiary/10 transition-colors">
                        <td className="px-6 py-5 font-bold text-white">{p.itemName}</td>
                        <td className="px-6 py-5">
                          <div className="inline-flex items-center justify-center bg-accent-teal/10 text-accent-teal h-10 px-4 rounded-xl font-black text-lg">
                            {p.predictedDemand}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-20 bg-dark-tertiary rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-accent-teal h-full rounded-full transition-all duration-1000"
                                style={{ width: `${p.confidence * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-mono font-bold text-text-muted">{(p.confidence * 100).toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-text-muted leading-snug">
                          {p.reasoning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Intelligence Brief</h3>
              <div className="bg-dark-tertiary text-white p-8 rounded-[32px] shadow-2xl border border-border-muted relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:scale-110 duration-500">
                  <FileSearch size={120} />
                </div>

                <h4 className="font-bold flex items-center gap-2 mb-6 text-accent-teal">
                  <Sparkles size={20} />
                  Summary Insights
                </h4>

                <p className="text-slate-300 text-sm leading-relaxed mb-8 relative z-10">
                  {forecast.overallInsight}
                </p>

                <div className="bg-accent-teal/10 border border-accent-teal/20 p-5 rounded-2xl">
                  <p className="text-[10px] text-accent-teal uppercase tracking-widest font-black mb-1">Impact Potential</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">₹{forecast.savingsOpportunity.toFixed(2)}</span>
                    <span className="text-xs text-accent-teal font-bold uppercase">SAVINGS</span>
                  </div>
                  <p className="text-[10px] text-text-muted mt-2 uppercase">Projected for tomorrow's shift</p>
                </div>
              </div>

              <div className="bg-dark-secondary p-6 rounded-3xl border border-border-muted">
                <h4 className="font-bold text-white mb-4 px-1">Optimization Goals</h4>
                <div className="space-y-4">
                  <GoalItem title="Carbon Footprint" desc="Target 12kg CO2 reduction" />
                  <GoalItem title="Inventory Turns" desc="Improve replenishment cycle" />
                  <GoalItem title="Profit Margin" desc="Protect 5-8% extra margin" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!forecast && !loading && (
        <div className="h-[460px] flex flex-col items-center justify-center text-text-muted border-2 border-dashed border-border-muted rounded-[40px] bg-dark-secondary/30">
          <div className="w-20 h-20 bg-dark-tertiary rounded-full flex items-center justify-center mb-6">
            <TrendingUp size={40} className="text-text-muted/50" />
          </div>
          <p className="text-xl font-bold text-white">Awaiting Data Analysis</p>
          <p className="text-text-muted mt-2">Historical trends are ready. Run the forecast to begin.</p>
        </div>
      )}

      {/* What-If Simulator */}
      <WhatIfSimulator history={history} menu={menu} />

      {/* Food Donation Section */}
      <FoodDonation wasteAmount={history.reduce((sum, h) => sum + h.waste, 0)} />
    </div>
  );
};

const GoalItem: React.FC<{ title: string, desc: string }> = ({ title, desc }) => (
  <div className="flex items-start gap-4 p-3 hover:bg-dark-tertiary/50 rounded-2xl transition-colors">
    <div className="w-2 h-2 rounded-full bg-accent-teal mt-2 flex-shrink-0" />
    <div>
      <p className="text-sm font-bold text-white leading-none mb-1">{title}</p>
      <p className="text-xs text-text-muted">{desc}</p>
    </div>
  </div>
);

const CpuIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="15" x2="23" y2="15"></line>
    <line x1="1" x2="4" y1="9" y2="9"></line>
    <line x1="1" x2="4" y1="15" y2="15"></line>
  </svg>
);

export default Forecaster;
