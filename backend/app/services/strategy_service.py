# import pandas as pd
# import numpy as np
# import talib
# from typing import List, Optional
# from datetime import datetime
# from app.models.strategy import *
# from app.models.data import OHLCV
# from sqlalchemy.orm import Session

# class StrategyService:
#     def __init__(self, db: Session):
#         self.db = db
    
#     def calculate_indicators(self, df: pd.DataFrame, indicator: IndicatorConfig) -> pd.Series:
#         if indicator.type == IndicatorType.EMA:
#             period = indicator.params.get('period', 20)
#             return talib.EMA(df['close'], timeperiod=period)
#         elif indicator.type == IndicatorType.RSI:
#             period = indicator.params.get('period', 14)
#             return talib.RSI(df['close'], timeperiod=period)
#         elif indicator.type == IndicatorType.MACD:
#             fast = indicator.params.get('fast', 12)
#             slow = indicator.params.get('slow', 26)
#             signal = indicator.params.get('signal', 9)
#             macd, signal, _ = talib.MACD(df['close'], fastperiod=fast, slowperiod=slow, signalperiod=signal)
#             return macd - signal  # MACD histogram
#         else:
#             raise ValueError(f"Unsupported indicator type: {indicator.type}")

#     def evaluate_condition(self, df: pd.DataFrame, condition: Condition) -> pd.Series:
#         left = self.evaluate_operand(df, condition.left)
#         right = self.evaluate_operand(df, condition.right)
        
#         if condition.operator == ConditionOperator.GT:
#             return left > right
#         elif condition.operator == ConditionOperator.LT:
#             return left < right
#         elif condition.operator == ConditionOperator.EQ:
#             return left == right
#         elif condition.operator == ConditionOperator.GTE:
#             return left >= right
#         elif condition.operator == ConditionOperator.LTE:
#             return left <= right
#         elif condition.operator == ConditionOperator.AND:
#             return left & right
#         elif condition.operator == ConditionOperator.OR:
#             return left | right
#         elif condition.operator == ConditionOperator.NOT:
#             return ~left
#         else:
#             raise ValueError(f"Unsupported operator: {condition.operator}")

#     def evaluate_operand(self, df: pd.DataFrame, operand: Union[Condition, IndicatorConfig, float]) -> pd.Series:
#         if isinstance(operand, Condition):
#             return self.evaluate_condition(df, operand)
#         elif isinstance(operand, IndicatorConfig):
#             return self.calculate_indicators(df, operand)
#         elif isinstance(operand, (int, float)):
#             return pd.Series(operand, index=df.index)
#         else:
#             raise ValueError(f"Unsupported operand type: {type(operand)}")

#     def backtest_strategy(self, config: StrategyConfig) -> dict:
#         # Get OHLCV data
#         ohlcv = self.db.query(OHLCV).filter(
#             OHLCV.symbol.in_(config.asset_selection.symbols),
#             OHLCV.exchange == config.asset_selection.exchange,
#             OHLCV.market_type == config.asset_selection.market_type
#         ).order_by(OHLCV.timestamp).all()
        
#         if not ohlcv:
#             return {"error": "No data found for the given parameters"}
        
#         # Convert to DataFrame
#         df = pd.DataFrame([{
#             'timestamp': o.timestamp,
#             'open': o.open,
#             'high': o.high,
#             'low': o.low,
#             'close': o.close,
#             'volume': o.volume
#         } for o in ohlcv])
        
#         df.set_index('timestamp', inplace=True)
        
#         # Calculate conditions
#         entry_signal = self.evaluate_condition(df, config.entry_conditions)
#         exit_signal = self.evaluate_condition(df, config.exit_conditions)
        
#         # Generate trades
#         trades = self.generate_trades(df, entry_signal, exit_signal, config)
        
#         # Calculate performance metrics
#         metrics = self.calculate_performance_metrics(trades, df, config)
        
#         return {
#             "trades": trades,
#             "metrics": metrics,
#             "signals": {
#                 "entry": entry_signal.tolist(),
#                 "exit": exit_signal.tolist()
#             }
#         }
    
