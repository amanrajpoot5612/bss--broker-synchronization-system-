import { zerodhaAdaptor } from "./zerodhaAdaptor.js";
import { normalizeZerodhaData } from "./normalizeZerodha.js";

const orders = [
  { order_id: "101", trading_symbol: "INFY", transaction_type: "BUY", quantity: 10, price: 1500, order_type: "Limit", status: "Filled", timestamp: "2025-09-01T09:30:00Z" }
];

const positions = {
  net: [
    { position_id: "POS101", tradingsymbol: "INFY", quantity: 20, average_price: 1450, last_price: 1500, pnl: 1000, day_buy_quantity: 10, day_sell_quantity: 0, timestamp: "2025-09-01T09:30:00Z" }
  ]
};

const holdings = [
  { holding_id: "HOLD101", tradingsymbol: "INFY", quantity: 30, average_price: 1400, last_price: 1500, pnl: 3000, timestamp: "2025-09-01T09:30:00Z" }
];

// Step 1: Adaptor
const adaptorOutput = zerodhaAdaptor({ orders, positions, holdings });

// Step 2: Normalization
const normalizedData = normalizeZerodhaData(adaptorOutput);

// Step 3: Test output
console.log(normalizedData.orders);
console.log(normalizedData.positions);
console.log(normalizedData.holdings);
console.log(normalizedData.combined);
