export interface MenuItem {
  id: string;
  name: string;
  category: string;
  unitPrice: number;
  costPerUnit: number;
}

export interface DailyRecord {
  date: string;
  itemId: string;
  itemName: string;
  prepared: number;
  sold: number;
  waste: number;
  revenue: number;
  loss: number;
}

export interface Prediction {
  itemId: string;
  itemName: string;
  predictedDemand: number;
  confidence: number;
  reasoning: string;
}

export interface ForecastResponse {
  predictions: Prediction[];
  overallInsight: string;
  savingsOpportunity: number;
}

export interface AnalyticsSummary {
  totalWasteWeight: number;
  totalFinancialLoss: number;
  totalSavingsPotential: number;
  efficiencyScore: number;
}
