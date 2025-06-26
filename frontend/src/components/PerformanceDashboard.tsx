// import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
// import React from 'react';
// import {
//     Bar,
//     BarChart,
//     CartesianGrid,
//     Legend,
//     Line,
//     LineChart,
//     ResponsiveContainer,
//     Tooltip,
//     XAxis,
//     YAxis
// } from 'recharts';

// interface PerformanceMetrics {
//   pnlPercent: number;
//   pnlDollar: number;
//   sharpeRatio: number;
//   sortinoRatio: number;
//   maxDrawdownPercent: number;
//   winRate: number;
//   totalTrades: number;
//   avgTradeDuration: string;
// }

// interface Trade {
//   entryTime: string;
//   exitTime: string;
//   entryPrice: number;
//   exitPrice: number;
//   pnlPercent: number;
//   pnlDollar: number;
//   duration: string;
// }

// interface PerformanceDashboardProps {
//   metrics: PerformanceMetrics;
//   trades: Trade[];
//   equityCurve: { date: string; value: number }[];
//   pnlDistribution: { range: string; count: number }[];
// }

// const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ 
//   metrics, 
//   trades, 
//   equityCurve, 
//   pnlDistribution 
// }) => {
//   return (
//     <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
//       <Typography variant="h5" gutterBottom>Performance Dashboard</Typography>
      
//       <Grid container spacing={3}>
//         {/* Key Metrics */}
//         <Grid item xs={12}>
//           <Typography variant="h6">Key Metrics</Typography>
//           <Divider sx={{ my: 2 }} />
          
//           <Grid container spacing={2}>
//             <Grid item xs={6} md={3}>
//               <Paper sx={{ p: 2, textAlign: 'center' }}>
//                 <Typography variant="subtitle2">Total PnL (%)</Typography>
//                 <Typography variant="h4" color={metrics.pnlPercent >= 0 ? 'success.main' : 'error.main'}>
//                   {metrics.pnlPercent.toFixed(2)}%
//                 </Typography>
//               </Paper>
//             </Grid>
            
//             <Grid item xs={6} md={3}>
//               <Paper sx={{ p: 2, textAlign: 'center' }}>
//                 <Typography variant="subtitle2">Total PnL ($)</Typography>
//                 <Typography variant="h4" color={metrics.pnlDollar >= 0 ? 'success.main' : 'error.main'}>
//                   ${metrics.pnlDollar.toFixed(2)}
//                 </Typography>
//               </Paper>
//             </Grid>
            
//             <Grid item xs={6} md={3}>
//               <Paper sx={{ p: 2, textAlign: 'center' }}>
//                 <Typography variant="subtitle2">Sharpe Ratio</Typography>
//                 <Typography variant="h4">
//                   {metrics.sharpeRatio.toFixed(2)}
//                 </Typography>
//               </Paper>
//             </Grid>
            
//             <Grid item xs={6} md={3}>
//               <Paper sx={{ p: 2, textAlign: 'center' }}>
//                 <Typography variant="subtitle2">Max Drawdown</Typography>
//                 <Typography variant="h4" color="error.main">
//                   {metrics.maxDrawdownPercent.toFixed(2)}%
//                 </Typography>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Grid>
        
//         {/* Equity Curve */}
//         <Grid item xs={12} md={8}>
//           <Typography variant="h6">Equity Curve</Typography>
//           <Divider sx={{ my: 2 }} />
          
//           <Box sx={{ height: 400 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={equityCurve}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line 
//                   type="monotone" 
//                   dataKey="value" 
//                   name="Portfolio Value" 
//                   stroke="#8884d8" 
//                   dot={false} 
//                   strokeWidth={2} 
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </Box>
//         </Grid>
        
//         {/* Trade Statistics */}
//         <Grid item xs={12} md={4}>
//           <Typography variant="h6">Trade Statistics</Typography>
//           <Divider sx={{ my: 2 }} />
          
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Paper sx={{ p: 2, textAlign: 'center' }}>
//                 <Typography variant="subtitle2">Win Rate</Typography>
//                 <Typography variant="h4">
//                   {metrics.winRate.toFixed(1)}%
//                 </Typography>
//               </Paper>
//             </Grid>
            
//             <Grid item xs={6}>
//               <Paper sx={{ p: 2, textAlign: 'center' }}>
//                 <Typography variant="subtitle2">Total Trades</Typography>
//                 <Typography variant="h4">
//                   {metrics.totalTrades}
//                 </Typography>
//               </Paper>
//             </Grid>
            
//             <Grid item xs={12}>
//               <Paper sx={{ p: 2, textAlign: 'center' }}>
//                 <Typography variant="subtitle2">Avg Trade Duration</Typography>
//                 <Typography variant="h4">
//                   {metrics.avgTradeDuration}
//                 </Typography>
//               </Paper>
//             </Grid>
//           </Grid>
          
//           <Box sx={{ mt: 3, height: 300 }}>
//             <Typography variant="subtitle2" gutterBottom>PnL Distribution</Typography>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={pnlDistribution}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="range" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="count" name="Number of Trades" fill="#82ca9d" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Box>
//         </Grid>
        
//         {/* Recent Trades */}
//         <Grid item xs={12}>
//           <Typography variant="h6">Recent Trades</Typography>
//           <Divider sx={{ my: 2 }} />
          
//           <Box sx={{ overflowX: 'auto' }}>
//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <thead>
//                 <tr style={{ backgroundColor: '#f5f5f5' }}>
//                   <th style={{ padding: '8px', textAlign: 'left' }}>Entry Time</th>
//                   <th style={{ padding: '8px', textAlign: 'left' }}>Exit Time</th>
//                   <th style={{ padding: '8px', textAlign: 'right' }}>Entry Price</th>
//                   <th style={{ padding: '8px', textAlign: 'right' }}>Exit Price</th>
//                   <th style={{ padding: '8px', textAlign: 'right' }}>PnL (%)</th>
//                   <th style={{ padding: '8px', textAlign: 'right' }}>PnL ($)</th>
//                   <th style={{ padding: '8px', textAlign: 'left' }}>Duration</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {trades.slice(0, 10).map((trade, index) => (
//                   <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
//                     <td style={{ padding: '8px' }}>{trade.entryTime}</td>
//                     <td style={{ padding: '8px' }}>{trade.exitTime}</td>
//                     <td style={{ padding: '8px', textAlign: 'right' }}>${trade.entryPrice.toFixed(2)}</td>
//                     <td style={{ padding: '8px', textAlign: 'right' }}>${trade.exitPrice.toFixed(2)}</td>
//                     <td style={{ 
//                       padding: '8px', 
//                       textAlign: 'right',
//                       color: trade.pnlPercent >= 0 ? 'green' : 'red'
//                     }}>
//                       {trade.pnlPercent.toFixed(2)}%
//                     </td>
//                     <td style={{ 
//                       padding: '8px', 
//                       textAlign: 'right',
//                       color: trade.pnlDollar >= 0 ? 'green' : 'red'
//                     }}>
//                       ${trade.pnlDollar.toFixed(2)}
//                     </td>
//                     <td style={{ padding: '8px' }}>{trade.duration}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// export default PerformanceDashboard;
// import {
//     Box,
//     Divider,
//     Grid,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
//     useTheme,
// } from '@mui/material';
// import React from 'react';
// // import Grid from '@mui/material/Grid';
// // import { Grid } from '@mui/material';
// // import Grid from '@mui/material/Unstable_Grid2';
// import {
//     Bar,
//     BarChart,
//     CartesianGrid,
//     Cell,
//     Legend,
//     Line,
//     LineChart,
//     ResponsiveContainer,
//     Tooltip,
//     XAxis,
//     YAxis
// } from 'recharts';

