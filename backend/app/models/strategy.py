# from enum import Enum
# from pydantic import BaseModel
# from typing import List, Optional, Union
# from datetime import datetime

# class MarketType(str, Enum):
#     SPOT = "spot"
#     PERPETUAL = "perpetual"
#     FUTURES = "futures"
#     OPTIONS = "options"

# class Exchange(str, Enum):
#     BINANCE = "binance"
#     COINBASE = "coinbase"
#     KRAKEN = "kraken"
#     FTX = "ftx"

# class OrderType(str, Enum):
#     MARKET = "market"
#     LIMIT = "limit"

# class IndicatorType(str, Enum):
#     EMA = "ema"
#     RSI = "rsi"
#     MACD = "macd"

# class ConditionOperator(str, Enum):
#     GT = ">"
#     LT = "<"
#     EQ = "="
#     GTE = ">="
#     LTE = "<="
#     AND = "AND"
#     OR = "OR"
#     NOT = "NOT"

# class AssetSelection(BaseModel):
#     symbols: List[str]
#     exchange: Exchange
#     market_type: MarketType

# class IndicatorConfig(BaseModel):
#     type: IndicatorType
#     params: dict
#     lookback: int

# class Condition(BaseModel):
#     left: Union['Condition', IndicatorConfig, float]
#     operator: ConditionOperator
#     right: Union['Condition', IndicatorConfig, float]

# class ExecutionParams(BaseModel):
#     order_type: OrderType
#     fees_bps: float = 5.0  # 0.05%
#     slippage_bps: float = 10.0  # 0.1%
#     quantity: Optional[float] = None
#     portfolio_pct: Optional[float] = None

# class RiskParams(BaseModel):
#     stop_loss_pct: Optional[float] = None
#     take_profit_pct: Optional[float] = None
#     max_position_pct: Optional[float] = None

# class StrategyConfig(BaseModel):
#     name: str
#     asset_selection: AssetSelection
#     entry_conditions: Condition
#     exit_conditions: Condition
#     execution_params: ExecutionParams
#     risk_params: RiskParams
#     timeframe: str = "1d"

from datetime import datetime
from enum import Enum
from typing import List, Optional, Union

from pydantic import BaseModel


class MarketType(str, Enum):
    SPOT = "spot"
    PERPETUAL = "perpetual"
    FUTURES = "futures"
    OPTIONS = "options"

class Exchange(str, Enum):
    BINANCE = "binance"
    COINBASE = "coinbase"
    KRAKEN = "kraken"
    FTX = "ftx"

class OrderType(str, Enum):
    MARKET = "market"
    LIMIT = "limit"

class IndicatorType(str, Enum):
    EMA = "ema"
    RSI = "rsi"
    MACD = "macd"

class ConditionOperator(str, Enum):
    GT = ">"
    LT = "<"
    EQ = "="
    GTE = ">="
    LTE = "<="
    AND = "AND"
    OR = "OR"
    NOT = "NOT"

class AssetSelection(BaseModel):
    symbols: List[str]
    exchange: Exchange
    market_type: MarketType

class IndicatorConfig(BaseModel):
    type: IndicatorType
    params: dict
    lookback: int

class Condition(BaseModel):
    left: Union['Condition', IndicatorConfig, float, str]
    operator: ConditionOperator
    right: Union['Condition', IndicatorConfig, float, str]

class ExecutionParams(BaseModel):
    order_type: OrderType
    fees_bps: float = 5.0  # 0.05%
    slippage_bps: float = 10.0  # 0.1%
    quantity: Optional[float] = None
    portfolio_pct: Optional[float] = None

class RiskParams(BaseModel):
    stop_loss_pct: Optional[float] = None
    take_profit_pct: Optional[float] = None
    max_position_pct: Optional[float] = None

class StrategyConfig(BaseModel):
    name: str
    asset_selection: AssetSelection
    entry_conditions: Condition
    exit_conditions: Condition
    execution_params: ExecutionParams
    risk_params: RiskParams
    timeframe: str = "1d"

    class Config:
        allow_population_by_field_name = True