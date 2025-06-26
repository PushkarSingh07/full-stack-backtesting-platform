import { Box, Typography } from '@mui/material';
import React from 'react';
import { useBacktestStore } from '../store/backtestStore';
import PerformanceDashboard from './PerformanceDashboard';



const ResultsPage: React.FC = () => {
//   const {
//     backtestResults,
//     equityCurve,
//     pnlDistribution,
//     metrics,
//   } = useBacktestStore();
const backtestResults = useBacktestStore((state) => state.backtestResults);
const equityCurve = useBacktestStore((state) => state.equityCurve);
const pnlDistribution = useBacktestStore((state) => state.pnlDistribution);
const metrics = useBacktestStore((state) => state.metrics);
console.log("Backtest Results:", backtestResults);




  if (!backtestResults || backtestResults.trades.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">No results available. Please run a strategy first.</Typography>
      </Box>
    );
  }

  return (
    <PerformanceDashboard
      metrics={{
        ...metrics,
        pnlDollar: backtestResults.finalBalance - backtestResults.initialBalance,
        maxDrawdownPercent: metrics.maxDrawdown, // match prop name
      }}
      trades={backtestResults.trades}
      equityCurve={equityCurve}
      pnlDistribution={pnlDistribution}
    />
  );
};

export default ResultsPage;