// interface PerformanceMetrics {
//    pnlPercent: number;
//    pnlDollar: number;
//    sharpeRatio: number;
//    sortinoRatio: number;
//    maxDrawdownPercent: number;
//    winRate: number;
//    totalTrades: number;
//    avgTradeDuration: string;
// }

// interface Trade {
//    entryTime: string;
//    exitTime: string;
//    entryPrice: number;
//    exitPrice: number;
//    pnlPercent: number;
//    pnlDollar: number;
//    duration: string;
//    symbol?: string;
//    strategy?: string;
// }

// interface MonthlyPerformance {
//    month: string;
//    pnl: number;
// }

// interface PnlDistribution {
//    range: string;
//    count: number;
// }

// interface PerformanceDashboardProps {
//    metrics: PerformanceMetrics;
//    trades: Trade[];
//    equityCurve: { date: string; value: number }[];
//    pnlDistribution: PnlDistribution[];
//    monthlyPerformance?: MonthlyPerformance[];
// }

// const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
//    metrics,
//    trades,
//    equityCurve,
//    pnlDistribution,
//    monthlyPerformance = []
// }) => {
//    const theme = useTheme();

//    // Prepare data for win/loss pie chart
//    const winLossData = [
//        { name: 'Winning Trades', value: metrics.winRate, color: theme.palette.success.main },
//        { name: 'Losing Trades', value: 100 - metrics.winRate, color: theme.palette.error.main }
//    ];

//    return (
//        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
//            <Typography variant="h5" gutterBottom>
//                Performance Dashboard
//            </Typography>

//            <Grid container spacing={3}>
//                {/* Key Metrics */}
//                <Grid item component="div" xs={12}>
//                    <Typography variant="h6">Key Metrics</Typography>
//                    <Divider sx={{ my: 2 }} />

//                    <Grid container spacing={2}>
//                        <Grid item xs={6} md={3}>
//                            <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                <Typography variant="subtitle2">Total PnL (%)</Typography>
//                                <Typography
//                                    variant="h4"
//                                    color={
//                                        metrics.pnlPercent >= 0 ? 'success.main' : 'error.main'
//                                    }
//                                >
//                                    {metrics.pnlPercent.toFixed(2)}%
//                                </Typography>
//                            </Paper>
//                        </Grid>
//                        <Grid item xs={6} md={3}>
//                            <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                <Typography variant="subtitle2">Total PnL ($)</Typography>
//                                <Typography
//                                    variant="h4"
//                                    color={
//                                        metrics.pnlDollar >= 0 ? 'success.main' : 'error.main'
//                                    }
//                                >
//                                    ${metrics.pnlDollar.toLocaleString(undefined, {
//                                        minimumFractionDigits: 2,
//                                        maximumFractionDigits: 2
//                                    })}
//                                </Typography>
//                            </Paper>
//                        </Grid>
//                        <Grid item xs={6} md={3}>
//                            <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                <Typography variant="subtitle2">Sharpe Ratio</Typography>
//                                <Typography variant="h4">
//                                    {metrics.sharpeRatio.toFixed(2)}
//                                </Typography>
//                            </Paper>
//                        </Grid>
//                        <Grid item xs={6} md={3}>
//                            <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                <Typography variant="subtitle2">Sortino Ratio</Typography>
//                                <Typography variant="h4">
//                                    {metrics.sortinoRatio.toFixed(2)}
//                                </Typography>
//                            </Paper>
//                        </Grid>
//                    </Grid>
//                </Grid>

//                {/* Equity Curve */}
//                <Grid item xs={12} md={8}>
//                    <Typography variant="h6">Equity Curve</Typography>
//                    <Divider sx={{ my: 2 }} />
//                    <Box sx={{ height: 400 }}>
//                        <ResponsiveContainer width="100%" height="100%">
//                            <LineChart data={equityCurve}>
//                                <CartesianGrid strokeDasharray="3 3" />
//                                <XAxis dataKey="date" />
//                                <YAxis />
//                                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']} />
//                                <Legend />
//                                <Line
//                                    type="monotone"
//                                    dataKey="value"
//                                    name="Portfolio Value"
//                                    stroke={theme.palette.primary.main}
//                                    dot={false}
//                                    strokeWidth={2}
//                                    activeDot={{ r: 6 }}
//                                />
//                            </LineChart>
//                        </ResponsiveContainer>
//                    </Box>
//                </Grid>

//                {/* Trade Statistics */}
//                <Grid item xs={12} md={4}>
//                    <Typography variant="h6">Trade Statistics</Typography>
//                    <Divider sx={{ my: 2 }} />
//                    <Grid container spacing={2}>
//                        <Grid item xs={6}>
//                            <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                <Typography variant="subtitle2">Win Rate</Typography>
//                                <Typography variant="h4">
//                                    {metrics.winRate.toFixed(1)}%
//                                </Typography>
//                            </Paper>
//                        </Grid>
//                        <Grid item xs={6}>
//                            <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                <Typography variant="subtitle2">Total Trades</Typography>
//                                <Typography variant="h4">
//                                    {metrics.totalTrades.toLocaleString()}
//                                </Typography>
//                            </Paper>
//                        </Grid>
//                        <Grid item xs={6}>
//                            <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                <Typography variant="subtitle2">Max Drawdown</Typography>
//                                <Typography variant="h4" color="error.main">
//                                    {metrics.maxDrawdownPercent.toFixed(2)}%
//                                </Typography>
//                            </Paper>
//                        </Grid>
//                        <Grid item xs={6}>
//                            <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                <Typography variant="subtitle2">Avg Trade Duration</Typography>
//                                <Typography variant="h4">
//                                    {metrics.avgTradeDuration}
//                                </Typography>
//                            </Paper>
//                        </Grid>
//                    </Grid>

//                    <Box sx={{ mt: 3, height: 300 }}>
//                        <Typography variant="subtitle2" gutterBottom>
//                            PnL Distribution
//                        </Typography>
//                        <ResponsiveContainer width="100%" height="100%">
//                            <BarChart data={pnlDistribution}>
//                                <CartesianGrid strokeDasharray="3 3" />
//                                <XAxis dataKey="range" />
//                                <YAxis />
//                                <Tooltip />
//                                <Bar dataKey="count" name="Number of Trades">
//                                    {pnlDistribution.map((entry, i) => (
//                                        <Cell
//                                            key={`cell-${i}`}
//                                            fill={
//                                                entry.count > 0
//                                                    ? theme.palette.success.main
//                                                    : theme.palette.error.main
//                                            }
//                                        />
//                                    ))}
//                                </Bar>
//                            </BarChart>
//                        </ResponsiveContainer>
//                    </Box>
//                </Grid>

//                {/* Monthly Performance */}
//                {monthlyPerformance.length > 0 && (
//                    <Grid item xs={12} md={6}>
//                        <Typography variant="h6">Monthly Performance</Typography>
//                        <Divider sx={{ my: 2 }} />
//                        <Box sx={{ height: 300 }}>
//                            <ResponsiveContainer width="100%" height="100%">
//                                <BarChart data={monthlyPerformance}>
//                                    <CartesianGrid strokeDasharray="3 3" />
//                                    <XAxis dataKey="month" />
//                                    <YAxis />
//                                    <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'PnL']} />
//                                    <Bar dataKey="pnl" name="Monthly PnL">
//                                        {monthlyPerformance.map((entry, i) => (
//                                            <Cell
//                                                key={`cell-${i}`}
//                                                fill={
//                                                    entry.pnl >= 0
//                                                        ? theme.palette.success.main
//                                                        : theme.palette.error.main
//                                                }
//                                            />
//                                        ))}
//                                    </Bar>
//                                </BarChart>
//                            </ResponsiveContainer>
//                        </Box>
//                    </Grid>
//                )}

