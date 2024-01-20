'use server'
import axios, { AxiosResponse } from "axios";
import moment from 'moment-timezone';

export interface ChartResponse {
    chart: {
      result: {
        meta: {
          regularMarketPrice: number;
          chartPreviousClose: number;
        };
        // ... other properties (not needed so didn't implemented)
      }[];
      // ... other properties
    };
}
// for S&P500  
export const fetchSnP = async (): Promise<{ regularMarketPrice: number; chartPreviousClose: number; change_percentage:string}> => {
    try {
        const response:AxiosResponse<ChartResponse> = await axios.get('https://query2.finance.yahoo.com/v8/finance/chart/%5EGSPC');
        const result = response.data.chart.result[0];

        if (result) {
            const { regularMarketPrice, chartPreviousClose } = result.meta;
            let percentage = ((regularMarketPrice - chartPreviousClose) / 100).toPrecision(2);
            let change_percentage:string = '';
            if(Number(percentage) > 0 ){
              change_percentage='+'+percentage;
            }
            else{
              change_percentage=percentage;
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
let lastFetchTime: moment.Moment | null = null;

const fetchNewData = async () => {
  try {
      const url = process.env.INDIAN_STOCK_MARKET_URL;
      if(url){
          const response = await axios.get(url);
          const data = response?.data["Sensex Value"];
          cachedData = {
              current_value: data["current_value"],
              change_point: data["change_point"],
              change_percentage: data["change_percentage"],
              date: data["date"],
              time: data["time"],
              status: data["status"]
          };
          lastFetchTime = moment.tz('Asia/Kolkata');
      }
  } catch (error) {
      throw new Error(`Unable to fetch SensexData.\nError : ${error}`);
  }
};

export const fetchSensexData = async (): Promise<SensexData> => {
  const now = moment.tz('Asia/Kolkata');

  const marketOpenTime = now.clone().hour(9).minute(15).second(0); // Indian market opens at 9:15 AM
  const marketCloseTime = now.clone().hour(15).minute(30).second(0); // Indian market closes at 3:30 PM

  if (cachedData === null || 
      (now.isBetween(marketOpenTime, marketCloseTime)) || 
      (lastFetchTime !== null && now.diff(lastFetchTime, 'hours') > 24)) {
      // Fetch new data if no data is cached, or if the market is open, or if the cached data is more than 24 hours old
      await fetchNewData();
  }

  if (cachedData === null) {
      throw new Error('Unable to fetch Sensex data');
  }
  return cachedData;
};