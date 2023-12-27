'use server'
import axios, { AxiosResponse } from "axios";
export interface ChartResponse {
    chart: {
      result: {
        meta: {
          regularMarketPrice: number;
          chartPreviousClose: number;
        };
        // ... other properties
      }[];
      // ... other properties
    };
}
  
export const fetchSnP = async (): Promise<{ regularMarketPrice: number; chartPreviousClose: number; change_percentage:string}> => {
    try {
        const response:AxiosResponse<ChartResponse> = await axios.get('https://query2.finance.yahoo.com/v8/finance/chart/%5EGSPC');
        const result = response.data.chart.result[0];

        if (result) {
            const { regularMarketPrice, chartPreviousClose } = result.meta;
            let percentage = ((regularMarketPrice - chartPreviousClose) / 100);
            let change_percentage:string = '';
            if(percentage > 0 ){
              change_percentage='+'+percentage.toPrecision(2);
            }
            else{
              change_percentage='-'+percentage.toPrecision(2);
            }
            
            return { regularMarketPrice, chartPreviousClose,change_percentage };
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
      throw new Error(`Unable to fetch S&P.\n
      Error : ${error}`);
    }
};

export interface SensexData {
    current_value: string;
    change_point: string;
    change_percentage: string;
    date: string;
    time: string;
    status: string;
}
  
let cachedData: SensexData | null = null;
let lastFetchTime: Date | null = null;

const fetchNewData = async () => {
  try {
    const response = await axios.get<SensexData>('https://sensex-data-demo-d628bdd08c5e.herokuapp.com/sensex-value');
    cachedData = response?.data;
    lastFetchTime = new Date();
  } catch (error) {
    throw new Error(`Unable to fetch SensexData.\n
    Error : ${error}`);
  }
};

export const fetchSensexData = async (): Promise<SensexData> => {
  const marketOpenTime = new Date();
  marketOpenTime.setHours(9, 15, 0); // Indian market opens at 9:15 AM

  const marketCloseTime = new Date();
  marketCloseTime.setHours(15, 30, 0); // Indian market closes at 3:30 PM

  const now = new Date();

  if (cachedData === null || 
      (now >= marketOpenTime && now <= marketCloseTime) || 
      (lastFetchTime !== null && (now.getTime() - lastFetchTime.getTime()) > 1000 * 60 * 60 * 24)) {
    // Fetch new data if no data is cached, or if the market is open, or if the cached data is more than 24 hours old
    await fetchNewData();
  }

  if (cachedData === null) {
    throw new Error('Unable to fetch Sensex data');
  }

  return cachedData;
};