//                {/* Recent Trades */}
//                <Grid item xs={12} md={monthlyPerformance.length > 0 ? 6 : 12}>
//                    <Typography variant="h6">Recent Trades</Typography>
//                    <Divider sx={{ my: 2 }} />
//                    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
//                        <Table stickyHeader size="small">
//                            <TableHead>
//                                <TableRow>
//                                    <TableCell>Entry Time</TableCell>
//                                    <TableCell>Exit Time</TableCell>
//                                    {trades[0]?.symbol && <TableCell>Symbol</TableCell>}
//                                    {trades[0]?.strategy && <TableCell>Strategy</TableCell>}
//                                    <TableCell align="right">Entry Price</TableCell>
//                                    <TableCell align="right">Exit Price</TableCell>
//                                    <TableCell align="right">PnL (%)</TableCell>
//                                    <TableCell align="right">PnL ($)</TableCell>
//                                    <TableCell>Duration</TableCell>
//                                </TableRow>
//                            </TableHead>
//                            <TableBody>
//                                {trades.slice(0, 10).map((trade, index) => (
//                                    <TableRow key={index} hover>
//                                        <TableCell>{trade.entryTime}</TableCell>
//                                        <TableCell>{trade.exitTime}</TableCell>
//                                        {trade.symbol && <TableCell>{trade.symbol}</TableCell>}
//                                        {trade.strategy && <TableCell>{trade.strategy}</TableCell>}
//                                        <TableCell align="right">
//                                            ${trade.entryPrice.toFixed(2)}
//                                        </TableCell>
//                                        <TableCell align="right">
//                                            ${trade.exitPrice.toFixed(2)}
//                                        </TableCell>
//                                        <TableCell align="right" sx={{ color: trade.pnlPercent >= 0 ? theme.palette.success.main : theme.palette.error.main }}>
//                                            {trade.pnlPercent.toFixed(2)}%
//                                        </TableCell>
//                                        <TableCell align="right" sx={{ color: trade.pnlDollar >= 0 ? theme.palette.success.main : theme.palette.error.main }}>
//                                            ${trade.pnlDollar.toFixed(2)}
//                                        </TableCell>
//                                        <TableCell>{trade.duration}</TableCell>
//                                    </TableRow>
//                                ))}
//                            </TableBody>
//                        </Table>
//                    </TableContainer>
//                </Grid>
//            </Grid>
//        </Paper>
//    );
// };

// export default PerformanceDashboard;
// new code
// ...all imports unchanged
// import {
//   Box,
//   Divider,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   useTheme,
// } from '@mui/material';
// import React from 'react';
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts';

// interface PerformanceMetrics {
//   pnlPercent: number;
//   pnlDollar: number;
//   sharpeRatio: number;
//   sortinoRatio: number;
//   maxDrawdownPercent: number;
//   winRate: number;
//   totalTrades: number;
//   avgTradeDuration: string;
// }

// interface Trade {
//   entryTime: string;
//   exitTime: string;
//   entryPrice: number;
//   exitPrice: number;
//   pnlPercent: number;
//   pnlDollar: number;
//   duration: string;
//   symbol?: string;
//   strategy?: string;
// }

// interface MonthlyPerformance {
//   month: string;
//   pnl: number;
// }

// interface PnlDistribution {
//   range: string;
//   count: number;
// }

// interface PerformanceDashboardProps {
//   metrics: PerformanceMetrics;
//   trades: Trade[];
//   equityCurve: { date: string; value: number }[];
//   pnlDistribution: PnlDistribution[];
//   monthlyPerformance?: MonthlyPerformance[];
// }

// const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
//   metrics,
//   trades,
//   equityCurve,
//   pnlDistribution,
//   monthlyPerformance = [],
// }) => {
//   const theme = useTheme();

//   if (!metrics) {
//     return <Typography>Performance data not available.</Typography>;
//   }

//   return (
//     <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
//       <Typography variant="h5" gutterBottom>
//         Performance Dashboard
//       </Typography>

//       <Box
//         sx={{
//           display: 'grid',
//           gap: 3,
//           gridTemplateColumns: {
//             xs: '1fr',
//             md: monthlyPerformance.length > 0 ? '2fr 1fr 1fr' : '2fr 1fr',
//           },
//         }}
//       >
//         <Box sx={{ gridColumn: '1/-1' }}>
//           <Typography variant="h6">Key Metrics</Typography>
//           <Divider sx={{ my: 2 }} />
//           <Box
//             sx={{
//               display: 'grid',
//               gap: 2,
//               gridTemplateColumns: {
//                 xs: '1fr 1fr',
//                 md: 'repeat(4, 1fr)',
//               },
//             }}
//           >
//             {[
//               {
//                 label: 'Total PnL (%)',
//                 value: metrics.pnlPercent !== undefined
//                   ? `${metrics.pnlPercent.toFixed(2)}%`
//                   : 'N/A',
//                 color:
//                   metrics.pnlPercent >= 0
//                     ? 'success.main'
//                     : 'error.main',
//               },
//               {
//                 label: 'Total PnL ($)',
//                 value: metrics.pnlDollar !== undefined
//                   ? `$${metrics.pnlDollar.toLocaleString(undefined, {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2,
//                     })}`
//                   : 'N/A',
//                 color:
//                   metrics.pnlDollar >= 0
//                     ? 'success.main'
//                     : 'error.main',
//               },
//               {
//                 label: 'Sharpe Ratio',
//                 value:
//                   metrics.sharpeRatio !== undefined
//                     ? metrics.sharpeRatio.toFixed(2)
//                     : 'N/A',
//               },
//               {
//                 label: 'Sortino Ratio',
//                 value:
//                   metrics.sortinoRatio !== undefined
//                     ? metrics.sortinoRatio.toFixed(2)
//                     : 'N/A',
//               },
//             ].map((m, i) => (
//               <Paper key={i} sx={{ p: 2, textAlign: 'center' }}>
//                 <Typography variant="subtitle2">{m.label}</Typography>
//                 <Typography variant="h4" color={m.color}>
//                   {m.value}
//                 </Typography>
//               </Paper>
//             ))}
//           </Box>
//         </Box>

//         {/* Equity Curve */}
//         <Box>
//           <Typography variant="h6">Equity Curve</Typography>
//           <Divider sx={{ my: 2 }} />
//           <Box sx={{ height: 400 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={equityCurve}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Value']} />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke={theme.palette.primary.main}
//                   dot={false}
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </Box>
//         </Box>