#     def generate_trades(self, df: pd.DataFrame, entry_signal: pd.Series, exit_signal: pd.Series, config: StrategyConfig) -> List[dict]:
#         # Implement trade generation logic
#         pass
    
#     def calculate_performance_metrics(self, trades: List[dict], df: pd.DataFrame, config: StrategyConfig) -> dict:
#         # Implement performance calculation logic
#         pass

from datetime import datetime
from typing import List, Optional

import numpy as np
import pandas as pd
import talib
from app.models.data import OHLCV
from app.models.strategy import *
from sqlalchemy.orm import Session


class StrategyService:
    def __init__(self, db: Session):
        self.db = db
    
    def calculate_indicators(self, df: pd.DataFrame, indicator: IndicatorConfig) -> pd.Series:
        if indicator.type == IndicatorType.EMA:
            period = indicator.params.get('period', 20)
            return talib.EMA(df['close'], timeperiod=period)
        elif indicator.type == IndicatorType.RSI:
            period = indicator.params.get('period', 14)
            return talib.RSI(df['close'], timeperiod=period)
        elif indicator.type == IndicatorType.MACD:
            fast = indicator.params.get('fast', 12)
            slow = indicator.params.get('slow', 26)
            signal = indicator.params.get('signal', 9)
            macd, signal, _ = talib.MACD(df['close'], fastperiod=fast, slowperiod=slow, signalperiod=signal)
            return macd - signal  # MACD histogram
        else:
            raise ValueError(f"Unsupported indicator type: {indicator.type}")

    def evaluate_condition(self, df: pd.DataFrame, condition: Condition) -> pd.Series:
        left = self.evaluate_operand(df, condition.left)
        right = self.evaluate_operand(df, condition.right)
        
        if condition.operator == ConditionOperator.GT:
            return left > right
        elif condition.operator == ConditionOperator.LT:
            return left < right
        elif condition.operator == ConditionOperator.EQ:
            return left == right
        elif condition.operator == ConditionOperator.GTE:
            return left >= right
        elif condition.operator == ConditionOperator.LTE:
            return left <= right
        elif condition.operator == ConditionOperator.AND:
            return left & right
        elif condition.operator == ConditionOperator.OR:
            return left | right
        elif condition.operator == ConditionOperator.NOT:
            return ~left
        else:
            raise ValueError(f"Unsupported operator: {condition.operator}")

    # def evaluate_operand(self, df: pd.DataFrame, operand: Union[Condition, IndicatorConfig, float]) -> pd.Series:
    #     if isinstance(operand, Condition):
    #         return self.evaluate_condition(df, operand)
    #     elif isinstance(operand, IndicatorConfig):
    #         return self.calculate_indicators(df, operand)
    #     elif isinstance(operand, (int, float)):
    #         return pd.Series(operand, index=df.index)
    #     else:
    #         raise ValueError(f"Unsupported operand type: {type(operand)}")

    def evaluate_operand(self, df: pd.DataFrame, operand: Union[Condition, IndicatorConfig, float]) -> pd.Series:
        if isinstance(operand, Condition):
            return self.evaluate_condition(df, operand)
        elif isinstance(operand, IndicatorConfig):
            return self.calculate_indicators(df, operand)
        elif isinstance(operand, (int, float)):
            return pd.Series(operand, index=df.index)
        elif isinstance(operand, str):  # ✅ NEW: handle strings
            if operand in df.columns:
                return df[operand]  # e.g., "price" → df["price"]
            try:
                return pd.Series(float(operand), index=df.index)
            except ValueError:
                raise ValueError(f"String operand '{operand}' is not a column and not a number.")
        else:
            raise ValueError(f"Unsupported operand type: {type(operand)}")


    def backtest_strategy(self, config: StrategyConfig) -> dict:
        # Get OHLCV data
        ohlcv = self.db.query(OHLCV).filter(
            OHLCV.symbol.in_(config.asset_selection.symbols),
            OHLCV.exchange == config.asset_selection.exchange,
            OHLCV.market_type == config.asset_selection.market_type
        ).order_by(OHLCV.timestamp).all()
        
        if not ohlcv:
            return {"error": "No data found for the given parameters"}
        
        # Convert to DataFrame
        df = pd.DataFrame([{
            'timestamp': o.timestamp,
            'open': o.open,
            'high': o.high,
            'low': o.low,
            'close': o.close,
            'volume': o.volume
        } for o in ohlcv])
        
        df.set_index('timestamp', inplace=True)
        df['price'] = df['close']  # 👈 add this before evaluating any conditions

        
        # Calculate conditions
        entry_signal = self.evaluate_condition(df, config.entry_conditions)
        exit_signal = self.evaluate_condition(df, config.exit_conditions)
        
        # Generate trades
        trades = self.generate_trades(df, entry_signal, exit_signal, config)
        
        # Calculate performance metrics
        metrics = self.calculate_performance_metrics(trades, df, config)

        print("=== BACKTEST RESULT ===")
        print("Trades:", trades)
        print("Metrics:", metrics)
        print("Entry Signals (sample):", entry_signal.head().tolist())
        print("Exit Signals (sample):", exit_signal.head().tolist())

        
        return {
            "trades": trades,
            "metrics": metrics,
            "signals": {
                "entry": entry_signal.tolist(),
                "exit": exit_signal.tolist()
            }
        }
        # results = {
        #     "trades": [
        #         {
        #             "entry_time": "2024-01-01 00:00:00",
        #             "exit_time": "2024-01-06 00:00:00",
        #             "entry_price": 42800.0,
        #             "exit_price": 43900.0,
        #             "profit": 1100.0
        #         }
        #     ],
        #     "metrics": {
        #         "total_trades": 1,
        #         "total_profit": 1100.0,
        #         "win_rate": 1.0,
        #         "average_profit": 1100.0
        #     }
        # }

        # trades = [{
        #     "id": str(i),
        #     "entryTime": str(t["entry_time"]),
        #     "exitTime": str(t["exit_time"]),
        #     "entryPrice": t["entry_price"],
        #     "exitPrice": t["exit_price"],
        #     "pnl": t["profit"],
        #     "pnlPercent": (t["profit"] / t["entry_price"]) * 100,
        #     "symbol": config.asset_selection.symbols[0],
        # } for i, t in enumerate(results["trades"])]

        # return {
        #     "trades": trades,
        #     "startTime": str(trades[0]["entryTime"]) if trades else None,
        #     "endTime": str(trades[-1]["exitTime"]) if trades else None,
        #     "initialBalance": 100000,
        #     "finalBalance": 100000 + sum(t["pnl"] for t in trades)
        # }

    
    
    # def generate_trades(self, df: pd.DataFrame, entry_signal: pd.Series, exit_signal: pd.Series, config: StrategyConfig) -> List[dict]:
    #     # Implement trade generation logic
    #     pass
    def generate_trades(self, df: pd.DataFrame, entry_signal: pd.Series, exit_signal: pd.Series, config: StrategyConfig) -> List[dict]:
        in_position = False
        entry_price = 0
        trades = []

        for i in range(len(df)):
            if not in_position and entry_signal.iloc[i]:
                entry_price = df['close'].iloc[i]
                entry_time = df.index[i]
                in_position = True
            elif in_position and exit_signal.iloc[i]:
                exit_price = df['close'].iloc[i]
                exit_time = df.index[i]
                trades.append({
                    "entry_time": str(entry_time),
                    "exit_time": str(exit_time),
                    "entry_price": float(entry_price),
                    "exit_price": float(exit_price),
                    "profit": float(exit_price - entry_price)
                })
                in_position = False

        return trades

    
    # def calculate_performance_metrics(self, trades: List[dict], df: pd.DataFrame, config: StrategyConfig) -> dict:
    #     # Implement performance calculation logic
    #     pass
    def calculate_performance_metrics(self, trades: List[dict], df: pd.DataFrame, config: StrategyConfig) -> dict:
        if not trades:
            return {}

        total_profit = sum(t['profit'] for t in trades)
        win_trades = [t for t in trades if t['profit'] > 0]
        loss_trades = [t for t in trades if t['profit'] <= 0]
    
        return {
            "total_trades": len(trades),
            "total_profit": total_profit,
            "win_rate": len(win_trades) / len(trades),
            "average_profit": total_profit / len(trades)
    }
