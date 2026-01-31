import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { DailyRecord } from '../types';

interface HistoryLogProps {
  history: DailyRecord[];
}

const HistoryLog: React.FC<HistoryLogProps> = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(h =>
    h.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.date.includes(searchTerm)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Historical Logs</h1>
          <p className="text-text-muted">Detailed records of preparation and actual sales.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input
              type="text"
              placeholder="Search items or dates..."
              className="w-full pl-10 pr-4 py-2 bg-dark-secondary border border-border-muted rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-smooth"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-border-muted rounded-xl bg-dark-secondary hover:bg-dark-tertiary text-text-muted transition-smooth">
            <Filter size={20} />
          </button>
          <button className="p-2 border border-border-muted rounded-xl bg-dark-secondary hover:bg-dark-tertiary text-text-muted transition-smooth">
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="bg-dark-secondary rounded-2xl border border-border-muted shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-dark-tertiary/20 border-b border-border-muted">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Item</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Prepared</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Sold</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Waste</th>
              <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Loss (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-muted">
            {filteredHistory.map((h, idx) => (
              <tr key={`${h.date}-${h.itemId}-${idx}`} className="hover:bg-dark-tertiary/10 transition-colors">
                <td className="px-6 py-4 text-sm text-text-muted">{h.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-white">{h.itemName}</td>
                <td className="px-6 py-4 text-sm text-text-muted">{h.prepared}</td>
                <td className="px-6 py-4 text-sm text-text-muted">{h.sold}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${h.waste > 5 ? 'bg-red-500/10 text-red-400' : 'bg-dark-tertiary/30 text-text-muted'
                    }`}>
                    {h.waste} units
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-white">
                  ₹{h.loss.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryLog;
