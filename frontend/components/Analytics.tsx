import React from 'react';
import {
  Leaf
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { DailyRecord } from '../types';

interface AnalyticsProps {
  history: DailyRecord[];
}

const Analytics: React.FC<AnalyticsProps> = ({ history }) => {
  // Data for Category breakdown
  const categoryData = React.useMemo(() => {
    // Note: Mocking category mapping since DailyRecord doesn't have it directly
    const categories: Record<string, number> = {
      'Main': 0,
      'Appetizer': 0,
      'Breakfast': 0
    };

    history.forEach(h => {
      if (h.itemName.includes('Burger') || h.itemName.includes('Pasta') || h.itemName.includes('Salmon')) categories['Main'] += h.waste;
      else if (h.itemName.includes('Salad')) categories['Appetizer'] += h.waste;
      else if (h.itemName.includes('Toast')) categories['Breakfast'] += h.waste;
    });

    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [history]);

  // Data for day of week analysis
  const dayOfWeekData = React.useMemo(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const data = days.map(d => ({ name: d, waste: 0, efficiency: 0, total: 0 }));

    history.forEach(h => {
      const dayIdx = new Date(h.date).getDay();
      data[dayIdx].waste += h.waste;
      data[dayIdx].total += h.prepared;
    });

    return data.map(d => ({
      ...d,
      efficiency: d.total > 0 ? Number((((d.total - d.waste) / d.total) * 100).toFixed(1)) : 0
    }));
  }, [history]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Deep Analytics</h1>
          <p className="text-text-muted">Discover underlying patterns in your food waste behavior.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Day of Week Efficiency */}
        <div className="bg-dark-secondary p-6 rounded-2xl border border-border-muted shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6">Efficiency by Day of Week</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dayOfWeekData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D3748" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#95A5A6', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#95A5A6', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: '#2C3E50', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#1E1E1E', borderRadius: '12px', border: '1px solid #2D3748', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                  itemStyle={{ color: '#FFFFFF' }}
                />
                <Bar dataKey="efficiency" fill="#2DD4BF" radius={[4, 4, 0, 0]} name="Efficiency %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-text-muted text-center italic">
            Weekend demand spikes are often over-compensated, leading to lower efficiency scores.
          </p>
        </div>

        {/* Category Waste Breakdown */}
        <div className="bg-dark-secondary p-6 rounded-2xl border border-border-muted shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6">Waste Distribution by Category</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DARK_COLORS[index % DARK_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E1E1E', borderRadius: '12px', border: '1px solid #2D3748', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                  itemStyle={{ color: '#FFFFFF' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-text-muted text-center italic">
            Main dishes contribute to 65% of total food financial loss.
          </p>
        </div>
      </div>

      {/* Sustainable Impact section */}
      <div className="bg-dark-tertiary text-white p-8 rounded-3xl shadow-xl border border-border-muted relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 transition-transform group-hover:scale-110 duration-500">
          <Leaf size={160} />
        </div>
        <div className="max-w-3xl relative z-10">
          <h2 className="text-2xl font-bold mb-6">Sustainability Performance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-text-muted text-sm mb-1 uppercase tracking-wider font-semibold">CO2 Prevented</p>
              <p className="text-3xl font-bold text-accent-teal">124.5 kg</p>
              <p className="text-xs text-text-muted mt-1">Equivalent to 450km driven</p>
            </div>
            <div>
              <p className="text-text-muted text-sm mb-1 uppercase tracking-wider font-semibold">Water Saved</p>
              <p className="text-3xl font-bold text-blue-400">12,400 L</p>
              <p className="text-xs text-text-muted mt-1">Estimated kitchen overhead reduction</p>
            </div>
            <div>
              <p className="text-text-muted text-sm mb-1 uppercase tracking-wider font-semibold">Food Donated</p>
              <p className="text-3xl font-bold text-amber-500">85 Meals</p>
              <p className="text-xs text-text-muted mt-1">Via local shelter partnership</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DARK_COLORS = ['#2DD4BF', '#3b82f6', '#f59e0b', '#ef4444'];

export default Analytics;
