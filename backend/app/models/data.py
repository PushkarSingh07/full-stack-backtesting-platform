# from sqlalchemy import Column, Integer, String, Float, DateTime
# from sqlalchemy.ext.declarative import declarative_base

# Base = declarative_base()

# class OHLCV(Base):
#     __tablename__ = "ohlcv"
    
#     id = Column(Integer, primary_key=True, index=True)
#     symbol = Column(String, index=True)
#     exchange = Column(String, index=True)
#     timestamp = Column(DateTime, index=True)
#     open = Column(Float)
#     high = Column(Float)
#     low = Column(Float)
#     close = Column(Float)
#     volume = Column(Float)
#     market_type = Column(String)  # spot/perpetual/futures/options

from sqlalchemy import Column, DateTime, Float, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class OHLCV(Base):
    __tablename__ = "ohlcv"
    
    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, index=True)
    exchange = Column(String, index=True)
    timestamp = Column(DateTime, index=True)
    open = Column(Float)
    high = Column(Float)
    low = Column(Float)
    close = Column(Float)
    volume = Column(Float)
    market_type = Column(String)  # spot/perpetual/futures/options