//         {/* Trade Statistics */}
//         <Box>
//           <Typography variant="h6">Trade Statistics</Typography>
//           <Divider sx={{ my: 2 }} />
//           <Box
//             sx={{
//               display: 'grid',
//               gap: 2,
//               gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr' },
//             }}
//           >
//             {[
//               {
//                 label: 'Win Rate',
//                 value:
//                   metrics.winRate !== undefined
//                     ? `${(metrics.winRate * 100).toFixed(1)}%`
//                     : 'N/A',
//               },
//               {
//                 label: 'Total Trades',
//                 value:
//                   metrics.totalTrades !== undefined
//                     ? metrics.totalTrades.toString()
//                     : 'N/A',
//               },
//               {
//                 label: 'Max Drawdown',
//                 value:
//                   metrics.maxDrawdownPercent !== undefined
//                     ? `${metrics.maxDrawdownPercent.toFixed(2)}%`
//                     : 'N/A',
//                 color: 'error.main',
//               },
//               {
//                 label: 'Avg Duration',
//                 value: metrics.avgTradeDuration || 'N/A',
//               },
//             ].map((m, i) => (
//               <Paper key={i} sx={{ p: 2, textAlign: 'center' }}>
//                 <Typography variant="subtitle2">{m.label}</Typography>
//                 <Typography variant="h4" color={m.color}>
//                   {m.value}
//                 </Typography>
//               </Paper>
//             ))}
//           </Box>

//           <Box sx={{ mt: 3, height: 300 }}>
//             <Typography variant="subtitle2" gutterBottom>
//               PnL Distribution
//             </Typography>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={pnlDistribution}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="range" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="count" name="Trades">
//                   {pnlDistribution.map((entry, idx) => (
//                     <Cell
//                       key={idx}
//                       fill={
//                         entry.count > 0
//                           ? theme.palette.success.main
//                           : theme.palette.error.main
//                       }
//                     />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </Box>
//         </Box>

//         {/* Monthly Performance */}
//         {monthlyPerformance.length > 0 && (
//           <Box>
//             <Typography variant="h6">Monthly Performance</Typography>
//             <Divider sx={{ my: 2 }} />
//             <Box sx={{ height: 300 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={monthlyPerformance}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip
//                     formatter={(v: number) => [`$${v.toLocaleString()}`, 'PnL']}
//                   />
//                   <Bar dataKey="pnl">
//                     {monthlyPerformance.map((entry, idx) => (
//                       <Cell
//                         key={idx}
//                         fill={
//                           entry.pnl >= 0
//                             ? theme.palette.success.main
//                             : theme.palette.error.main
//                         }
//                       />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </Box>
//           </Box>
//         )}

//         {/* Recent Trades */}
//         <Box
//           sx={{
//             gridColumn: monthlyPerformance.length > 0 ? 'span 2' : '1 / -1',
//           }}
//         >
//           <Typography variant="h6">Recent Trades</Typography>
//           <Divider sx={{ my: 2 }} />
//           <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
//             <Table stickyHeader size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Entry Time</TableCell>
//                   <TableCell>Exit Time</TableCell>
//                   {trades[0]?.symbol && <TableCell>Symbol</TableCell>}
//                   {trades[0]?.strategy && <TableCell>Strategy</TableCell>}
//                   <TableCell align="right">Entry Price</TableCell>
//                   <TableCell align="right">Exit Price</TableCell>
//                   <TableCell align="right">PnL (%)</TableCell>
//                   <TableCell align="right">PnL ($)</TableCell>
//                   <TableCell>Duration</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {trades.slice(0, 10).map((t, i) => (
//                   <TableRow key={i} hover>
//                     <TableCell>{t.entryTime || 'N/A'}</TableCell>
//                     <TableCell>{t.exitTime || 'N/A'}</TableCell>
//                     {t.symbol && <TableCell>{t.symbol}</TableCell>}
//                     {t.strategy && <TableCell>{t.strategy}</TableCell>}
//                     <TableCell align="right">
//                       {t.entryPrice !== undefined
//                         ? `$${t.entryPrice.toFixed(2)}`
//                         : 'N/A'}
//                     </TableCell>
//                     <TableCell align="right">
//                       {t.exitPrice !== undefined
//                         ? `$${t.exitPrice.toFixed(2)}`
//                         : 'N/A'}
//                     </TableCell>
//                     <TableCell align="right" sx={{ color: t.pnlPercent >= 0 ? theme.palette.success.main : theme.palette.error.main }}>
//                       {t.pnlPercent !== undefined
//                         ? `${t.pnlPercent.toFixed(2)}%`
//                         : 'N/A'}
//                     </TableCell>
//                     <TableCell align="right" sx={{ color: t.pnlDollar >= 0 ? theme.palette.success.main : theme.palette.error.main }}>
//                       {t.pnlDollar !== undefined
//                         ? `$${t.pnlDollar.toFixed(2)}`
//                         : 'N/A'}
//                     </TableCell>
//                     <TableCell>{t.duration || 'N/A'}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };
//latest
// export default PerformanceDashboard;
// import {
//   Box,
//   Divider,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   useTheme,
// } from '@mui/material';
// import React from 'react';
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts';

// interface PerformanceMetrics {
//   pnlPercent?: number;
//   pnlDollar?: number;
//   sharpeRatio?: number;
//   sortinoRatio?: number;
//   maxDrawdownPercent?: number;
//   winRate?: number;
//   totalTrades?: number;
//   avgTradeDuration?: string;
// }

// interface Trade {
//   entryTime: string;
//   exitTime: string;
//   entryPrice: number;
//   exitPrice: number;
//   pnlPercent?: number;
//   pnlDollar?: number;
//   duration: string;
//   symbol?: string;
//   strategy?: string;
// }

// interface MonthlyPerformance {
//   month: string;
//   pnl: number;
// }

// interface PnlDistribution {
//   range: string;
//   count: number;
// }

// interface PerformanceDashboardProps {
//   metrics: PerformanceMetrics;
//   trades: Trade[];
//   equityCurve: { date: string; value: number }[];
//   pnlDistribution: PnlDistribution[];
//   monthlyPerformance?: MonthlyPerformance[];
// }

// const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
//   metrics,
//   trades,
//   equityCurve,
//   pnlDistribution,
//   monthlyPerformance = [],
// }) => {
//   const theme = useTheme();

//   return (
//     <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
//       <Typography variant="h5" gutterBottom>
//         Performance Dashboard
//       </Typography>

//       <Box
//         sx={{
//           display: 'grid',
//           gap: 3,
//           gridTemplateColumns: {
//             xs: '1fr',
//             md: monthlyPerformance.length > 0 ? '2fr 1fr 1fr' : '2fr 1fr',
//           },
//         }}
//       >
//         {/* Key Metrics */}
//         <Box sx={{ gridColumn: '1/-1' }}>
//           <Typography variant="h6">Key Metrics</Typography>
//           <Divider sx={{ my: 2 }} />
//           <Box
//             sx={{
//               display: 'grid',
//               gap: 2,
//               gridTemplateColumns: {
//                 xs: '1fr 1fr',
//                 md: 'repeat(4, 1fr)',
//               },
//             }}
//           >
//             {[
//               {
//                 label: 'Total PnL (%)',
//                 value:
//                   metrics.pnlPercent !== undefined
//                     ? `${metrics.pnlPercent.toFixed(2)}%`
//                     : 'N/A',
//                 color:
//                   metrics.pnlPercent !== undefined && metrics.pnlPercent >= 0
//                     ? 'success.main'
//                     : 'error.main',
//               },
//               {
//                 label: 'Total PnL ($)',
//                 value:
//                   metrics.pnlDollar !== undefined
//                     ? `$${metrics.pnlDollar.toLocaleString(undefined, {
//                         minimumFractionDigits: 2,
//                         maximumFractionDigits: 2,
//                       })}`
//                     : 'N/A',
//                 color:
//                   metrics.pnlDollar !== undefined && metrics.pnlDollar >= 0
//                     ? 'success.main'
//                     : 'error.main',
//               },
//               {
//                 label: 'Sharpe Ratio',
//                 value:
//                   metrics.sharpeRatio !== undefined
//                     ? metrics.sharpeRatio.toFixed(2)
//                     : 'N/A',
//               },
//               {
//                 label: 'Sortino Ratio',
//                 value:
//                   metrics.sortinoRatio !== undefined
//                     ? metrics.sortinoRatio.toFixed(2)
//                     : 'N/A',
//               },
//             ].map((m, i) => (
//               <Paper key={i} sx={{ p: 2, textAlign: 'center' }}>
//                 <Typography variant="subtitle2">{m.label}</Typography>
//                 <Typography variant="h4" color={m.color}>
//                   {m.value}
//                 </Typography>
//               </Paper>
//             ))}
//           </Box>
//         </Box>

