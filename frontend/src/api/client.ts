// import axios from 'axios';
import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  // baseURL: 'http://localhost:8000/api',
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loadData = async (file: File, symbol: string, exchange: string, marketType: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('symbol', symbol);
  formData.append('exchange', exchange);
  formData.append('market_type', marketType);
  
  return apiClient.post('/data/load', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getOHLCV = async (
  symbol: string,
  exchange: string,
  startDate?: string,
  endDate?: string,
  marketType?: string,
  limit?: number
) => {
  return apiClient.get('/data/ohlcv', {
    params: {
      symbol,
      exchange,
      start_date: startDate,
      end_date: endDate,
      market_type: marketType,
      limit,
    },
  });
};

// export const backtestStrategy = async (strategyConfig: any) => {
//   return apiClient.post('/strategies/backtest', strategyConfig);
// };
export const backtestStrategy = async (config: any) => {
    try {
        const response = await apiClient.post('/api/strategies/backtest', config);
        // return response.data;
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            // Extract server error message if available
            const serverMessage = error.response?.data?.detail;
            throw new Error(serverMessage || error.message);
        }
        throw error;
    }
};

export default apiClient;