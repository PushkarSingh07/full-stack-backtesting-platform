// import { create } from 'zustand';
// import { immer } from 'zustand/middleware/immer';

// interface BacktestState {
//   isLoading: boolean;
//   error: string | null;
//   strategyConfig: any;
//   backtestResults: any;
//   equityCurve: any[];
//   pnlDistribution: any[];
//   metrics: any;
  
//   runBacktest: (config: any) => Promise<void>;
//   resetBacktest: () => void;
// }

// export const useBacktestStore = create<BacktestState>()(
//   immer((set) => ({
//     isLoading: false,
//     error: null,
//     strategyConfig: null,
//     backtestResults: null,
//     equityCurve: [],
//     pnlDistribution: [],
//     metrics: {},
    
//     runBacktest: async (config) => {
//       set({ isLoading: true, error: null });
//       try {
//         const response = await backtestStrategy(config);
        
//         // Process results
//         const equityCurve = processEquityCurve(response.data.trades);
//         const pnlDistribution = processPnlDistribution(response.data.trades);
//         const metrics = calculateMetrics(response.data.trades, equityCurve);
        
//         set({
//           strategyConfig: config,
//           backtestResults: response.data,
//           equityCurve,
//           pnlDistribution,
//           metrics,
//           isLoading: false,
//         });
//       } catch (error) {
//         set({ 
//           error: error instanceof Error ? error.message : 'Unknown error occurred',
//           isLoading: false 
//         });
//       }
//     },
    
//     resetBacktest: () => {
//       set({
//         strategyConfig: null,
//         backtestResults: null,
//         equityCurve: [],
//         pnlDistribution: [],
//         metrics: {},
//       });
//     },
//   }))
// );

// // Helper functions
// function processEquityCurve(trades: any[]): any[] {
//   // Implement equity curve processing
//   return [];
// }

// function processPnlDistribution(trades: any[]): any[] {
//   // Implement PnL distribution processing
//   return [];
// }

// function calculateMetrics(trades: any[], equityCurve: any[]): any {
//   // Implement metrics calculation
//   return {};
// }

// import { AxiosError } from 'axios';
// import { create } from 'zustand';
// import { immer } from 'zustand/middleware/immer';
// import { backtestStrategy } from '../api/client';

// function isAxiosError(error: unknown): error is AxiosError {
//     return (error as AxiosError).isAxiosError !== undefined;
// }

// interface BacktestState {
//     isLoading: boolean;
//     error: string | null;
//     strategyConfig: any;
//     backtestResults: any;
//     equityCurve: any[];
//     pnlDistribution: any[];
//     metrics: any;

//     runBacktest: (config: any) => Promise<void>;
//     resetBacktest: () => void;
// }

// export const useBacktestStore = create<BacktestState>()(
//     immer((set) => ({
//         isLoading: false,
//         error: null,
//         strategyConfig: null,
//         backtestResults: null,
//         equityCurve: [],
//         pnlDistribution: [],
//         metrics: {},

//         runBacktest: async (config) => {
//             set({ isLoading: true, error: null });
//             try {
//                 console.log("Sending config:", config);
//                 const response = await backtestStrategy(config);

//                 // Process results
//                 const equityCurve = processEquityCurve(response.data.trades);
//                 const pnlDistribution = processPnlDistribution(response.data.trades);
//                 const metrics = calculateMetrics(response.data.trades, equityCurve);

//                 set({
//                     strategyConfig: config,
//                     backtestResults: response.data,
//                     equityCurve,
//                     pnlDistribution,
//                     metrics,
//                     isLoading: false,
//                 });
//             } 
//             catch (error) {
//                 if (error instanceof AxiosError) {
//                     console.error('Backtest error:', error.response?.data);
//                     set({
//                         error: error.response?.data?.detail || error.message,
//                         isLoading: false
//                     });
//                 } 
//                 // Handle generic errors
//                 else if (error instanceof Error) {
//                     set({
//                         error: error.message,
//                         isLoading: false
//                     });
//                 }
//                 // Handle unknown error types
//                 else {
//                     set({
//                         error: 'Unknown error occurred',
//                         isLoading: false
//                     });
//                 }
//                 // console.error('Full error:', error.response?.data);
//                 // set({
//                 //     error: error instanceof Error ? error.message : 'Unknown error occurred',
//                 //     isLoading: false
//                 // });
                