//         {/* Equity Curve */}
//         <Box>
//           <Typography variant="h6">Equity Curve</Typography>
//           <Divider sx={{ my: 2 }} />
//           <Box sx={{ height: 400 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={equityCurve}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip
//                   formatter={(v: number) => [`$${v.toLocaleString()}`, 'Value']}
//                 />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke={theme.palette.primary.main}
//                   dot={false}
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </Box>
//         </Box>

//         {/* Trade Stats */}
//         <Box>
//           <Typography variant="h6">Trade Statistics</Typography>
//           <Divider sx={{ my: 2 }} />
//           <Box
//             sx={{
//               display: 'grid',
//               gap: 2,
//               gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr' },
//             }}
//           >
//             {[
//               {
//                 label: 'Win Rate',
//                 value:
//                   metrics.winRate !== undefined
//                     ? `${metrics.winRate.toFixed(1)}%`
//                     : 'N/A',
//               },
//               {
//                 label: 'Total Trades',
//                 value:
//                   metrics.totalTrades !== undefined
//                     ? metrics.totalTrades.toString()
//                     : 'N/A',
//               },
//               {
//                 label: 'Max Drawdown',
//                 value:
//                   metrics.maxDrawdownPercent !== undefined
//                     ? `${metrics.maxDrawdownPercent.toFixed(2)}%`
//                     : 'N/A',
//                 color: 'error.main',
//               },
//               {
//                 label: 'Avg Duration',
//                 value: metrics.avgTradeDuration || 'N/A',
//               },
//             ].map((m, i) => (
//               <Paper key={i} sx={{ p: 2, textAlign: 'center' }}>
//                 <Typography variant="subtitle2">{m.label}</Typography>
//                 <Typography variant="h4" color={m.color}>
//                   {m.value}
//                 </Typography>
//               </Paper>
//             ))}
//           </Box>
//           <Box sx={{ mt: 3, height: 300 }}>
//             <Typography variant="subtitle2" gutterBottom>
//               PnL Distribution
//             </Typography>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={pnlDistribution}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="range" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="count" name="Trades">
//                   {pnlDistribution.map((entry, idx) => (
//                     <Cell
//                       key={idx}
//                       fill={
//                         entry.count > 0
//                           ? theme.palette.success.main
//                           : theme.palette.error.main
//                       }
//                     />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </Box>
//         </Box>

//         {/* Monthly Performance */}
//         {monthlyPerformance.length > 0 && (
//           <Box>
//             <Typography variant="h6">Monthly Performance</Typography>
//             <Divider sx={{ my: 2 }} />
//             <Box sx={{ height: 300 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={monthlyPerformance}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip
//                     formatter={(v: number) => [`$${v.toLocaleString()}`, 'PnL']}
//                   />
//                   <Bar dataKey="pnl">
//                     {monthlyPerformance.map((entry, idx) => (
//                       <Cell
//                         key={idx}
//                         fill={
//                           entry.pnl >= 0
//                             ? theme.palette.success.main
//                             : theme.palette.error.main
//                         }
//                       />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </Box>
//           </Box>
//         )}

//         {/* Recent Trades */}
//         <Box sx={{ gridColumn: monthlyPerformance.length > 0 ? 'span 2' : '1 / -1' }}>
//           <Typography variant="h6">Recent Trades</Typography>
//           <Divider sx={{ my: 2 }} />
//           <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
//             <Table stickyHeader size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Entry Time</TableCell>
//                   <TableCell>Exit Time</TableCell>
//                   {trades[0]?.symbol && <TableCell>Symbol</TableCell>}
//                   {trades[0]?.strategy && <TableCell>Strategy</TableCell>}
//                   <TableCell align="right">Entry Price</TableCell>
//                   <TableCell align="right">Exit Price</TableCell>
//                   <TableCell align="right">PnL (%)</TableCell>
//                   <TableCell align="right">PnL ($)</TableCell>
//                   <TableCell>Duration</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {trades.slice(0, 10).map((t, i) => (
//                   <TableRow key={i} hover>
//                     <TableCell>{t.entryTime}</TableCell>
//                     <TableCell>{t.exitTime}</TableCell>
//                     {t.symbol && <TableCell>{t.symbol}</TableCell>}
//                     {t.strategy && <TableCell>{t.strategy}</TableCell>}
//                     <TableCell align="right">
//                       ${t.entryPrice?.toFixed(2) || '0.00'}
//                     </TableCell>
//                     <TableCell align="right">
//                       ${t.exitPrice?.toFixed(2) || '0.00'}
//                     </TableCell>
//                     <TableCell
//                       align="right"
//                       sx={{
//                         color:
//                           (t.pnlPercent ?? 0) >= 0
//                             ? theme.palette.success.main
//                             : theme.palette.error.main,
//                       }}
//                     >
//                       {(t.pnlPercent ?? 0).toFixed(2)}%
//                     </TableCell>
//                     <TableCell
//                       align="right"
//                       sx={{
//                         color:
//                           (t.pnlDollar ?? 0) >= 0
//                             ? theme.palette.success.main
//                             : theme.palette.error.main,
//                       }}
//                     >
//                       ${(t.pnlDollar ?? 0).toFixed(2)}
//                     </TableCell>
//                     <TableCell>{t.duration || 'N/A'}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// export default PerformanceDashboard;


//best code
import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface PerformanceMetrics {
  pnlPercent: number;
  pnlDollar: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maxDrawdownPercent: number;
  winRate: number;
  totalTrades: number;
  avgTradeDuration: string;
}

interface Trade {
  entryTime: string;
  exitTime: string;
  entryPrice: number;
  exitPrice: number;
  pnlPercent: number;
  pnlDollar: number;
  duration: string;
  symbol?: string;
  strategy?: string;
}

interface MonthlyPerformance {
  month: string;
  pnl: number;
}

interface PnlDistribution {
  range: string;
  count: number;
}

