// import React, { useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { v4 as uuidv4 } from 'uuid';
// import { Box, Button, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Paper, Divider } from '@mui/material';
// import { Add, Delete } from '@mui/icons-material';
// import { ConditionOperator, IndicatorType, MarketType, Exchange, OrderType } from '../types/strategy';

// interface IndicatorConfig {
//   id: string;
//   type: IndicatorType;
//   params: Record<string, number>;
// }

// interface Condition {
//   id: string;
//   left: string | number | Condition;
//   operator: ConditionOperator;
//   right: string | number | Condition;
// }

// interface StrategyForm {
//   name: string;
//   symbols: string[];
//   exchange: Exchange;
//   marketType: MarketType;
//   timeframe: string;
//   entryConditions: Condition[];
//   exitConditions: Condition[];
//   orderType: OrderType;
//   feesBps: number;
//   slippageBps: number;
//   stopLossPct?: number;
//   takeProfitPct?: number;
// }

// const StrategyBuilder: React.FC = () => {
//   const { control, register, handleSubmit, watch, formState: { errors } } = useForm<StrategyForm>({
//     defaultValues: {
//       name: '',
//       symbols: ['BTC/USDT'],
//       exchange: Exchange.BINANCE,
//       marketType: MarketType.SPOT,
//       timeframe: '1d',
//       entryConditions: [],
//       exitConditions: [],
//       orderType: OrderType.MARKET,
//       feesBps: 5,
//       slippageBps: 10
//     }
//   });

//   const { fields: entryFields, append: appendEntry, remove: removeEntry } = useFieldArray({
//     control,
//     name: 'entryConditions'
//   });

//   const { fields: exitFields, append: appendExit, remove: removeExit } = useFieldArray({
//     control,
//     name: 'exitConditions'
//   });

//   const onSubmit = (data: StrategyForm) => {
//     console.log('Strategy submitted:', data);
//     // TODO: Send to backend for backtesting
//   };

//   const addCondition = (isEntry: boolean) => {
//     const newCondition: Condition = {
//       id: uuidv4(),
//       left: '',
//       operator: ConditionOperator.GT,
//       right: ''
//     };
    
//     if (isEntry) {
//       appendEntry(newCondition);
//     } else {
//       appendExit(newCondition);
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 3 }}>
//       <Typography variant="h5" gutterBottom>Strategy Builder</Typography>
      
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               label="Strategy Name"
//               {...register('name', { required: 'Strategy name is required' })}
//               error={!!errors.name}
//               helperText={errors.name?.message}
//             />
//           </Grid>
          
//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth>
//               <InputLabel>Exchange</InputLabel>
//               <Select
//                 label="Exchange"
//                 {...register('exchange')}
//                 defaultValue={Exchange.BINANCE}
//               >
//                 {Object.values(Exchange).map(ex => (
//                   <MenuItem key={ex} value={ex}>{ex}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
          
//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth>
//               <InputLabel>Market Type</InputLabel>
//               <Select
//                 label="Market Type"
//                 {...register('marketType')}
//                 defaultValue={MarketType.SPOT}
//               >
//                 {Object.values(MarketType).map(mt => (
//                   <MenuItem key={mt} value={mt}>{mt}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
          
//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth>
//               <InputLabel>Timeframe</InputLabel>
//               <Select
//                 label="Timeframe"
//                 {...register('timeframe')}
//                 defaultValue="1d"
//               >
//                 <MenuItem value="1m">1 Minute</MenuItem>
//                 <MenuItem value="5m">5 Minutes</MenuItem>
//                 <MenuItem value="15m">15 Minutes</MenuItem>
//                 <MenuItem value="1h">1 Hour</MenuItem>
//                 <MenuItem value="4h">4 Hours</MenuItem>
//                 <MenuItem value="1d">1 Day</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
          
//           {/* Entry Conditions */}
//           <Grid item xs={12}>
//             <Typography variant="h6">Entry Conditions</Typography>
//             <Divider sx={{ my: 2 }} />
            
//             {entryFields.map((field, index) => (
//               <Box key={field.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
//                 <Grid container spacing={2} alignItems="center">
//                   <Grid item xs={4}>
//                     <TextField
//                       fullWidth
//                       label="Left Operand"
//                       {...register(`entryConditions.${index}.left`)}
//                     />
//                   </Grid>
                  
//                   <Grid item xs={2}>
//                     <FormControl fullWidth>
//                       <Select
//                         {...register(`entryConditions.${index}.operator`)}
//                         defaultValue={ConditionOperator.GT}
//                       >
//                         {Object.values(ConditionOperator).map(op => (
//                           <MenuItem key={op} value={op}>{op}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
                  
//                   <Grid item xs={4}>
//                     <TextField
//                       fullWidth
//                       label="Right Operand"
//                       {...register(`entryConditions.${index}.right`)}
//                     />
//                   </Grid>
                  
//                   <Grid item xs={2}>
//                     <Button
//                       color="error"
//                       startIcon={<Delete />}
//                       onClick={() => removeEntry(index)}
//                     >
//                       Remove
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Box>
//             ))}
            
