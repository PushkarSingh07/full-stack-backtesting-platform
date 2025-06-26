# import pandas as pd
# from fastapi import HTTPException
# from sqlalchemy.orm import Session
# from datetime import datetime
# from typing import List, Optional
# from app.models.data import OHLCV

# class DataService:
#     def __init__(self, db: Session):
#         self.db = db

#     def load_data(self, file_path: str, symbol: str, exchange: str, market_type: str):
#         try:
#             df = pd.read_csv(file_path)
#             df['timestamp'] = pd.to_datetime(df['timestamp'])
            
#             records = []
#             for _, row in df.iterrows():
#                 record = OHLCV(
#                     symbol=symbol,
#                     exchange=exchange,
#                     market_type=market_type,
#                     timestamp=row['timestamp'],
#                     open=row['open'],
#                     high=row['high'],
#                     low=row['low'],
#                     close=row['close'],
#                     volume=row['volume']
#                 )
#                 records.append(record)
            
#             self.db.bulk_save_objects(records)
#             self.db.commit()
#             return {"message": f"Successfully loaded {len(records)} records"}
        
#         except Exception as e:
#             self.db.rollback()
#             raise HTTPException(status_code=500, detail=str(e))

#     def get_ohlcv(
#         self, 
#         symbol: str, 
#         exchange: str, 
#         start_date: Optional[datetime] = None,
#         end_date: Optional[datetime] = None,
#         market_type: Optional[str] = None,
#         limit: int = 1000
#     ) -> List[OHLCV]:
#         query = self.db.query(OHLCV).filter(
#             OHLCV.symbol == symbol,
#             OHLCV.exchange == exchange
#         )
        
#         if market_type:
#             query = query.filter(OHLCV.market_type == market_type)
#         if start_date:
#             query = query.filter(OHLCV.timestamp >= start_date)
#         if end_date:
#             query = query.filter(OHLCV.timestamp <= end_date)
            
#         return query.order_by(OHLCV.timestamp).limit(limit).all()

from datetime import datetime
from typing import List, Optional

import pandas as pd
from app.models.data import OHLCV
from fastapi import HTTPException
from sqlalchemy.orm import Session


class DataService:
    def __init__(self, db: Session):
        self.db = db
    
    def load_data(self, file_path: str, symbol: str, exchange: str, market_type: str):
        try:
            df = pd.read_csv(file_path, skiprows=1)
            print("Columns:", df.columns.tolist())
            # print(df['timestamp'].head())           # Check values
            # print(type(df['timestamp'].iloc[0]))    # Should show: <class 'pandas._libs.tslibs.timestamps.Timestamp'>
            # print("Timestamp type:", type(df['timestamp'].iloc[0]))
            df.rename(columns={
                'Open': 'open',
                'High': 'high',
                'Low': 'low',
                'Close': 'close',
                'Volume USDT': 'volume',
                'date': 'timestamp',  # only if present
                'Timestamp': 'timestamp'
            }, inplace=True)
            
            df['timestamp'] = pd.to_datetime(df['timestamp'], format="%d-%m-%Y", dayfirst=True)
                # If timestamp isn't lowercase yet
            # if 'timestamp' not in df.columns and 'Timestamp' in df.columns:
            #     df.rename(columns={'Timestamp': 'timestamp'}, inplace=True)

            #     # df['timestamp'] = pd.to_datetime(df['timestamp'], dayfirst=True)
            #     df['timestamp'] = pd.to_datetime(df['timestamp'], format="%d-%m-%Y", dayfirst=True)

            # df.rename(columns={
            #     'date': 'timestamp',
            #     'Volume USDT': 'volume'
            # }, inplace=True)
            # df['timestamp'] = pd.to_datetime(df['timestamp'], dayfirst=True)

            # df = pd.read_csv(file_path)
            # df = pd.read_csv(file_path, skiprows=1)  # ✅ Skips the Binance comment
            # df['timestamp'] = pd.to_datetime(df['timestamp'])

            # df['timestamp'] = pd.to_datetime(df['timestamp'])
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
            # records = []
            # for _, row in df.iterrows():
            #     record = OHLCV(
            #         symbol=symbol,
            #         exchange=exchange,
            #         market_type=market_type,
            #         timestamp=row['timestamp'],
            #         open=row['open'],
            #         high=row['high'],
            #         low=row['low'],
            #         close=row['close'],
            #         volume=row['volume']
            #     )
            #     records.append(record)
            
            self.db.bulk_save_objects(records)
            self.db.commit()
            return {"message": f"Successfully loaded {len(records)} records"}
        
        except Exception as e:
            self.db.rollback()
            print("Error loading data:", str(e))
            raise HTTPException(status_code=500, detail=str(e))

    def get_ohlcv(
        self, 
        symbol: str, 
        exchange: str, 
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
        market_type: Optional[str] = None,
        limit: int = 1000
    ) -> List[OHLCV]:
        query = self.db.query(OHLCV).filter(
            OHLCV.symbol == symbol,
            OHLCV.exchange == exchange
        )
        
        if market_type:
            query = query.filter(OHLCV.market_type == market_type)
        if start_date:
            query = query.filter(OHLCV.timestamp >= start_date)
        if end_date:
            query = query.filter(OHLCV.timestamp <= end_date)
            
        return query.order_by(OHLCV.timestamp).limit(limit).all()