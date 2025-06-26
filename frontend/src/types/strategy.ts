export enum MarketType {
    SPOT = "spot",
    PERPETUAL = "perpetual",
    FUTURES = "futures",
    OPTIONS = "options"
}

export enum Exchange {
    BINANCE = "binance",
    COINBASE = "coinbase",
    KRAKEN = "kraken",
    FTX = "ftx"
}

export enum OrderType {
    MARKET = "market",
    LIMIT = "limit"
}

export enum IndicatorType {
    EMA = "ema",
    RSI = "rsi",
    MACD = "macd"
}

export enum ConditionOperator {
    GT = ">",
    LT = "<",
    EQ = "=",
    GTE = ">=",
    LTE = "<=",
    AND = "AND",
    OR = "OR",
    NOT = "NOT"
}

export interface StrategyConfig {
    name: string;
    assetSelection: {
        symbols: string[];
        exchange: Exchange;
        marketType: MarketType;
    };
    timeframe: string;
    // Add other strategy config properties as needed
}