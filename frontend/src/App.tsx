// import React from 'react';
// import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { SnackbarProvider } from 'notistack';
// import { QueryClient, QueryClientProvider } from 'react-query';

// import StrategyBuilder from './components/StrategyBuilder';
// import PerformanceDashboard from './components/PerformanceDashboard';
// import NavBar from './components/NavBar';
// import DataLoader from './components/DataLoader';

// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//   },
// });

// const queryClient = new QueryClient();

// const App: React.FC = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <SnackbarProvider maxSnack={3}>
//         <QueryClientProvider client={queryClient}>
//           <Router>
//             <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//               <NavBar />
              
//               <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                 <Routes>
//                   <Route path="/" element={<StrategyBuilder />} />
//                   <Route path="/data" element={<DataLoader />} />
//                   <Route path="/results" element={<PerformanceDashboard />} />
//                 </Routes>
//               </Box>
//             </Box>
//           </Router>
//         </QueryClientProvider>
//       </SnackbarProvider>
//     </ThemeProvider>
//   );
// };

// export default App;

import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ResultsPage from './components/ResultsPage';


import DataLoader from './components/DataLoader';
import NavBar from './components/NavBar';
import StrategyBuilder from './components/StrategyBuilder';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

// Configure query client with default options
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

// Default dashboard data to prevent missing props error
const defaultDashboardData = {
    metrics: {
        pnlPercent: 0,
        pnlDollar: 0,
        sharpeRatio: 0,
        sortinoRatio: 0,
        maxDrawdownPercent: 0,
        winRate: 0,
        totalTrades: 0,
        avgTradeDuration: '0h',
    },
    trades: [],
    equityCurve: [],
    pnlDistribution: [],
};

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <QueryClientProvider client={queryClient}>
                    <Router>
                        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                            <NavBar />
                            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                <Routes>
                                    <Route path="/" element={<StrategyBuilder />} />
                                    <Route path="/data" element={<DataLoader />} />
                                    <Route path="/results" element={<ResultsPage />} />
                                    {/* <Route
                                        path="/results"
                                        element={<PerformanceDashboard {...defaultDashboardData} />}
                                    /> */}
                                </Routes>
                            </Box>
                        </Box>
                    </Router>
                </QueryClientProvider>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;