//             }
//         },

//         resetBacktest: () => {
//             set({
//                 strategyConfig: null,
//                 backtestResults: null,
//                 equityCurve: [],
//                 pnlDistribution: [],
//                 metrics: {},
//             });
//         },
//     }))
// );

// // Helper functions
// function processEquityCurve(trades: any[]): any[] {
//     // Implement equity curve processing
//     return [];
// }

// function processPnlDistribution(trades: any[]): any[] {
//     // Implement PnL distribution processing
//     return [];
// }

// function calculateMetrics(trades: any[], equityCurve: any[]): any {
//     // Implement metrics calculation
//     return {};
// }

import { AxiosError } from 'axios';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { backtestStrategy } from '../api/client';

// Type definitions
interface ApiErrorResponse {
  detail?: string;
  message?: string;
  [key: string]: any;
}

interface Trade {
  id: string;
  entryTime: string;
  exitTime: string;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPercent: number;
  symbol: string;
  pnlDollar: number;
  duration: string;
}

interface BacktestResult {
  trades: Trade[];
  startTime: string;
  endTime: string;
  initialBalance: number;
  finalBalance: number;
}

interface EquityPoint {
  date: string;
  value: number;
}

interface PnlBucket {
  range: string;
  count: number;
}

interface BacktestMetrics {
  pnlPercent: number;
  totalTrades: number;
  winRate: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maxDrawdown: number;
  avgTradeDuration: string;
}

interface BacktestState {
  isLoading: boolean;
  error: string | null;
  strategyConfig: any;
  backtestResults: BacktestResult | null;
  equityCurve: EquityPoint[];
  pnlDistribution: PnlBucket[];
  metrics: BacktestMetrics;

  runBacktest: (config: any) => Promise<void>;
  resetBacktest: () => void;
}

// Type guard for Axios errors
function isAxiosError(error: unknown): error is AxiosError<ApiErrorResponse> {
  return (error as AxiosError).isAxiosError !== undefined;
}

export const useBacktestStore = create<BacktestState>()(
  immer((set) => ({
    isLoading: false,
    error: null,
    strategyConfig: null,
    backtestResults: null,
    equityCurve: [],
    pnlDistribution: [],
    metrics: {
      pnlPercent: 0,
      totalTrades: 0,
      winRate: 0,
      sharpeRatio: 0,
      sortinoRatio: 0,
      maxDrawdown: 0,
      avgTradeDuration: '00:00:00'
    },

    // runBacktest: async (config) => {
    //   set({ isLoading: true, error: null });
      
    //   try {
    //     const response = await backtestStrategy(config);
    //     const { trades, startTime, endTime, initialBalance, finalBalance } = response.data;

    //     const equityCurve = processEquityCurve(trades, initialBalance);
    //     const pnlDistribution = processPnlDistribution(trades);
    //     const metrics = calculateMetrics(trades, equityCurve);

    //     set({
    //       strategyConfig: config,
    //       backtestResults: {
    //         trades,
    //         startTime,
    //         endTime,
    //         initialBalance,
    //         finalBalance
    //       },
    //       equityCurve,
    //       pnlDistribution,
    //       metrics,
    //       isLoading: false,
    //     });

    //   } catch (error) {
    //     let errorMessage = 'Unknown error occurred';
        
    //     if (isAxiosError(error)) {
    //       errorMessage = error.response?.data?.detail || 
    //                    error.response?.data?.message || 
    //                    error.message;
    //       console.error('API Error:', error.response?.data);
    //     } else if (error instanceof Error) {
    //       errorMessage = error.message;
    //     }

    //     set({
    //       error: errorMessage,
    //       isLoading: false
    //     });
    //   }
    // },
    runBacktest: async (config) => {
  set({ isLoading: true, error: null });

  try {
    const response = await backtestStrategy(config);
    const { trades, startTime, endTime, initialBalance, finalBalance, metrics } = response.data;

    // const { trades, startTime, endTime, initialBalance, finalBalance } = response.data;

    // ✅ Step 3: transform trades to add pnlDollar and duration
    // const transformedTrades = trades.map(trade => {
    const transformedTrades = trades.map((trade: Trade) => {

      const durationMs = new Date(trade.exitTime).getTime() - new Date(trade.entryTime).getTime();
      return {
        ...trade,
        pnlDollar: trade.pnl,
        duration: formatDuration(durationMs),
      };
    });

    const equityCurve = processEquityCurve(transformedTrades, initialBalance);
    const pnlDistribution = processPnlDistribution(transformedTrades);
    // const metrics = calculateMetrics(transformedTrades, equityCurve);
    const computedMetrics = metrics || calculateMetrics(transformedTrades, equityCurve);


    set({
      strategyConfig: config,
      backtestResults: {
        trades: transformedTrades,
        startTime,
        endTime,
        initialBalance,
        finalBalance
      },
      equityCurve,
      pnlDistribution,
      // metrics,
      metrics: computedMetrics,
      isLoading: false,
    });

  } catch (error) {
    let errorMessage = 'Unknown error occurred';

    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message;
      console.error('API Error:', error.response?.data);
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    set({
      error: errorMessage,
      isLoading: false
    });
  }
},


    resetBacktest: () => {
      set({
        strategyConfig: null,
        backtestResults: null,
        equityCurve: [],
        pnlDistribution: [],
        metrics: {
          pnlPercent: 0,
          totalTrades: 0,
          winRate: 0,
          sharpeRatio: 0,
          sortinoRatio: 0,
          maxDrawdown: 0,
          avgTradeDuration: '00:00:00'
        },
      });
    },
  }))
);

