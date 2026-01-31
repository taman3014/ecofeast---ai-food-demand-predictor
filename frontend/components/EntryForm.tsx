import React, { useState } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { MenuItem, DailyRecord } from '../types';
import { MENU_ITEMS } from '../constants';

interface EntryFormProps {
  onClose: () => void;
  onSubmit: (record: DailyRecord) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onClose, onSubmit }) => {
  const [selectedItem, setSelectedItem] = useState(MENU_ITEMS[0]);
  const [prepared, setPrepared] = useState(50);
  const [sold, setSold] = useState(45);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waste = Math.max(0, prepared - sold);
    const record: DailyRecord = {
      date,
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      prepared,
      sold,
      waste,
      revenue: sold * selectedItem.unitPrice,
      loss: waste * selectedItem.costPerUnit
    };
    onSubmit(record);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-dark-primary/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-dark-secondary rounded-2xl w-full max-w-md shadow-2xl border border-border-muted animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-border-muted flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Log Daily Performance</h3>
          <button onClick={onClose} className="text-text-muted hover:text-white transition-smooth"><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Date</label>
            <input
              type="date"
              required
              className="w-full p-2.5 bg-dark-primary border border-border-muted rounded-xl text-white focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal outline-none transition-smooth"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Menu Item</label>
            <select
              className="w-full p-2.5 bg-dark-primary border border-border-muted rounded-xl text-white focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal outline-none transition-smooth"
              value={selectedItem.id}
              onChange={(e) => {
                const item = MENU_ITEMS.find(m => m.id === e.target.value);
                if (item) setSelectedItem(item);
              }}
            >
              {MENU_ITEMS.map(item => (
                <option key={item.id} value={item.id} className="bg-dark-secondary">{item.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Units Prepared</label>
              <input
                type="number"
                min="0"
                required
                className="w-full p-2.5 bg-dark-primary border border-border-muted rounded-xl text-white focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal outline-none transition-smooth"
                value={prepared}
                onChange={(e) => setPrepared(parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Units Sold</label>
              <input
                type="number"
                min="0"
                required
                className="w-full p-2.5 bg-dark-primary border border-border-muted rounded-xl text-white focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal outline-none transition-smooth"
                value={sold}
                onChange={(e) => setSold(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="bg-dark-primary/50 p-4 rounded-xl mt-4 border border-border-muted">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-muted">Waste:</span>
              <span className="font-bold text-red-400">{Math.max(0, prepared - sold)} units</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Financial Loss:</span>
              <span className="font-bold text-red-400">₹{(Math.max(0, prepared - sold) * selectedItem.costPerUnit).toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-accent-teal hover:bg-accent-teal-hover text-white font-bold py-3 rounded-xl shadow-lg shadow-accent-teal/20 transition-all flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
          >
            <Save size={20} />
            Submit Daily Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default EntryForm;