//             <Button
//               variant="outlined"
//               startIcon={<Add />}
//               onClick={() => addCondition(true)}
//             >
//               Add Entry Condition
//             </Button>
//           </Grid>
          
//           {/* Exit Conditions */}
//           <Grid item xs={12}>
//             <Typography variant="h6">Exit Conditions</Typography>
//             <Divider sx={{ my: 2 }} />
            
//             {exitFields.map((field, index) => (
//               <Box key={field.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
//                 <Grid container spacing={2} alignItems="center">
//                   <Grid item xs={4}>
//                     <TextField
//                       fullWidth
//                       label="Left Operand"
//                       {...register(`exitConditions.${index}.left`)}
//                     />
//                   </Grid>
                  
//                   <Grid item xs={2}>
//                     <FormControl fullWidth>
//                       <Select
//                         {...register(`exitConditions.${index}.operator`)}
//                         defaultValue={ConditionOperator.GT}
//                       >
//                         {Object.values(ConditionOperator).map(op => (
//                           <MenuItem key={op} value={op}>{op}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
                  
//                   <Grid item xs={4}>
//                     <TextField
//                       fullWidth
//                       label="Right Operand"
//                       {...register(`exitConditions.${index}.right`)}
//                     />
//                   </Grid>
                  
//                   <Grid item xs={2}>
//                     <Button
//                       color="error"
//                       startIcon={<Delete />}
//                       onClick={() => removeExit(index)}
//                     >
//                       Remove
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Box>
//             ))}
            
//             <Button
//               variant="outlined"
//               startIcon={<Add />}
//               onClick={() => addCondition(false)}
//             >
//               Add Exit Condition
//             </Button>
//           </Grid>
          
//           {/* Execution Parameters */}
//           <Grid item xs={12}>
//             <Typography variant="h6">Execution Parameters</Typography>
//             <Divider sx={{ my: 2 }} />
            
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Order Type</InputLabel>
//                   <Select
//                     label="Order Type"
//                     {...register('orderType')}
//                     defaultValue={OrderType.MARKET}
//                   >
//                     {Object.values(OrderType).map(ot => (
//                       <MenuItem key={ot} value={ot}>{ot}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Fees (bps)"
//                   type="number"
//                   {...register('feesBps', { valueAsNumber: true })}
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Slippage (bps)"
//                   type="number"
//                   {...register('slippageBps', { valueAsNumber: true })}
//                 />
//               </Grid>
//             </Grid>
//           </Grid>
          
//           {/* Risk Management */}
//           <Grid item xs={12}>
//             <Typography variant="h6">Risk Management</Typography>
//             <Divider sx={{ my: 2 }} />
            
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Stop Loss (%)"
//                   type="number"
//                   {...register('stopLossPct', { valueAsNumber: true })}
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Take Profit (%)"
//                   type="number"
//                   {...register('takeProfitPct', { valueAsNumber: true })}
//                 />
//               </Grid>
//             </Grid>
//           </Grid>
          
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" size="large" fullWidth>
//               Run Backtest
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Paper>
//   );
// };

// export default StrategyBuilder;

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBacktestStore } from '../store/backtestStore';


//import * as React from 'react';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    ExpandMore as ExpandMoreIcon,
    HelpOutline as HelpIcon
} from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Box, Button,
    Chip,
    FormControl,
    FormHelperText, IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { ConditionOperator, Exchange, IndicatorType, MarketType, OrderType } from '../types/strategy';


// Custom Grid Components to replace MUI Grid and fix TypeScript issues
const GridContainer: React.FC<{
    children: React.ReactNode,
    spacing?: number,
    alignItems?: string,
    style?: React.CSSProperties
}> = ({ children, spacing = 3, alignItems, style }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: spacing * 8,
            alignItems: alignItems || 'stretch',
            ...style
        }}>
            {children}
        </div>
    );
};


const GridItem: React.FC<{
    children: React.ReactNode,
    xs?: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number,
    style?: React.CSSProperties
}> = ({ children, xs = 12, sm, md, lg, xl, style }) => {
    const getSpan = (size?: number) => size ? `span ${size}` : 'auto';

    return (
        <div style={{
            gridColumn: getSpan(xs),
            ...(sm && { '@media (min-width: 600px)': { gridColumn: getSpan(sm) } }),
            ...(md && { '@media (min-width: 900px)': { gridColumn: getSpan(md) } }),
            ...(lg && { '@media (min-width: 1200px)': { gridColumn: getSpan(lg) } }),
            ...(xl && { '@media (min-width: 1536px)': { gridColumn: getSpan(xl) } }),
            ...style
        } as React.CSSProperties}>
            {children}
        </div>
    );
};

interface IndicatorConfig {
    id: string;
    type: IndicatorType;
    params: Record<string, number>;
}

interface Condition {
    id: string;
    left: string | number | Condition;
    operator: ConditionOperator;
    right: string | number | Condition;
}