// Helper functions with proper typing
function processEquityCurve(trades: Trade[], initialBalance: number): EquityPoint[] {
  if (!trades.length) return [];
  
  let runningBalance = initialBalance;
  return trades.map(trade => {
    runningBalance += trade.pnl;
    return {
      date: trade.exitTime,
      value: runningBalance
    };
  });
}

function processPnlDistribution(trades: Trade[]): PnlBucket[] {
  // Simplified example - implement your actual distribution logic
  const positive = trades.filter(t => t.pnl >= 0).length;
  const negative = trades.length - positive;
  
  return [
    { range: 'Positive', count: positive },
    { range: 'Negative', count: negative }
  ];
}

function calculateMetrics(trades: Trade[], equityCurve: EquityPoint[]): BacktestMetrics {
  if (!trades.length) {
    return {
      pnlPercent: 0,
      totalTrades: 0,
      winRate: 0,
      sharpeRatio: 0,
      sortinoRatio: 0,
      maxDrawdown: 0,
      avgTradeDuration: '00:00:00'
    };
  }

  // Simplified calculations - replace with your actual metrics
  const totalPnl = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const winningTrades = trades.filter(trade => trade.pnl >= 0).length;
  const durations = trades.map(trade => 
    new Date(trade.exitTime).getTime() - new Date(trade.entryTime).getTime()
  );
  const avgDurationMs = durations.reduce((sum, d) => sum + d, 0) / durations.length;

  return {
    pnlPercent: (totalPnl / equityCurve[0]?.value) * 100 || 0,
    totalTrades: trades.length,
    winRate: (winningTrades / trades.length) * 100,
    sharpeRatio: 1.2, // Replace with actual calculation
    sortinoRatio: 1.1, // Replace with actual calculation
    maxDrawdown: calculateMaxDrawdown(equityCurve),
    avgTradeDuration: formatDuration(avgDurationMs)
  };
}

// Additional utility functions
function calculateMaxDrawdown(equityCurve: EquityPoint[]): number {
  if (!equityCurve.length) return 0;
  
  let peak = equityCurve[0].value;
  let maxDrawdown = 0;
  
  for (const point of equityCurve) {
    if (point.value > peak) peak = point.value;
    const drawdown = ((peak - point.value) / peak) * 100;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;
  }
  
  return maxDrawdown;
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return [hours, minutes, secs]
    .map(v => v.toString().padStart(2, '0'))
    .join(':');
}