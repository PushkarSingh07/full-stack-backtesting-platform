# from fastapi import FastAPI, Depends, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session
# from typing import List
# from datetime import datetime

# from app.models.data import OHLCV
# from app.models.strategy import StrategyConfig
# from app.services.data_service import DataService
# from app.services.strategy_service import StrategyService
# from app.api.database import SessionLocal, engine
# from app.models.data import Base

# Base.metadata.create_all(bind=engine)

# app = FastAPI(title="Backtesting Platform API")

# # CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Dependency
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @app.post("/api/data/load")
# async def load_data(file_path: str, symbol: str, exchange: str, market_type: str, db: Session = Depends(get_db)):
#     data_service = DataService(db)
#     return data_service.load_data(file_path, symbol, exchange, market_type)

# @app.get("/api/data/ohlcv")
# async def get_ohlcv(
#     symbol: str,
#     exchange: str,
#     start_date: datetime = None,
#     end_date: datetime = None,
#     market_type: str = None,
#     limit: int = 1000,
#     db: Session = Depends(get_db)
# ):
#     data_service = DataService(db)
#     return data_service.get_ohlcv(symbol, exchange, start_date, end_date, market_type, limit)

# @app.post("/api/strategies/backtest")
# async def backtest_strategy(config: StrategyConfig, db: Session = Depends(get_db)):
#     strategy_service = StrategyService(db)
#     return strategy_service.backtest_strategy(config)

# # WebSocket endpoint for real-time updates would go here

# from datetime import datetime
# from typing import List

# from app.api.database import SessionLocal, engine
# from app.models.data import OHLCV, Base
# from app.models.strategy import StrategyConfig
# from app.services.data_service import DataService
# from app.services.strategy_service import StrategyService
# from fastapi import Depends, FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session

# Base.metadata.create_all(bind=engine)

# app = FastAPI(title="Backtesting Platform API")

# # CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Dependency
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # @app.post("/api/data/load")
# # async def load_data(file_path: str, symbol: str, exchange: str, market_type: str, db: Session = Depends(get_db)):
# #     data_service = DataService(db)
# #     return data_service.load_data(file_path, symbol, exchange, market_type)

# from fastapi import Query

# @app.post("/api/data/load")
# async def load_data(
#     file_path: str = Query(..., description="Full path to the CSV file"),
#     symbol: str = Query(..., description="Trading symbol, e.g., BTCUSDT"),
#     exchange: str = Query(..., description="Exchange name, e.g., Binance"),
#     market_type: str = Query(..., description="Market type, e.g., spot"),
#     db: Session = Depends(get_db)
# ):


# @app.get("/api/data/ohlcv")
# async def get_ohlcv(
#     symbol: str,
#     exchange: str,
#     start_date: datetime = None,
#     end_date: datetime = None,
#     market_type: str = None,
#     limit: int = 1000,
#     db: Session = Depends(get_db)
# ):
#     data_service = DataService(db)
#     return data_service.get_ohlcv(symbol, exchange, start_date, end_date, market_type, limit)

# @app.post("/api/strategies/backtest")
# async def backtest_strategy(config: StrategyConfig, db: Session = Depends(get_db)):
#     strategy_service = StrategyService(db)
#     return strategy_service.backtest_strategy(config)

# # WebSocket endpoint for real-time updates would go here

# # from app.api.database import SessionLocal
# # from app.services.data_service import DataService
# # from fastapi import Depends, FastAPI
# # from sqlalchemy.orm import Session

# # app = FastAPI()

# # def get_db():
# #     db = SessionLocal()
# #     try:
# #         yield db
# #     finally:
# #         db.close()

# # @app.post("/load-data/")
# # def load_ohlcv(db: Session = Depends(get_db)):
# #     service = DataService(db)
# #     file_path = "data/btcusdt.csv"
# #     return service.load_data(
# #         file_path=file_path,
# #         symbol="BTCUSDT",
# #         exchange="Binance",
# #         market_type="spot"
# #     )
from datetime import datetime
from typing import List

from app.api.database import SessionLocal, engine
from app.models.data import OHLCV, Base
from app.models.strategy import StrategyConfig
from app.services.data_service import DataService
from app.services.strategy_service import StrategyService
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(title="Backtesting Platform API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint: Load OHLCV data from CSV
from fastapi import File, Form, UploadFile


@app.post("/api/data/load")
async def load_data(
    file: UploadFile = File(...),
    symbol: str = Form(...),
    exchange: str = Form(...),
    market_type: str = Form(...),
    db: Session = Depends(get_db)
):
    import io

    import pandas as pd

    contents = await file.read()
    df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

    df.rename(columns={
        'Open': 'open',
        'High': 'high',
        'Low': 'low',
        'Close': 'close',
        'Volume USDT': 'volume',
        'date': 'timestamp',
        'Timestamp': 'timestamp'
    }, inplace=True)

    df['timestamp'] = pd.to_datetime(df['timestamp'], format="%d-%m-%Y", dayfirst=True)

    # Use your working method to insert data
    records = [
        OHLCV(
            symbol=symbol,
            exchange=exchange,
            market_type=market_type,
            timestamp=row['timestamp'],
            open=row['open'],
            high=row['high'],
            low=row['low'],
            close=row['close'],
            volume=row['volume']
        )
        for _, row in df.iterrows()
    ]

    db.bulk_save_objects(records)
    db.commit()
    return {"message": f"Successfully loaded {len(records)} records"}
    # data_service = DataService(db)
    # return data_service.load_from_dataframe(df, symbol, exchange, market_type)

# @app.post("/api/data/load")
# async def load_data(
#     file_path: str = Query(..., description="Full path to the CSV file"),
#     symbol: str = Query(..., description="Trading symbol, e.g., BTCUSDT"),
#     exchange: str = Query(..., description="Exchange name, e.g., Binance"),
#     market_type: str = Query(..., description="Market type, e.g., spot"),
#     db: Session = Depends(get_db)
# ):
#     data_service = DataService(db)
#     return data_service.load_data(file_path, symbol, exchange, market_type)

# Endpoint: Retrieve OHLCV data
@app.get("/api/data/ohlcv")
async def get_ohlcv(
    symbol: str,
    exchange: str,
    start_date: datetime = None,
    end_date: datetime = None,
    market_type: str = None,
    limit: int = 1000,
    db: Session = Depends(get_db)
):
    data_service = DataService(db)
    return data_service.get_ohlcv(symbol, exchange, start_date, end_date, market_type, limit)

# Endpoint: Run strategy backtest
@app.post("/api/strategies/backtest")
async def backtest_strategy(config: StrategyConfig, db: Session = Depends(get_db)):
    strategy_service = StrategyService(db)
    return strategy_service.backtest_strategy(config)
