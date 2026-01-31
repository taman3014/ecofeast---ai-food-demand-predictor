import React from 'react';
import {
  TrendingUp,
  AlertTriangle,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { DailyRecord } from '../types';
import WeatherWidget from './WeatherWidget';
import CarbonTracker from './CarbonTracker';

interface DashboardProps {
  stats: {
    totalWaste: number;
    totalLoss: number;
    wastePercentage: string;
    efficiency: string;
  };
  history: DailyRecord[];
  onRunForecast: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, history, onRunForecast }) => {
  // Aggregate history for chart: Last 7 days (sorted by date)
  const chartData = React.useMemo(() => {
    const dailyMap = new Map();
    history.forEach(h => {
      const existing = dailyMap.get(h.date) || { date: h.date, prepared: 0, sold: 0, waste: 0 };
      dailyMap.set(h.date, {
        date: h.date,
        prepared: existing.prepared + h.prepared,
        sold: existing.sold + h.sold,
        waste: existing.waste + h.waste,
      });
    });
    return Array.from(dailyMap.values())
      .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7);
  }, [history]);

  // Fix: Extract waste breakdown logic to a typed useMemo to fix inference errors in JSX
  const topWasteItems = React.useMemo(() => {
    const wasteMap: Record<string, number> = {};
    history.forEach((curr) => {
      wasteMap[curr.itemName] = (wasteMap[curr.itemName] || 0) + curr.waste;
    });
    // Explicitly cast to [string, number][] to avoid "any" or "unknown" issues with Object.entries
    return (Object.entries(wasteMap) as [string, number][])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [history]);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Restaurant Overview</h1>
          <p className="text-text-muted">Real-time insight into your food preparation and waste.</p>
        </div>
        <button
          onClick={onRunForecast}
          className="bg-accent-teal hover:bg-accent-teal-hover text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-accent-teal/20 transition-all flex items-center gap-2"
        >
          <TrendingUp size={18} />
          Predict Future Demand
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Waste Percentage"
          value={String(stats.wastePercentage).includes('%') ? String(stats.wastePercentage) : `${stats.wastePercentage}%`}
          icon={<AlertTriangle className="text-amber-500" />}
          trend="-2.4%"
          trendUp={false}
        />
        <StatCard
          title="Total Financial Loss"
          value={`₹${stats.totalLoss.toLocaleString()}`}
          icon={<span className="text-red-500 font-bold">₹</span>}
          trend="+1.2%"
          trendUp={true}
        />
        <StatCard
          title="Optimization Efficiency"
          value={`${stats.efficiency}%`}
          icon={<TrendingUp className="text-accent-teal" />}
          trend="+5.7%"
          trendUp={true}
        />
        <StatCard
          title="Items Sold"
          value={history.reduce((sum, h) => sum + h.sold, 0).toLocaleString()}
          icon={<ShoppingBag className="text-blue-400" />}
          trend="+12%"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-dark-secondary p-6 rounded-2xl border border-border-muted shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6">Preparation vs Sales (Last 7 Days)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrepared" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D3748" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#95A5A6', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#95A5A6', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E1E1E', borderRadius: '12px', border: '1px solid #2D3748', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                  itemStyle={{ color: '#FFFFFF' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Area type="monotone" dataKey="prepared" stroke="#2DD4BF" fillOpacity={1} fill="url(#colorPrepared)" strokeWidth={3} />
                <Area type="monotone" dataKey="sold" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSold)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Waste Items */}
        <div className="bg-dark-secondary p-6 rounded-2xl border border-border-muted shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6">Waste Breakdown</h3>
          <div className="space-y-4">
            {topWasteItems.map(([name, waste], idx) => (
              <div key={name} className="flex items-center justify-between p-3 rounded-xl hover:bg-dark-tertiary/30 transition-colors animate-slide-in-left stagger-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-dark-tertiary flex items-center justify-center text-xs font-bold text-text-muted">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{name}</p>
                    {/* Daily average based on available history length */}
                    <p className="text-xs text-text-muted">Daily average: {Math.floor(waste / Math.max(1, history.length))} units</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-amber-500">{waste} wasted</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weather and Carbon Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <WeatherWidget />
        <div className="lg:col-span-2">
          <CarbonTracker history={history} />
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp }) => (
  <div className="bg-dark-secondary p-6 rounded-2xl border border-border-muted shadow-lg animate-scale-in transition-transform hover:-translate-y-1">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-dark-tertiary/50 rounded-lg">{icon}</div>
      <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trendUp ? 'bg-accent-teal/10 text-accent-teal' : 'bg-red-500/10 text-red-400'
        }`}>
        {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {trend}
      </div>
    </div>
    <p className="text-sm text-text-muted mb-1">{title}</p>
    <h4 className="text-2xl font-bold text-white">{value}</h4>
  </div>
);

export default Dashboard;
