# Full-Stack Backtesting Platform

A robust backtesting platform with a visual strategy builder and performance analytics dashboard, designed for quantitative trading strategy simulation.

## 🚀 Features

- 📈 Strategy Builder with drag-and-drop interface
- ⚙️ Modular strategy configuration (EMA, RSI, MACD, logical conditions, execution types)
- 🧠 Risk management options (SL, TP, slippage, fees)
- 📊 Performance metrics dashboard (PnL, Sharpe, Drawdown, etc.)
- 🔁 Real-time backtest updates and visual feedback
- 🌐 FastAPI backend + React/TypeScript frontend

---



---

## ⚙️ Setup Instructions

### 1. Clone the Repository

git clone https://github.com/PushkarSingh07/full-stack-backtesting-platform.git
cd full-stack-backtesting-platform


2. Backend Setup (FastAPI)
cd backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run the API server
uvicorn app.main:app --reload

Now, open this link
http://127.0.0.1:8000/docs

SQLite is used for local OHLCV storage

Load OHLCV using /upload_csv endpoint (CSV format: datetime, open, high, low, close, volume)

![image](https://github.com/user-attachments/assets/b75b4001-ac71-4b5a-af05-7987b4207230)

![image](https://github.com/user-attachments/assets/e3dabc5a-9a4b-4db1-966e-1de3307cde53)

![image](https://github.com/user-attachments/assets/410731e8-ae58-44c0-94c1-740f443a799d)






3. Frontend Setup (React + TypeScript)
cd frontend
npm install
npm run dev

🧠 Strategy Building Guide
Asset/Market Selection: Choose symbol, market type (spot/perp), and exchange

Indicators: EMA, RSI, MACD

Logic Builder: Use operators (AND, OR, >, <) to define entry/exit conditions

Execution Settings: Order type, slippage, fees, position sizing

Risk Management: Stop Loss, Take Profit, Trailing SL

Submit strategy to trigger backend simulation and receive real-time metrics.

📊 Performance Analytics
PnL %, PnL $

CAGR, Sharpe, Sortino, Calmar

Max Drawdown (%, $), Volatility

Total Trades, Win Rate, Avg Duration

VaR, Beta, Leverage

Visualized via interactive charts and tables.

![image](https://github.com/user-attachments/assets/bf018c1e-2dcf-4cb6-852c-89569691170e)

![image](https://github.com/user-attachments/assets/25199831-639e-4328-a1a0-783354aecd68)

![image](https://github.com/user-attachments/assets/a97eb8a3-8c81-426e-aab7-0201d79422ea)

![image](https://github.com/user-attachments/assets/b39afcf3-20a6-41b9-9e7e-f0ddcbc85c21)

![image](https://github.com/user-attachments/assets/312a4a55-1210-41ed-b986-66c03f6fa7cb)

![image](https://github.com/user-attachments/assets/74720a3e-07ea-4209-9c93-5a750486170f)



4.Terminal

![image](https://github.com/user-attachments/assets/d3d28218-63d4-457b-9d8c-ed199a1da8d3)


🔬 Testing Coverage
Backend includes unit tests for:

OHLCV loader

Strategy logic parsing

Metric calculations

Frontend unit tests for:

StrategyBuilder form state

Component rendering

Run with: pytest (backend), npm test (frontend)

📁 Sample Strategy
Example strategy is included in /sample_strategies/:

json
Copy
Edit
{
  "symbol": "BTC-USDT",
  "market": "spot",
  "entry": {
    "indicator": "EMA",
    "period": 20,
    "condition": ">",
    "value": "EMA_50"
  },
  "exit": {
    "indicator": "RSI",
    "condition": ">",
    "value": 70
  },
  "risk": {
    "stop_loss": 0.03,
    "take_profit": 0.05
  }
}

📝 Future Improvements
Portfolio rebalancing logic

Cross-exchange arbitrage support

WebSocket optimization for low-latency backtesting

Multi-strategy comparison tool

Strategy optimization (grid/random search)

📌 Credits
Developed by Pushkar Singh
📧 pushkarsingh7898@gmail.com
[GitHub](https://github.com/PushkarSingh07) | [LinkedIn](https://linkedin.com/in/pushkar-singh-a006b21b5)


Let me know if you'd like this exported as a `.md` file or if you'd like help generating your video script.