interface StrategyForm {
    name: string;
    description: string;
    symbols: string[];
    exchange: Exchange;
    marketType: MarketType;
    timeframe: string;
    entryConditions: Condition[];
    exitConditions: Condition[];
    orderType: OrderType;
    feesBps: number;
    slippageBps: number;
    stopLossPct?: number;
    takeProfitPct?: number;
    trailingStopPct?: number;
}

const timeframes = [
    { value: '1m', label: '1 Minute' },
    { value: '5m', label: '5 Minutes' },
    { value: '15m', label: '15 Minutes' },
    { value: '30m', label: '30 Minutes' },
    { value: '1h', label: '1 Hour' },
    { value: '4h', label: '4 Hours' },
    { value: '1d', label: '1 Day' },
    { value: '1w', label: '1 Week' },
];

const popularSymbols = [
    'BTC/USDT',
    'ETH/USDT',
    'BNB/USDT',
    'SOL/USDT',
    'XRP/USDT',
    'ADA/USDT',
    'DOGE/USDT',
    'DOT/USDT',
    'AVAX/USDT',
    'MATIC/USDT'
];

const StrategyBuilder: React.FC = () => {
    const navigate = useNavigate();
    const buildCondition = (condition: Condition) => ({
    left: condition.left.toString(),
    operator: condition.operator,
    right: condition.right.toString(),
  });
    const runBacktest = useBacktestStore((s) => s.runBacktest);
    const formRef = useRef(null);
    const [value, setValue] = useState('');
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StrategyForm>({
        defaultValues: {
            name: '',
            description: '',
            symbols: ['BTC/USDT'],
            exchange: Exchange.BINANCE,
            marketType: MarketType.SPOT,
            timeframe: '1d',
            entryConditions: [],
            exitConditions: [],
            orderType: OrderType.MARKET,
            feesBps: 5,
            slippageBps: 10,
            stopLossPct: 0,
            takeProfitPct: 0,
            trailingStopPct: 0
        }
    });

    const { fields: entryFields, append: appendEntry, remove: removeEntry } = useFieldArray({
        control,
        name: 'entryConditions'
    });

    const { fields: exitFields, append: appendExit, remove: removeExit } = useFieldArray({
        control,
        name: 'exitConditions'
    });

    const [expandedSection, setExpandedSection] = useState<string | false>('general');

    const handleAccordionChange = (section: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedSection(isExpanded ? section : false);
    };

    // const onSubmit = (data: StrategyForm) => {
    //     console.log('Strategy submitted:', data);
    //     // TODO: Send to backend for backtesting
    // };
//     const onSubmit = (data: StrategyForm) => {
//         // const runBacktest = useBacktestStore.getState().runBacktest;
//         const payload = {
//             name: data.name,
//             asset_selection: {
//                 symbols: data.symbols.map(s => s.replace('/', '')), // BTCUSDT
//                 exchange: data.exchange.toLowerCase(), // Must be lowercase for backend enum
//                 market_type: data.marketType
//             },
//             entry_conditions: {
//                 left: {
//                 type: 'ema',
//                 params: { period: 20 },
//                 lookback: 1
//       },
//       operator: '>',
//       right: {
//         type: 'ema',
//         params: { period: 50 },
//         lookback: 1
//       }
//     },
//     exit_conditions: {
//       left: {
//         type: 'price',
//         params: {},
//         lookback: 1
//       },
//       operator: '<',
//       right: {
//         type: 'ema',
//         params: { period: 20 },
//         lookback: 1
//       }
//     },
//     execution_params: {
//       order_type: data.orderType,
//       quantity: 1,
//       fees_bps: data.feesBps,
//       slippage_bps: data.slippageBps,
//       portfolio_pct: 1
//     },
//     risk_params: {
//       stop_loss_pct: data.stopLossPct || 0,
//       take_profit_pct: data.takeProfitPct || 0,
//       max_position_pct: 1
//     },
//     timeframe: data.timeframe
//   };
// //   <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
// //   RUN BACKTEST
// // </Button>
// // runBacktest(payload);
// // console.log("Submitted to backend:", payload);
//     console.log("Submitting payload:", payload);
//     runBacktest(payload);

// //   runBacktest(payload);
// };
//     const onSubmit = (data: StrategyForm) => {
//   const payload = {
//     name: data.name,
//     asset_selection: {
//       symbols: data.symbols.map(s => s.replace('/', '')),
//       exchange: data.exchange.toLowerCase(),
//       market_type: data.marketType
//     },
//     entry_conditions: data.entryConditions.map(cond => ({
//       left: cond.left.toString(),
//       operator: cond.operator,
//       right: cond.right.toString()
//     })),
//     exit_conditions: data.exitConditions.map(cond => ({
//       left: cond.left.toString(),
//       operator: cond.operator,
//       right: cond.right.toString()
//     })),
//     execution_params: {
//       order_type: data.orderType,
//       quantity: 1,
//       fees_bps: data.feesBps,
//       slippage_bps: data.slippageBps,
//       portfolio_pct: 1
//     },
//     risk_params: {
//       stop_loss_pct: data.stopLossPct || 0.02,
//       take_profit_pct: data.takeProfitPct || 0.05,
//       max_position_pct: 1
//     },
//     timeframe: data.timeframe
//   };
  
//   console.log("Submitting payload:", payload);
//   runBacktest(payload);
// };
// const onSubmit = (data: StrategyForm) => {
//   // Build conditions as objects instead of arrays
//   const buildCondition = (condition: Condition) => {
//     return {
//       left: condition.left.toString(),
//       operator: condition.operator,
//       right: condition.right.toString()
//     };
//   };

//   const payload = {
//     name: data.name,
//     asset_selection: {
//       symbols: data.symbols.map(s => s.replace('/', '')),
//       exchange: data.exchange.toLowerCase(),
//       market_type: data.marketType
//     },
//     entry_conditions: data.entryConditions.length > 0 
//       ? buildCondition(data.entryConditions[0])
//       : null,
//     exit_conditions: data.exitConditions.length > 0 
//       ? buildCondition(data.exitConditions[0])
//       : null,
//     execution_params: {
//       order_type: data.orderType,
//       quantity: 1,
//       fees_bps: data.feesBps,
//       slippage_bps: data.slippageBps,
//       portfolio_pct: 1
//     },
//     risk_params: {
//       stop_loss_pct: data.stopLossPct || 0.02,
//       take_profit_pct: data.takeProfitPct || 0.05,
//       max_position_pct: 1
//     },
//     timeframe: data.timeframe
//   };
  
//   console.log("Submitting payload:", JSON.stringify(payload, null, 2));
//   runBacktest(payload);
// };
// const onSubmit = (data: StrategyForm) => {
//   const buildCondition = (condition: Condition) => ({
//     left:   condition.left.toString(),
//     operator: condition.operator,
//     right:  condition.right.toString(),
//   });

//   const payload = {
//     name: data.name,

//     // → match your Pydantic model’s camelCase
//     assetSelection: {
//       symbols:    data.symbols.map(s => s.replace('/', '')),
//       exchange:   data.exchange.toLowerCase(),
//       marketType: data.marketType,
//     },

//     timeframe: data.timeframe,             // ← don’t remove this!

//     // send full arrays, not single object or null
//     entryConditions: data.entryConditions.map(buildCondition),
//     exitConditions:  data.exitConditions .map(buildCondition),

//     executionParams: {
//       orderType:    data.orderType,
//       quantity:     1,
//       feesBps:      data.feesBps,
//       slippageBps:  data.slippageBps,
//       portfolioPct: 1,
//     },

//     riskParams: {
//       stopLossPct:    data.stopLossPct    || 0.02,
//       takeProfitPct:  data.takeProfitPct  || 0.05,
//       maxPositionPct: 1,
//     },
//   };

//   console.log("Submitting payload:", payload);
//   runBacktest(payload);
// };
// const onSubmit = (data: StrategyForm) => {
//   const buildCondition = (condition: Condition) => ({
//     left: condition.left.toString(),
//     operator: condition.operator,
//     right: condition.right.toString(),
//   });

//   const payload = {
//     name: data.name,

//     asset_selection: {
//       symbols: data.symbols.map(s => s.replace('/', '')),
//       exchange: data.exchange.toLowerCase(),
//       market_type: data.marketType,
//     },

//     timeframe: data.timeframe,

//     entry_conditions: data.entryConditions.length > 0
//       ? buildCondition(data.entryConditions[0])
//       : {
//           left: "0",
//           operator: ConditionOperator.EQ,
//           right: "0",
//         },  // default fallback, since null is not allowed

//     exit_conditions: data.exitConditions.length > 0
//       ? buildCondition(data.exitConditions[0])
//       : {
//           left: "0",
//           operator: ConditionOperator.EQ,
//           right: "0",
//         },

//     execution_params: {
//       order_type: data.orderType,
//       quantity: 1,
//       fees_bps: data.feesBps,
//       slippage_bps: data.slippageBps,
//       portfolio_pct: 1,
//     },

//     risk_params: {
//       stop_loss_pct: data.stopLossPct || 0.02,
//       take_profit_pct: data.takeProfitPct || 0.05,
//       max_position_pct: 1,
//     },
//   };

//   console.log("Submitting payload:", payload);
//   runBacktest(payload);
// };
// const onSubmit = async (data: StrategyForm) => {
//     const buildCondition = (condition: Condition) => ({
//     left: condition.left.toString(),
//     operator: condition.operator,
//     right: condition.right.toString(),
//   });
//   const payload = {
//     name: data.name,
//     asset_selection: {
//       symbols: data.symbols.map(s => s.replace('/', '')),
//       exchange: data.exchange.toLowerCase(),
//       market_type: data.marketType,
//     },
//     timeframe: data.timeframe,
//     // entryConditions: data.entryConditions.map(buildCondition),
//     // exitConditions: data.exitConditions.map(buildCondition),
//     entry_conditions: {
//   left: data.entryConditions[0].left.toString(),
//   operator: data.entryConditions[0].operator,
//   right: data.entryConditions[0].right.toString()
// },
// exit_conditions: {
//   left: data.exitConditions[0].left.toString(),
//   operator: data.exitConditions[0].operator,
//   right: data.exitConditions[0].right.toString()
// },


//     execution_params: {
//       order_type: data.orderType,
//       quantity: 1,
//       fees_bps: data.feesBps,
//       slippage_bps: data.slippageBps,
//       portfolio_pct: 1,
//     },
//     risk_params: {
//         stop_loss_pct: data.stopLossPct || 5,
//         take_profit_pct: data.takeProfitPct || 5,
//         max_position_pct: 1,
//     //   stopLossPct: data.stopLossPct || 5,
//     //   takeProfitPct: data.takeProfitPct || 5,
//     //   maxPositionPct: 1,
//     },
//   };

//   console.log("Submitting payload:", payload);
//   await runBacktest(payload);
//   navigate('/results'); // 👈 Redirects to the dashboard
// };

// const onSubmit = async (data: StrategyForm) => {
//   const payload = {
//     name: data.name,
//     assetSelection: {
//       symbols: data.symbols.map(s => s.replace('/', '')),
//       exchange: data.exchange.toLowerCase(),
//       marketType: data.marketType,
//     },
//     timeframe: data.timeframe,
//     entryConditions: {
//       left: data.entryConditions[0].left.toString(),
//       operator: data.entryConditions[0].operator,
//       right: data.entryConditions[0].right.toString()
//     },
//     exitConditions: {
//       left: data.exitConditions[0].left.toString(),
//       operator: data.exitConditions[0].operator,
//       right: data.exitConditions[0].right.toString()
//     },
//     executionParams: {
//       orderType: data.orderType,
//       quantity: 1,
//       feesBps: data.feesBps,
//       slippageBps: data.slippageBps,
//       portfolioPct: 1,
//     },
//     riskParams: {
//       stopLossPct: data.stopLossPct || 5,
//       takeProfitPct: data.takeProfitPct || 5,
//       maxPositionPct: 1,
//     },
//   };

//   console.log("Submitting payload:", payload);
//   await runBacktest(payload);
//   navigate('/results');
// };
// const parseOperand = (value: string | number) => {
//   return isNaN(Number(value)) ? value : Number(value);
// };
// const parseOperand = (value: string | number | Condition) => {
//   if (typeof value === 'string' || typeof value === 'number') {
//     return isNaN(Number(value)) ? value : Number(value);
//   }
//   return value; // already a nested Condition object
// };

const onSubmit = async (data: StrategyForm) => {
  const payload = {
    name: data.name,
    asset_selection: {
      symbols: data.symbols.map(s => s.replace('/', '')),
      exchange: data.exchange.toLowerCase(),
      market_type: data.marketType,
    },
    timeframe: data.timeframe,
    entry_conditions: {
        left: parseOperand(data.entryConditions[0].left),
        operator: data.entryConditions[0].operator,
        right: parseOperand(data.entryConditions[0].right)
    //   left: data.entryConditions[0].left.toString(),
    //   operator: data.entryConditions[0].operator,
    //   right: data.entryConditions[0].right.toString()
    },
    exit_conditions: {
    //   left: data.exitConditions[0].left.toString(),
    //   operator: data.exitConditions[0].operator,
    //   right: data.exitConditions[0].right.toString()
    left: parseOperand(data.exitConditions[0].left),
      operator: data.exitConditions[0].operator,
      right: parseOperand(data.exitConditions[0].right)
    },
    execution_params: {
      order_type: data.orderType,
      quantity: 1,
      fees_bps: data.feesBps,
      slippage_bps: data.slippageBps,
      portfolio_pct: 1,
    },
    risk_params: {
      stop_loss_pct: data.stopLossPct || 5,
      take_profit_pct: data.takeProfitPct || 5,
      max_position_pct: 1,
    },
  };

  console.log("Submitting payload:", payload);

  // ✅ MAKE SURE THIS IS payload, not data
//   await runBacktest(payload);
  const result = await runBacktest(payload);
  console.log("Backtest Result:", result);

  navigate('/results');
};
const parseOperand = (value: string | number | Condition) => {
  if (typeof value === 'string' || typeof value === 'number') {
    return isNaN(Number(value)) ? value : Number(value);
  }
  return value; // already a nested Condition object
};





    const addCondition = (isEntry: boolean) => {
        const newCondition: Condition = {
            id: uuidv4(),
            left: '',
            operator: ConditionOperator.GT,
            right: ''
        };

        if (isEntry) {
            appendEntry(newCondition);
        } else {
            appendExit(newCondition);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>Strategy Builder</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* General Settings */}
                <Accordion
                    expanded={expandedSection === 'general'}
                    onChange={handleAccordionChange('general')}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">General Settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <GridContainer spacing={3}>
                            <GridItem xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Strategy Name"
                                    {...register('name', {
                                        required: 'Strategy name is required',
                                        maxLength: {
                                            value: 50,
                                            message: 'Name must be less than 50 characters'
                                        }
                                    })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            </GridItem>

                            <GridItem xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Exchange</InputLabel>
                                    <Controller
                                        name="exchange"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                label="Exchange"
                                                {...field}
                                            >
                                                {Object.values(Exchange).map(ex => (
                                                    <MenuItem key={ex} value={ex}>{ex}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    multiline
                                    rows={3}
                                    {...register('description', {
                                        maxLength: {
                                            value: 500,
                                            message: 'Description must be less than 500 characters'
                                        }
                                    })}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                            </GridItem>

                            <GridItem xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Market Type</InputLabel>
                                    <Controller
                                        name="marketType"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                label="Market Type"
                                                {...field}
                                            >
                                                {Object.values(MarketType).map(mt => (
                                                    <MenuItem key={mt} value={mt}>{mt}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Timeframe</InputLabel>
                                    <Controller
                                        name="timeframe"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                label="Timeframe"
                                                {...field}
                                            >
                                                {timeframes.map(tf => (
                                                    <MenuItem key={tf.value} value={tf.value}>{tf.label}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem xs={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="symbols"
                                        control={control}
                                        render={({ field }) => (
                                            <Autocomplete
                                                multiple
                                                options={popularSymbols}
                                                freeSolo
                                                value={field.value}
                                                onChange={(_, newValue) => {
                                                    field.onChange(newValue);
                                                }}
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => (
                                                        <Chip
                                                            label={option}
                                                            {...getTagProps({ index })}
                                                            key={index}
                                                        />
                                                    ))
                                                }
                                                //renderInput={(params: AutocompleteRenderInputParams) => (
                                                //    <TextField
                                                //        {...params}
                                                //        label="Trading Pairs"
                                                //        placeholder="Add trading pair..."
                                                //        inputProps={{
                                                //            ...params.inputProps,
                                                //            autoComplete: 'off'
                                                //        }}
                                                //    />
                                                //)}
                                                //renderInput={(params: AutocompleteRenderInputParams) => (
                                                //    <TextField
                                                //        {...params}
                                                //        label="Trading Pairs"
                                                //        placeholder="Add trading pair..."
                                                //        inputRef={params.InputProps.ref}
                                                //        inputProps={{
                                                //            ...params.inputProps,
                                                //            autoComplete: 'off',
                                                //        }}
                                                //        // Add this to fix the ref type compatibility
                                                //        InputProps={{
                                                //            ...params.InputProps,
                                                //            ref: null as any, // Workaround for ref type issue
                                                //        }}
                                                //    />
                                                //)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Trading Pairs"
                                                        placeholder="Add trading pair..."
                                                        inputRef={params.InputProps.ref} // Fix ref forwarding
                                                        InputProps={{
                                                            ...params.InputProps,
                                                        }}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                    <FormHelperText>Add multiple trading pairs separated by comma</FormHelperText>
                                </FormControl>
                            </GridItem>
                        </GridContainer>
                    </AccordionDetails>
                </Accordion>

                {/* Entry Conditions */}
                <Accordion
                    expanded={expandedSection === 'entry'}
                    onChange={handleAccordionChange('entry')}
                    sx={{ mt: 2 }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Entry Conditions</Typography>
                        {entryFields.length > 0 && (
                            <Chip
                                label={`${entryFields.length} condition(s)`}
                                size="small"
                                sx={{ ml: 2 }}
                            />
                        )}
                    </AccordionSummary>
                    <AccordionDetails>
                        {entryFields.length === 0 && (
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                No entry conditions defined. Add at least one condition to enter trades.
                            </Typography>
                        )}

                        {entryFields.map((field, index) => (
                            <Box
                                key={field.id}
                                sx={{
                                    mb: 2,
                                    p: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    backgroundColor: 'background.paper'
                                }}
                            >
                                <GridContainer spacing={2} alignItems="center">
                                    {/* <GridItem xs={12} sm={5}>
                                        <TextField
                                            fullWidth
                                            label="Left Operand"
                                            {...register(`entryConditions.${index}.left`, { required: 'Required' })}
                                            error={!!errors.entryConditions?.[index]?.left}
                                            helperText={errors.entryConditions?.[index]?.left?.message}
                                        />
                                    </GridItem> */}
                                    {/* <GridItem xs={12} sm={5}>
                                        
  <TextField
    fullWidth
    label="Left Operand (e.g., price, indicator)"
    {...register(`entryConditions.${index}.left`, { 
      required: 'Required' 
    })}
  />
</GridItem> */}
<GridItem xs={12} sm={5}>
        <Controller
          name={`entryConditions.${index}.left`}
          control={control}
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Left Operand (e.g., price, indicator)"
              error={!!errors.entryConditions?.[index]?.left}
              helperText={errors.entryConditions?.[index]?.left?.message || " "}
            />
          )}
        />
      </GridItem>
                                    {/* <GridItem xs={12} sm={2}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name={`entryConditions.${index}.operator`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Select {...field}>
                                                        {Object.values(ConditionOperator).map(op => (
                                                            <MenuItem key={op} value={op}>{op}</MenuItem>
                                                        ))}
                                                    </Select>
                                                )}
                                            />
                                        </FormControl>
                                    </GridItem> */}
                                    <GridItem xs={12} sm={2}>
        <Controller
          name={`entryConditions.${index}.operator`}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <Select {...field}>
                {Object.values(ConditionOperator).map(op => (
                  <MenuItem key={op} value={op}>{op}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </GridItem>


                                    {/* <GridItem xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="Right Operand"
                                            {...register(`entryConditions.${index}.right`, { required: 'Required' })}
                                            error={!!errors.entryConditions?.[index]?.right}
                                            helperText={errors.entryConditions?.[index]?.right?.message}
                                        />
                                    </GridItem> */}
                                    {/* <GridItem xs={12} sm={4}>
  <TextField
    fullWidth
    label="Right Operand (e.g., 100, EMA(20))"
    {...register(`entryConditions.${index}.right`, { 
      required: 'Required' 
    })}
  />
</GridItem> */}
<GridItem xs={12} sm={4}>
        <Controller
          name={`entryConditions.${index}.right`}
          control={control}
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Right Operand (e.g., 100, EMA(20))"
              error={!!errors.entryConditions?.[index]?.right}
              helperText={errors.entryConditions?.[index]?.right?.message || " "}
            />
          )}
        />
      </GridItem>
                                    {/* <GridItem xs={12} sm={1}>
                                        <IconButton
                                            color="error"
                                            onClick={() => removeEntry(index)}
                                            sx={{ ml: 'auto' }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </GridItem>
                                </GridContainer>
                            </Box>
                        ))} */}
                        <GridItem xs={12} sm={1}>
        <IconButton
          color="error"
          onClick={() => removeEntry(index)}
          sx={{ ml: 'auto' }}
        >
          <DeleteIcon />
        </IconButton>
      </GridItem>
    </GridContainer>
  </Box>
))}

                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => addCondition(true)}
                            disabled={entryFields.length > 0} 
                            sx={{ mt: 1 }}
                        >
                            Add Entry Condition
                        </Button>
                    </AccordionDetails>
                </Accordion>

                {/* Exit Conditions */}
                <Accordion
                    expanded={expandedSection === 'exit'}
                    onChange={handleAccordionChange('exit')}
                    sx={{ mt: 2 }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Exit Conditions</Typography>
                        {exitFields.length > 0 && (
                            <Chip
                                label={`${exitFields.length} condition(s)`}
                                size="small"
                                sx={{ ml: 2 }}
                            />
                        )}
                    </AccordionSummary>
                    <AccordionDetails>
                        {exitFields.length === 0 && (
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                No exit conditions defined. Add conditions or use stop loss/take profit.
                            </Typography>
                        )}

                        {exitFields.map((field, index) => (
                            <Box
                                key={field.id}
                                sx={{
                                    mb: 2,
                                    p: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    backgroundColor: 'background.paper'
                                }}
                            >
                                <GridContainer spacing={2} alignItems="center">
                                    {/* <GridItem xs={12} sm={5}>
                                        <TextField
                                            fullWidth
                                            label="Left Operand"
                                            {...register(`exitConditions.${index}.left`, { required: 'Required' })}
                                            error={!!errors.exitConditions?.[index]?.left}
                                            helperText={errors.exitConditions?.[index]?.left?.message}
                                        />
                                    </GridItem> */}
                                    <GridItem xs={12} sm={5}>
        <Controller
          name={`exitConditions.${index}.left`}
          control={control}
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Left Operand (e.g., price, indicator)"
              error={!!errors.exitConditions?.[index]?.left}
              helperText={errors.exitConditions?.[index]?.left?.message || " "}
            />
          )}
        />
      </GridItem>

                                    {/* <GridItem xs={12} sm={2}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name={`exitConditions.${index}.operator`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Select {...field}>
                                                        {Object.values(ConditionOperator).map(op => (
                                                            <MenuItem key={op} value={op}>{op}</MenuItem>
                                                        ))}
                                                    </Select>
                                                )}
                                            />
                                        </FormControl>
                                    </GridItem> */}
                                    <GridItem xs={12} sm={2}>
        <Controller
          name={`exitConditions.${index}.operator`}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <Select {...field}>
                {Object.values(ConditionOperator).map(op => (
                  <MenuItem key={op} value={op}>{op}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </GridItem>

                                    {/* <GridItem xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="Right Operand"
                                            {...register(`exitConditions.${index}.right`, { required: 'Required' })}
                                            error={!!errors.exitConditions?.[index]?.right}
                                            helperText={errors.exitConditions?.[index]?.right?.message}
                                        />
                                    </GridItem> */}
                                          <GridItem xs={12} sm={4}>
        <Controller
          name={`exitConditions.${index}.right`}
          control={control}
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Right Operand (e.g., 100, EMA(20))"
              error={!!errors.exitConditions?.[index]?.right}
              helperText={errors.exitConditions?.[index]?.right?.message || " "}
            />
          )}
        />
      </GridItem>


                                    {/* <GridItem xs={12} sm={1}>
                                        <IconButton
                                            color="error"
                                            onClick={() => removeExit(index)}
                                            sx={{ ml: 'auto' }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </GridItem>
                                </GridContainer>
                            </Box>
                        ))} */}
                        <GridItem xs={12} sm={1}>
        <IconButton
          color="error"
          onClick={() => removeExit(index)}
          sx={{ ml: 'auto' }}
        >
          <DeleteIcon />
        </IconButton>
      </GridItem>
    </GridContainer>
  </Box>
))}

                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => addCondition(false)}
                            sx={{ mt: 1 }}
                        >
                            Add Exit Condition
                        </Button>
                    </AccordionDetails>
                </Accordion>

                {/* Execution Parameters */}
                <Accordion
                    expanded={expandedSection === 'execution'}
                    onChange={handleAccordionChange('execution')}
                    sx={{ mt: 2 }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Execution Parameters</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <GridContainer spacing={3}>
                            <GridItem xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Order Type</InputLabel>
                                    <Controller
                                        name="orderType"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                label="Order Type"
                                                {...field}
                                            >
                                                {Object.values(OrderType).map(ot => (
                                                    <MenuItem key={ot} value={ot}>{ot}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Fees (basis points)"
                                    type="number"
                                    InputProps={{
                                        endAdornment: (
                                            <Tooltip title="Exchange trading fees in basis points (1bp = 0.01%)">
                                                <HelpIcon color="action" sx={{ ml: 1 }} />
                                            </Tooltip>
                                        )
                                    }}
                                    {...register('feesBps', {
                                        valueAsNumber: true,
                                        min: { value: 0, message: 'Must be positive' },
                                        max: { value: 100, message: 'Must be less than 100bps' }
                                    })}
                                    error={!!errors.feesBps}
                                    helperText={errors.feesBps?.message}
                                />
                            </GridItem>

                            <GridItem xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Slippage (basis points)"
                                    type="number"
                                    InputProps={{
                                        endAdornment: (
                                            <Tooltip title="Expected slippage per trade in basis points (1bp = 0.01%)">
                                                <HelpIcon color="action" sx={{ ml: 1 }} />
                                            </Tooltip>
                                        )
                                    }}
                                    {...register('slippageBps', {
                                        valueAsNumber: true,
                                        min: { value: 0, message: 'Must be positive' },
                                        max: { value: 100, message: 'Must be less than 100bps' }
                                    })}
                                    error={!!errors.slippageBps}
                                    helperText={errors.slippageBps?.message}
                                />
                            </GridItem>
                        </GridContainer>
                    </AccordionDetails>
                </Accordion>

                {/* Risk Management */}
                <Accordion
                    expanded={expandedSection === 'risk'}
                    onChange={handleAccordionChange('risk')}
                    sx={{ mt: 2 }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Risk Management</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <GridContainer spacing={3}>
                            <GridItem xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Stop Loss (%)"
                                    type="number"
                                    InputProps={{
                                        inputProps: { min: 0, max: 100, step: 0.1 },
                                        endAdornment: (
                                            <Tooltip title="Percentage below entry price to exit trade">
                                                <HelpIcon color="action" sx={{ ml: 1 }} />
                                            </Tooltip>
                                        )
                                    }}
                                    {...register('stopLossPct', {
                                        valueAsNumber: true,
                                        min: { value: 0, message: 'Must be positive' },
                                        max: { value: 100, message: 'Must be less than 100%' }
                                    })}
                                    error={!!errors.stopLossPct}
                                    helperText={errors.stopLossPct?.message}
                                />
                            </GridItem>

                            <GridItem xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Take Profit (%)"
                                    type="number"
                                    InputProps={{
                                        inputProps: { min: 0, step: 0.1 },
                                        endAdornment: (
                                            <Tooltip title="Percentage above entry price to exit trade">
                                                <HelpIcon color="action" sx={{ ml: 1 }} />
                                            </Tooltip>
                                        )
                                    }}
                                    {...register('takeProfitPct', {
                                        valueAsNumber: true,
                                        min: { value: 0, message: 'Must be positive' }
                                    })}
                                    error={!!errors.takeProfitPct}
                                    helperText={errors.takeProfitPct?.message}
                                />
                            </GridItem>

                            <GridItem xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Trailing Stop (%)"
                                    type="number"
                                    InputProps={{
                                        inputProps: { min: 0, max: 100, step: 0.1 },
                                        endAdornment: (
                                            <Tooltip title="Percentage below highest price to exit trade">
                                                <HelpIcon color="action" sx={{ ml: 1 }} />
                                            </Tooltip>
                                        )
                                    }}
                                    {...register('trailingStopPct', {
                                        valueAsNumber: true,
                                        min: { value: 0, message: 'Must be positive' },
                                        max: { value: 100, message: 'Must be less than 100%' }
                                    })}
                                    error={!!errors.trailingStopPct}
                                    helperText={errors.trailingStopPct?.message}
                                />
                            </GridItem>
                        </GridContainer>
                    </AccordionDetails>
                </Accordion>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        sx={{ minWidth: 200 }}
                    >
                        Run Backtest
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default StrategyBuilder;