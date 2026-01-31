import { DailyRecord, MenuItem, ForecastResponse } from "../types";

export const generateDemandForecast = async (
  history: DailyRecord[],
  menu: MenuItem[],
  authToken: string
): Promise<ForecastResponse> => {
  try {
    const response = await fetch('http://localhost:4000/forecast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        history,
        menu
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate forecast');
    }

    const result = await response.json();
    return result as ForecastResponse;
  } catch (error) {
    console.error("Forecast Error:", error);
    throw error;
  }
};

