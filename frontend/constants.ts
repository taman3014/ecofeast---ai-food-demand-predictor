import { MenuItem, DailyRecord } from './types';

export const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Signature Burger', category: 'Main', unitPrice: 15, costPerUnit: 6 },
  { id: '2', name: 'Quinoa Salad', category: 'Appetizer', unitPrice: 12, costPerUnit: 4 },
  { id: '3', name: 'Truffle Pasta', category: 'Main', unitPrice: 22, costPerUnit: 9 },
  { id: '4', name: 'Grilled Salmon', category: 'Main', unitPrice: 25, costPerUnit: 12 },
  { id: '5', name: 'Avocado Toast', category: 'Breakfast', unitPrice: 14, costPerUnit: 5 },
];

// Generate some realistic historical data for the last 14 days
const generateHistory = (): DailyRecord[] => {
  const history: DailyRecord[] = [];
  const now = new Date();
  
  for (let i = 14; i >= 1; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    MENU_ITEMS.forEach(item => {
      // Variance based on day of week (weekends +20%)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const baseDemand = 20 + Math.floor(Math.random() * 30);
      const multiplier = isWeekend ? 1.4 : 1.0;
      
      const sold = Math.floor(baseDemand * multiplier);
      // Simulate over-preparation (random 5-20% extra)
      const prepared = Math.floor(sold * (1.05 + Math.random() * 0.15));
      const waste = prepared - sold;
      
      history.push({
        date: dateStr,
        itemId: item.id,
        itemName: item.name,
        prepared,
        sold,
        waste,
        revenue: sold * item.unitPrice,
        loss: waste * item.costPerUnit
      });
    });
  }
  return history;
};

export const INITIAL_HISTORY = generateHistory();
