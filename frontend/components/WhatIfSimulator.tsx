import React, { useState, useMemo } from 'react';
import { Sliders, TrendingUp, TrendingDown, RefreshCw, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';
import { DailyRecord, MenuItem } from '../types';

interface WhatIfSimulatorProps {
    history: DailyRecord[];
    menu: MenuItem[];
}

interface Scenario {
    id: string;
    label: string;
    description: string;
    multiplier: number;
    icon: React.ReactNode;
}

const SCENARIOS: Scenario[] = [
    { id: 'normal', label: 'Normal Day', description: 'Regular weekday traffic', multiplier: 1.0, icon: <CheckCircle size={16} /> },
    { id: 'weekend', label: 'Weekend Rush', description: '+40% customer traffic', multiplier: 1.4, icon: <TrendingUp size={16} /> },
    { id: 'holiday', label: 'Holiday Special', description: '+60% demand spike', multiplier: 1.6, icon: <Sparkles size={16} /> },
    { id: 'rainy', label: 'Rainy Day', description: '-20% footfall, +comfort food', multiplier: 0.85, icon: <AlertTriangle size={16} /> },
    { id: 'event', label: 'Nearby Event', description: '+80% surge expected', multiplier: 1.8, icon: <TrendingUp size={16} /> },
    { id: 'slow', label: 'Slow Monday', description: '-25% expected traffic', multiplier: 0.75, icon: <TrendingDown size={16} /> },
];

const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ history, menu }) => {
    const [selectedScenario, setSelectedScenario] = useState<string>('normal');
    const [customMultiplier, setCustomMultiplier] = useState<number>(100);
    const [useCustom, setUseCustom] = useState(false);

    // Calculate base predictions from history
    const basePredictions = useMemo(() => {
        const itemAverages: Record<string, { avgSold: number, avgWaste: number, count: number }> = {};

        history.forEach(record => {
            if (!itemAverages[record.itemName]) {
                itemAverages[record.itemName] = { avgSold: 0, avgWaste: 0, count: 0 };
            }
            itemAverages[record.itemName].avgSold += record.sold;
            itemAverages[record.itemName].avgWaste += record.waste;
            itemAverages[record.itemName].count += 1;
        });

        return menu.map(item => {
            const stats = itemAverages[item.name] || { avgSold: 20, avgWaste: 3, count: 1 };
            return {
                id: item.id,
                name: item.name,
                baseDemand: Math.round(stats.avgSold / Math.max(1, stats.count)),
                baseWaste: Math.round(stats.avgWaste / Math.max(1, stats.count)),
                unitPrice: item.unitPrice,
                costPerUnit: item.costPerUnit
            };
        });
    }, [history, menu]);

    // Calculate adjusted predictions based on scenario
    const adjustedPredictions = useMemo(() => {
        const scenario = SCENARIOS.find(s => s.id === selectedScenario);
        const multiplier = useCustom ? customMultiplier / 100 : (scenario?.multiplier || 1.0);

        return basePredictions.map(item => {
            const adjustedDemand = Math.round(item.baseDemand * multiplier);
            const suggestedPrep = Math.round(adjustedDemand * 1.05); // 5% buffer
            const expectedWaste = suggestedPrep - adjustedDemand;
            const revenue = adjustedDemand * item.unitPrice;
            const wasteCost = expectedWaste * item.costPerUnit;

            return {
                ...item,
                adjustedDemand,
                suggestedPrep,
                expectedWaste,
                revenue,
                wasteCost,
                change: ((adjustedDemand - item.baseDemand) / item.baseDemand * 100).toFixed(0)
            };
        });
    }, [basePredictions, selectedScenario, customMultiplier, useCustom]);

    // Calculate totals
    const totals = useMemo(() => {
        const totalDemand = adjustedPredictions.reduce((sum, p) => sum + p.adjustedDemand, 0);
        const totalPrep = adjustedPredictions.reduce((sum, p) => sum + p.suggestedPrep, 0);
        const totalRevenue = adjustedPredictions.reduce((sum, p) => sum + p.revenue, 0);
        const totalWasteCost = adjustedPredictions.reduce((sum, p) => sum + p.wasteCost, 0);

        return { totalDemand, totalPrep, totalRevenue, totalWasteCost };
    }, [adjustedPredictions]);

    const currentScenario = SCENARIOS.find(s => s.id === selectedScenario);

    return (
        <div className="bg-dark-secondary p-6 rounded-2xl border border-border-muted shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-xl">
                        <Sliders size={20} className="text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">What-If Simulator</h3>
                        <p className="text-text-muted text-sm">Test different scenarios</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setSelectedScenario('normal');
                        setUseCustom(false);
                        setCustomMultiplier(100);
                    }}
                    className="p-2 hover:bg-dark-tertiary rounded-lg transition-colors text-text-muted hover:text-white"
                >
                    <RefreshCw size={18} />
                </button>
            </div>

            {/* Scenario Selector */}
            <div className="grid grid-cols-3 gap-2 mb-6">
                {SCENARIOS.map(scenario => (
                    <button
                        key={scenario.id}
                        onClick={() => {
                            setSelectedScenario(scenario.id);
                            setUseCustom(false);
                        }}
                        className={`p-3 rounded-xl border transition-all text-left ${selectedScenario === scenario.id && !useCustom
                                ? 'bg-purple-500/20 border-purple-500/50 text-white'
                                : 'bg-dark-primary border-border-muted text-text-muted hover:border-purple-500/30'
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <span className={selectedScenario === scenario.id && !useCustom ? 'text-purple-400' : 'text-text-muted'}>
                                {scenario.icon}
                            </span>
                            <span className="text-xs font-bold">{scenario.label}</span>
                        </div>
                        <p className="text-[10px] text-text-muted">{scenario.description}</p>
                    </button>
                ))}
            </div>

            {/* Custom Slider */}
            <div className="mb-6 p-4 bg-dark-primary rounded-xl border border-border-muted">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-white flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={useCustom}
                            onChange={(e) => setUseCustom(e.target.checked)}
                            className="w-4 h-4 rounded border-border-muted bg-dark-primary text-purple-500 focus:ring-purple-500"
                        />
                        Custom Multiplier
                    </label>
                    <span className={`text-lg font-bold ${useCustom ? 'text-purple-400' : 'text-text-muted'}`}>
                        {customMultiplier}%
                    </span>
                </div>
                <input
                    type="range"
                    min="50"
                    max="200"
                    value={customMultiplier}
                    onChange={(e) => {
                        setCustomMultiplier(parseInt(e.target.value));
                        setUseCustom(true);
                    }}
                    className="w-full h-2 bg-dark-tertiary rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-text-muted mt-1">
                    <span>-50%</span>
                    <span>Normal</span>
                    <span>+100%</span>
                </div>
            </div>

            {/* Results Table */}
            <div className="bg-dark-primary rounded-xl border border-border-muted overflow-hidden mb-4">
                <table className="w-full text-sm">
                    <thead className="bg-dark-tertiary/30 border-b border-border-muted">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-bold text-text-muted uppercase">Item</th>
                            <th className="px-4 py-3 text-right text-xs font-bold text-text-muted uppercase">Demand</th>
                            <th className="px-4 py-3 text-right text-xs font-bold text-text-muted uppercase">Prep</th>
                            <th className="px-4 py-3 text-right text-xs font-bold text-text-muted uppercase">Change</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-muted">
                        {adjustedPredictions.map(item => (
                            <tr key={item.id} className="hover:bg-dark-tertiary/20 transition-colors">
                                <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                                <td className="px-4 py-3 text-right text-accent-teal font-bold">{item.adjustedDemand}</td>
                                <td className="px-4 py-3 text-right text-text-muted">{item.suggestedPrep}</td>
                                <td className="px-4 py-3 text-right">
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${parseInt(item.change) > 0
                                            ? 'bg-green-500/10 text-green-400'
                                            : parseInt(item.change) < 0
                                                ? 'bg-red-500/10 text-red-400'
                                                : 'bg-gray-500/10 text-gray-400'
                                        }`}>
                                        {parseInt(item.change) > 0 ? '+' : ''}{item.change}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                    <p className="text-xs text-green-400 uppercase font-bold mb-1">Projected Revenue</p>
                    <p className="text-2xl font-black text-white">₹{totals.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
                    <p className="text-xs text-amber-400 uppercase font-bold mb-1">Est. Waste Cost</p>
                    <p className="text-2xl font-black text-white">₹{totals.totalWasteCost.toLocaleString()}</p>
                </div>
            </div>

            {/* Insight */}
            <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <p className="text-sm text-purple-300">
                    💡 <span className="font-bold">{currentScenario?.label || 'Custom'} Scenario:</span>{' '}
                    Prepare <span className="text-white font-bold">{totals.totalPrep} total units</span> to meet expected demand of{' '}
                    <span className="text-white font-bold">{totals.totalDemand} units</span>.
                </p>
            </div>
        </div>
    );
};

export default WhatIfSimulator;
