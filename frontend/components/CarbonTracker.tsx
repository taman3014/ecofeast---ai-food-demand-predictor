import React from 'react';
import { Leaf, TreeDeciduous, Car, Factory, TrendingDown, Recycle } from 'lucide-react';
import { DailyRecord } from '../types';

interface CarbonTrackerProps {
    history: DailyRecord[];
}

const CarbonTracker: React.FC<CarbonTrackerProps> = ({ history }) => {
    // Calculate environmental impact metrics
    // Average food waste produces ~2.5 kg CO2 per kg of food
    // Average meal weight is ~0.4 kg

    const totalWasteUnits = history.reduce((sum, h) => sum + h.waste, 0);
    const totalPrepared = history.reduce((sum, h) => sum + h.prepared, 0);
    const wasteReductionPotential = totalWasteUnits * 0.4; // kg of food waste

    // Using EcoFeast predictions, assume we help reduce waste by 35%
    const actualFoodSaved = wasteReductionPotential * 0.35; // kg saved
    const co2Prevented = actualFoodSaved * 2.5; // kg CO2
    const carKmEquivalent = co2Prevented * 4; // ~0.25 kg CO2 per km
    const treesEquivalent = co2Prevented / 21; // A tree absorbs ~21 kg CO2/year
    const waterSaved = actualFoodSaved * 100; // ~100L water per kg food

    const metrics = [
        {
            icon: <Leaf size={24} />,
            value: actualFoodSaved.toFixed(1),
            unit: 'kg',
            label: 'Food Saved',
            color: 'text-green-400',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20'
        },
        {
            icon: <Factory size={24} />,
            value: co2Prevented.toFixed(1),
            unit: 'kg',
            label: 'CO₂ Prevented',
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20'
        },
        {
            icon: <Car size={24} />,
            value: carKmEquivalent.toFixed(0),
            unit: 'km',
            label: 'Car Emissions Offset',
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20'
        },
        {
            icon: <TreeDeciduous size={24} />,
            value: treesEquivalent.toFixed(1),
            unit: 'trees',
            label: 'Annual Tree Equivalent',
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/20'
        }
    ];

    const efficiencyScore = totalPrepared > 0
        ? ((totalPrepared - totalWasteUnits) / totalPrepared * 100).toFixed(1)
        : 0;

    return (
        <div className="bg-dark-secondary p-6 rounded-2xl border border-border-muted shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-xl">
                        <Recycle size={20} className="text-green-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Carbon Footprint Impact</h3>
                        <p className="text-text-muted text-sm">Your sustainability contribution</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-text-muted uppercase tracking-wider">Efficiency Score</p>
                    <p className="text-2xl font-black text-accent-teal">{efficiencyScore}%</p>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {metrics.map((metric, idx) => (
                    <div
                        key={idx}
                        className={`${metric.bgColor} ${metric.borderColor} border p-4 rounded-xl text-center transition-transform hover:scale-105`}
                    >
                        <div className={`${metric.color} mb-2 flex justify-center`}>
                            {metric.icon}
                        </div>
                        <p className="text-2xl font-black text-white">
                            {metric.value}
                            <span className="text-sm font-normal text-text-muted ml-1">{metric.unit}</span>
                        </p>
                        <p className="text-xs text-text-muted mt-1">{metric.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg flex-shrink-0">
                        <TrendingDown size={16} className="text-green-400" />
                    </div>
                    <div>
                        <p className="text-sm text-green-400 font-semibold mb-1">
                            🌍 Environmental Impact Summary
                        </p>
                        <p className="text-xs text-text-muted leading-relaxed">
                            By using EcoFeast's AI predictions, your restaurant has potentially saved <span className="text-white font-medium">{actualFoodSaved.toFixed(1)} kg</span> of food waste,
                            equivalent to preventing <span className="text-white font-medium">{co2Prevented.toFixed(1)} kg</span> of CO₂ emissions.
                            That's like planting <span className="text-white font-medium">{treesEquivalent.toFixed(1)} trees</span> or taking a car off the road for <span className="text-white font-medium">{carKmEquivalent.toFixed(0)} km</span>!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarbonTracker;