interface PerformanceDashboardProps {
  metrics: PerformanceMetrics;
  trades: Trade[];
  equityCurve: { date: string; value: number }[];
  pnlDistribution: PnlDistribution[];
  monthlyPerformance?: MonthlyPerformance[];
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  metrics,
  trades,
  equityCurve,
  pnlDistribution,
  monthlyPerformance = [],
}) => {
  const theme = useTheme();

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Performance Dashboard
      </Typography>

      {/* Top‐level layout */}
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            md: monthlyPerformance.length > 0 ? '2fr 1fr 1fr' : '2fr 1fr',
          },
        }}
      >
        {/* Key Metrics full width */}
        <Box sx={{ gridColumn: '1/-1' }}>
          <Typography variant="h6">Key Metrics</Typography>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: {
                xs: '1fr 1fr',
                md: 'repeat(4, 1fr)',
              },
            }}
          >
            {[
              {
                label: 'Total PnL (%)',
                value: `${metrics.pnlPercent.toFixed(2)}%`,
                color: metrics.pnlPercent >= 0 ? 'success.main' : 'error.main',
              },
              {
                label: 'Total PnL ($)',
                value: `$${metrics.pnlDollar.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
                color: metrics.pnlDollar >= 0 ? 'success.main' : 'error.main',
              },
              {
                label: 'Sharpe Ratio',
                value: metrics.sharpeRatio.toFixed(2),
              },
              {
                label: 'Sortino Ratio',
                value: metrics.sortinoRatio.toFixed(2),
              },
            ].map((m, i) => (
              <Paper key={i} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2">{m.label}</Typography>
                <Typography variant="h4" color={m.color}>
                  {m.value}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Equity Curve */}
        <Box>
          <Typography variant="h6">Equity Curve</Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={equityCurve}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(v: number) => [`$${v.toLocaleString()}`, 'Value']}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={theme.palette.primary.main}
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Trade Statistics */}
        <Box>
          <Typography variant="h6">Trade Statistics</Typography>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr' },
            }}
          >
            {[
              {
                label: 'Win Rate',
                value: `${metrics.winRate.toFixed(1)}%`,
              },
              {
                label: 'Total Trades',
                value: metrics.totalTrades.toString(),
              },
              {
                label: 'Max Drawdown',
                value: `${metrics.maxDrawdownPercent.toFixed(2)}%`,
                color: 'error.main',
              },
              {
                label: 'Avg Duration',
                value: metrics.avgTradeDuration,
              },
            ].map((m, i) => (
              <Paper key={i} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2">{m.label}</Typography>
                <Typography variant="h4" color={m.color}>
                  {m.value}
                </Typography>
              </Paper>
            ))}
          </Box>
          <Box sx={{ mt: 3, height: 300 }}>
            <Typography variant="subtitle2" gutterBottom>
              PnL Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pnlDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Trades">
                  {pnlDistribution.map((entry, idx) => (
                    <Cell
                      key={idx}
                      fill={
                        entry.count > 0
                          ? theme.palette.success.main
                          : theme.palette.error.main
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Monthly Performance (if any) */}
        {monthlyPerformance.length > 0 && (
          <Box>
            <Typography variant="h6">Monthly Performance</Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(v: number) => [`$${v.toLocaleString()}`, 'PnL']}
                  />
                  <Bar dataKey="pnl">
                    {monthlyPerformance.map((entry, idx) => (
                      <Cell
                        key={idx}
                        fill={
                          entry.pnl >= 0
                            ? theme.palette.success.main
                            : theme.palette.error.main
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        )}

        {/* Recent Trades, spans 2 columns if monthly chart is present */}
        <Box
          sx={{
            gridColumn:
              monthlyPerformance.length > 0 ? 'span 2' : '1 / -1',
          }}
        >
          <Typography variant="h6">Recent Trades</Typography>
          <Divider sx={{ my: 2 }} />
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Entry Time</TableCell>
                  <TableCell>Exit Time</TableCell>
                  {trades[0]?.symbol && <TableCell>Symbol</TableCell>}
                  {trades[0]?.strategy && <TableCell>Strategy</TableCell>}
                  <TableCell align="right">Entry Price</TableCell>
                  <TableCell align="right">Exit Price</TableCell>
                  <TableCell align="right">PnL (%)</TableCell>
                  <TableCell align="right">PnL ($)</TableCell>
                  <TableCell>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trades.slice(0, 10).map((t, i) => (
                  <TableRow key={i} hover>
                    <TableCell>{t.entryTime}</TableCell>
                    <TableCell>{t.exitTime}</TableCell>
                    {t.symbol && <TableCell>{t.symbol}</TableCell>}
                    {t.strategy && <TableCell>{t.strategy}</TableCell>}
                    <TableCell align="right">
                      ${t.entryPrice.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      ${t.exitPrice.toFixed(2)}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color:
                          t.pnlPercent >= 0
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                      }}
                    >
                      {t.pnlPercent.toFixed(2)}%
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color:
                          t.pnlDollar >= 0
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                      }}
                    >
                      ${t.pnlDollar.toFixed(2)}
                    </TableCell>
                    <TableCell>{t.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Paper>
  );
};

export default PerformanceDashboard;



// import {
//     Box,
//     Divider,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
//     useTheme
// } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid'; // Updated import
// import React from 'react';
// import {
//     Bar,
//     BarChart,
//     CartesianGrid,
//     Cell,
//     Legend,
//     Line,
//     LineChart,
//     ResponsiveContainer,
//     Tooltip,
//     XAxis,
//     YAxis
// } from 'recharts';

// // ... (rest of your interfaces remain unchanged)
// interface PerformanceMetrics {
//     pnlPercent: number;
//     pnlDollar: number;
//     sharpeRatio: number;
//     sortinoRatio: number;
//     maxDrawdownPercent: number;
//     winRate: number;
//     totalTrades: number;
//     avgTradeDuration: string;
// }

// interface Trade {
//     entryTime: string;
//     exitTime: string;
//     entryPrice: number;
//     exitPrice: number;
//     pnlPercent: number;
//     pnlDollar: number;
//     duration: string;
//     symbol?: string;
//     strategy?: string;
// }

// interface MonthlyPerformance {
//     month: string;
//     pnl: number;
// }

// interface PnlDistribution {
//     range: string;
//     count: number;
// }

// interface PerformanceDashboardProps {
//     metrics: PerformanceMetrics;
//     trades: Trade[];
//     equityCurve: { date: string; value: number }[];
//     pnlDistribution: PnlDistribution[];
//     monthlyPerformance?: MonthlyPerformance[];
// }

// const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
//     metrics,
//     trades,
//     equityCurve,
//     pnlDistribution,
//     monthlyPerformance = []
// }) => {
//     const theme = useTheme();

//     // Prepare data for win/loss pie chart
//     const winLossData = [
//         { name: 'Winning Trades', value: metrics.winRate, color: theme.palette.success.main },
//         { name: 'Losing Trades', value: 100 - metrics.winRate, color: theme.palette.error.main }
//     ];

//     return (
//         <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
//             <Typography variant="h5" gutterBottom>
//                 Performance Dashboard
//             </Typography>

//             <Grid container spacing={3}>
//                 {/* Key Metrics */}
//                 <Grid xs={12}>
//                     <Typography variant="h6">Key Metrics</Typography>
//                     <Divider sx={{ my: 2 }} />

//                     <Grid container spacing={2}>
//                         <Grid xs={6} md={3}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Total PnL (%)</Typography>
//                                 <Typography
//                                     variant="h4"
//                                     color={
//                                         metrics.pnlPercent >= 0 ? 'success.main' : 'error.main'
//                                     }
//                                 >
//                                     {metrics.pnlPercent.toFixed(2)}%
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid xs={6} md={3}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Total PnL ($)</Typography>
//                                 <Typography
//                                     variant="h4"
//                                     color={
//                                         metrics.pnlDollar >= 0 ? 'success.main' : 'error.main'
//                                     }
//                                 >
//                                     ${metrics.pnlDollar.toLocaleString(undefined, {
//                                         minimumFractionDigits: 2,
//                                         maximumFractionDigits: 2
//                                     })}
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid xs={6} md={3}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Sharpe Ratio</Typography>
//                                 <Typography variant="h4">
//                                     {metrics.sharpeRatio.toFixed(2)}
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid xs={6} md={3}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Sortino Ratio</Typography>
//                                 <Typography variant="h4">
//                                     {metrics.sortinoRatio.toFixed(2)}
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                     </Grid>
//                 </Grid>

//                 {/* Equity Curve */}
//                 <Grid xs={12} md={8}>
//                     <Typography variant="h6">Equity Curve</Typography>
//                     <Divider sx={{ my: 2 }} />
//                     <Box sx={{ height: 400 }}>
//                         <ResponsiveContainer width="100%" height="100%">
//                             <LineChart data={equityCurve}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="date" />
//                                 <YAxis />
//                                 <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']} />
//                                 <Legend />
//                                 <Line
//                                     type="monotone"
//                                     dataKey="value"
//                                     name="Portfolio Value"
//                                     stroke={theme.palette.primary.main}
//                                     dot={false}
//                                     strokeWidth={2}
//                                     activeDot={{ r: 6 }}
//                                 />
//                             </LineChart>
//                         </ResponsiveContainer>
//                     </Box>
//                 </Grid>

//                 {/* Trade Statistics */}
//                 <Grid xs={12} md={4}>
//                     <Typography variant="h6">Trade Statistics</Typography>
//                     <Divider sx={{ my: 2 }} />
//                     <Grid container spacing={2}>
//                         <Grid xs={6}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Win Rate</Typography>
//                                 <Typography variant="h4">
//                                     {metrics.winRate.toFixed(1)}%
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid xs={6}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Total Trades</Typography>
//                                 <Typography variant="h4">
//                                     {metrics.totalTrades.toLocaleString()}
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid xs={6}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Max Drawdown</Typography>
//                                 <Typography variant="h4" color="error.main">
//                                     {metrics.maxDrawdownPercent.toFixed(2)}%
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid xs={6}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Avg Trade Duration</Typography>
//                                 <Typography variant="h4">
//                                     {metrics.avgTradeDuration}
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                     </Grid>

//                     <Box sx={{ mt: 3, height: 300 }}>
//                         <Typography variant="subtitle2" gutterBottom>
//                             PnL Distribution
//                         </Typography>
//                         <ResponsiveContainer width="100%" height="100%">
//                             <BarChart data={pnlDistribution}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="range" />
//                                 <YAxis />
//                                 <Tooltip />
//                                 <Bar dataKey="count" name="Number of Trades">
//                                     {pnlDistribution.map((entry, i) => (
//                                         <Cell
//                                             key={`cell-${i}`}
//                                             fill={
//                                                 entry.count > 0
//                                                     ? theme.palette.success.main
//                                                     : theme.palette.error.main
//                                             }
//                                         />
//                                     ))}
//                                 </Bar>
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </Box>
//                 </Grid>

//                 {/* Monthly Performance */}
//                 {monthlyPerformance.length > 0 && (
//                     <Grid xs={12} md={6}>
//                         <Typography variant="h6">Monthly Performance</Typography>
//                         <Divider sx={{ my: 2 }} />
//                         <Box sx={{ height: 300 }}>
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <BarChart data={monthlyPerformance}>
//                                     <CartesianGrid strokeDasharray="3 3" />
//                                     <XAxis dataKey="month" />
//                                     <YAxis />
//                                     <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'PnL']} />
//                                     <Bar dataKey="pnl" name="Monthly PnL">
//                                         {monthlyPerformance.map((entry, i) => (
//                                             <Cell
//                                                 key={`cell-${i}`}
//                                                 fill={
//                                                     entry.pnl >= 0
//                                                         ? theme.palette.success.main
//                                                         : theme.palette.error.main
//                                                 }
//                                             />
//                                         ))}
//                                     </Bar>
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </Box>
//                     </Grid>
//                 )}

//                 {/* Recent Trades */}
//                 <Grid xs={12} md={monthlyPerformance.length > 0 ? 6 : 12}>
//                     <Typography variant="h6">Recent Trades</Typography>
//                     <Divider sx={{ my: 2 }} />
//                     <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
//                         <Table stickyHeader size="small">
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Entry Time</TableCell>
//                                     <TableCell>Exit Time</TableCell>
//                                     {trades[0]?.symbol && <TableCell>Symbol</TableCell>}
//                                     {trades[0]?.strategy && <TableCell>Strategy</TableCell>}
//                                     <TableCell align="right">Entry Price</TableCell>
//                                     <TableCell align="right">Exit Price</TableCell>
//                                     <TableCell align="right">PnL (%)</TableCell>
//                                     <TableCell align="right">PnL ($)</TableCell>
//                                     <TableCell>Duration</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {trades.slice(0, 10).map((trade, index) => (
//                                     <TableRow key={index} hover>
//                                         <TableCell>{trade.entryTime}</TableCell>
//                                         <TableCell>{trade.exitTime}</TableCell>
//                                         {trade.symbol && <TableCell>{trade.symbol}</TableCell>}
//                                         {trade.strategy && <TableCell>{trade.strategy}</TableCell>}
//                                         <TableCell align="right">
//                                             ${trade.entryPrice.toFixed(2)}
//                                         </TableCell>
//                                         <TableCell align="right">
//                                             ${trade.exitPrice.toFixed(2)}
//                                         </TableCell>
//                                         <TableCell align="right" sx={{ color: trade.pnlPercent >= 0 ? theme.palette.success.main : theme.palette.error.main }}>
//                                             {trade.pnlPercent.toFixed(2)}%
//                                         </TableCell>
//                                         <TableCell align="right" sx={{ color: trade.pnlDollar >= 0 ? theme.palette.success.main : theme.palette.error.main }}>
//                                             ${trade.pnlDollar.toFixed(2)}
//                                         </TableCell>
//                                         <TableCell>{trade.duration}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Grid>
//             </Grid>
//         </Paper>
//     );
// };

// export default PerformanceDashboard;

// import {
//     Box,
//     Divider,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
//     useTheme
// } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import React from 'react';
// import {
//     Bar,
//     BarChart,
//     CartesianGrid,
//     Cell,
//     Legend,
//     Line,
//     LineChart,
//     ResponsiveContainer,
//     Tooltip,
//     XAxis,
//     YAxis
// } from 'recharts';

// // Type augmentation to fix Grid component props
// declare module '@mui/material/Grid' {
//   interface GridPropsVariantOverrides {
//     item: true;
//     container: true;
//   }
//   interface GridProps {
//     item?: boolean;
//     container?: boolean;
//   }
// }

// interface PerformanceMetrics {
//     pnlPercent: number;
//     pnlDollar: number;
//     sharpeRatio: number;
//     sortinoRatio: number;
//     maxDrawdownPercent: number;
//     winRate: number;
//     totalTrades: number;
//     avgTradeDuration: string;
// }

// interface Trade {
//     entryTime: string;
//     exitTime: string;
//     entryPrice: number;
//     exitPrice: number;
//     pnlPercent: number;
//     pnlDollar: number;
//     duration: string;
//     symbol?: string;
//     strategy?: string;
// }

// interface MonthlyPerformance {
//     month: string;
//     pnl: number;
// }

// interface PnlDistribution {
//     range: string;
//     count: number;
// }

// interface PerformanceDashboardProps {
//     metrics: PerformanceMetrics;
//     trades: Trade[];
//     equityCurve: { date: string; value: number }[];
//     pnlDistribution: PnlDistribution[];
//     monthlyPerformance?: MonthlyPerformance[];
// }

// const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
//     metrics,
//     trades,
//     equityCurve,
//     pnlDistribution,
//     monthlyPerformance = []
// }) => {
//     const theme = useTheme();

//     // Prepare data for win/loss pie chart
//     const winLossData = [
//         { name: 'Winning Trades', value: metrics.winRate, color: theme.palette.success.main },
//         { name: 'Losing Trades', value: 100 - metrics.winRate, color: theme.palette.error.main }
//     ];

//     return (
//         <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
//             <Typography variant="h5" gutterBottom>
//                 Performance Dashboard
//             </Typography>

//             <Grid container spacing={3}>
//                 {/* Key Metrics */}
//                 <Grid item xs={12}>
//                     <Typography variant="h6">Key Metrics</Typography>
//                     <Divider sx={{ my: 2 }} />

//                     <Grid container spacing={2}>
//                         <Grid item xs={6} md={3}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Total PnL (%)</Typography>
//                                 <Typography
//                                     variant="h4"
//                                     color={
//                                         metrics.pnlPercent >= 0 ? 'success.main' : 'error.main'
//                                     }
//                                 >
//                                     {metrics.pnlPercent.toFixed(2)}%
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid item xs={6} md={3}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Total PnL ($)</Typography>
//                                 <Typography
//                                     variant="h4"
//                                     color={
//                                         metrics.pnlDollar >= 0 ? 'success.main' : 'error.main'
//                                     }
//                                 >
//                                     ${metrics.pnlDollar.toLocaleString(undefined, {
//                                         minimumFractionDigits: 2,
//                                         maximumFractionDigits: 2
//                                     })}
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid item xs={6} md={3}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Sharpe Ratio</Typography>
//                                 <Typography variant="h4">
//                                     {metrics.sharpeRatio.toFixed(2)}
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid item xs={6} md={3}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Sortino Ratio</Typography>
//                                 <Typography variant="h4">
//                                     {metrics.sortinoRatio.toFixed(2)}
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                     </Grid>
//                 </Grid>

//                 {/* Equity Curve */}
//                 <Grid item xs={12} md={8}>
//                     <Typography variant="h6">Equity Curve</Typography>
//                     <Divider sx={{ my: 2 }} />
//                     <Box sx={{ height: 400 }}>
//                         <ResponsiveContainer width="100%" height="100%">
//                             <LineChart data={equityCurve}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="date" />
//                                 <YAxis />
//                                 <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']} />
//                                 <Legend />
//                                 <Line
//                                     type="monotone"
//                                     dataKey="value"
//                                     name="Portfolio Value"
//                                     stroke={theme.palette.primary.main}
//                                     dot={false}
//                                     strokeWidth={2}
//                                     activeDot={{ r: 6 }}
//                                 />
//                             </LineChart>
//                         </ResponsiveContainer>
//                     </Box>
//                 </Grid>

//                 {/* Trade Statistics */}
//                 <Grid item xs={12} md={4}>
//                     <Typography variant="h6">Trade Statistics</Typography>
//                     <Divider sx={{ my: 2 }} />
//                     <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Win Rate</Typography>
//                                 <Typography variant="h4">
//                                     {metrics.winRate.toFixed(1)}%
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Total Trades</Typography>
//                                 <Typography variant="h4">
//                                     {metrics.totalTrades.toLocaleString()}
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Max Drawdown</Typography>
//                                 <Typography variant="h4" color="error.main">
//                                     {metrics.maxDrawdownPercent.toFixed(2)}%
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                 <Typography variant="subtitle2">Avg Trade Duration</Typography>
//                                 <Typography variant="h4">
//                                     {metrics.avgTradeDuration}
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                     </Grid>

//                     <Box sx={{ mt: 3, height: 300 }}>
//                         <Typography variant="subtitle2" gutterBottom>
//                             PnL Distribution
//                         </Typography>
//                         <ResponsiveContainer width="100%" height="100%">
//                             <BarChart data={pnlDistribution}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="range" />
//                                 <YAxis />
//                                 <Tooltip />
//                                 <Bar dataKey="count" name="Number of Trades">
//                                     {pnlDistribution.map((entry, i) => (
//                                         <Cell
//                                             key={`cell-${i}`}
//                                             fill={
//                                                 entry.count > 0
//                                                     ? theme.palette.success.main
//                                                     : theme.palette.error.main
//                                             }
//                                         />
//                                     ))}
//                                 </Bar>
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </Box>
//                 </Grid>

//                 {/* Monthly Performance */}
//                 {monthlyPerformance.length > 0 && (
//                     <Grid item xs={12} md={6}>
//                         <Typography variant="h6">Monthly Performance</Typography>
//                         <Divider sx={{ my: 2 }} />
//                         <Box sx={{ height: 300 }}>
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <BarChart data={monthlyPerformance}>
//                                     <CartesianGrid strokeDasharray="3 3" />
//                                     <XAxis dataKey="month" />
//                                     <YAxis />
//                                     <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'PnL']} />
//                                     <Bar dataKey="pnl" name="Monthly PnL">
//                                         {monthlyPerformance.map((entry, i) => (
//                                             <Cell
//                                                 key={`cell-${i}`}
//                                                 fill={
//                                                     entry.pnl >= 0
//                                                         ? theme.palette.success.main
//                                                         : theme.palette.error.main
//                                                 }
//                                             />
//                                         ))}
//                                     </Bar>
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </Box>
//                     </Grid>
//                 )}

//                 {/* Recent Trades */}
//                 <Grid 
//                     item 
//                     xs={12} 
//                     md={monthlyPerformance.length > 0 ? 6 : 12}
//                 >
//                     <Typography variant="h6">Recent Trades</Typography>
//                     <Divider sx={{ my: 2 }} />
//                     <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
//                         <Table stickyHeader size="small">
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Entry Time</TableCell>
//                                     <TableCell>Exit Time</TableCell>
//                                     {trades[0]?.symbol && <TableCell>Symbol</TableCell>}
//                                     {trades[0]?.strategy && <TableCell>Strategy</TableCell>}
//                                     <TableCell align="right">Entry Price</TableCell>
//                                     <TableCell align="right">Exit Price</TableCell>
//                                     <TableCell align="right">PnL (%)</TableCell>
//                                     <TableCell align="right">PnL ($)</TableCell>
//                                     <TableCell>Duration</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {trades.slice(0, 10).map((trade, index) => (
//                                     <TableRow key={index} hover>
//                                         <TableCell>{trade.entryTime}</TableCell>
//                                         <TableCell>{trade.exitTime}</TableCell>
//                                         {trade.symbol && <TableCell>{trade.symbol}</TableCell>}
//                                         {trade.strategy && <TableCell>{trade.strategy}</TableCell>}
//                                         <TableCell align="right">
//                                             ${trade.entryPrice.toFixed(2)}
//                                         </TableCell>
//                                         <TableCell align="right">
//                                             ${trade.exitPrice.toFixed(2)}
//                                         </TableCell>
//                                         <TableCell align="right" sx={{ color: trade.pnlPercent >= 0 ? theme.palette.success.main : theme.palette.error.main }}>
//                                             {trade.pnlPercent.toFixed(2)}%
//                                         </TableCell>
//                                         <TableCell align="right" sx={{ color: trade.pnlDollar >= 0 ? theme.palette.success.main : theme.palette.error.main }}>
//                                             ${trade.pnlDollar.toFixed(2)}
//                                         </TableCell>
//                                         <TableCell>{trade.duration}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Grid>
//             </Grid>
//         </Paper>
//     );
// };

// export default PerformanceDashboard;