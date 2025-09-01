# Broker Synchronization System (BSS)

Broker Synchronization System (BSS) is a backend project designed to synchronize trades from multiple third-party brokers such as Zerodha, MetaTrader, and others. The system uses trading API keys from supported brokers to fetch and sync trade data, providing a unified interface for managing trades across platforms.


## Features

- **Multi-broker support:** Integrate with brokers like Zerodha, MetaTrader, and more.
- **Adapter-based architecture:** Easily add support for new brokers by implementing adapters.
- **Trade synchronization:** Automatically fetch and sync trades from connected brokers.



# Broker Integration Layer (One-Way Sync)

A modular backend system for syncing trades from third-party brokers to Journalyst's trade journaling platform.

## 🏗️ Project Structure

```
src/
├── adapters/
│   └── zerodha.js              # Zerodha Kite Connect adapter
├── auth/
│   └── session.js              # Session management
├── middleware/
│   └── checksum.js             # Request validation middleware
├── models/                     # Data models
├── normalization/
│   └── zerodha.js              # Zerodha data normalization
├── services/
│   └── access_token.js         # Token management service
├── utils/
│   ├── index.js                # Utility functions
│   └── secrets.js              # Secret management
├── tests/                      # Test files
├── token.js                    # Token handling
└── data/
    ├── holdings.zerodha.json   # Sample holdings data
    ├── orders.fix.json         # Sample FIX orders
    └── orders.zerodha.json     # Sample Zerodha orders
```

## 🔧 Setup & Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your broker API credentials

# Run the application
npm start

# Run tests
npm test
```

## 📝 Configuration

Create a `.env` file:

```env
ZERODHA_API_KEY=your_api_key
ZERODHA_API_SECRET=your_api_secret
NODE_ENV=development
```

## 🔌 Usage

### Basic Sync Operation

```javascript
const { syncTrades } = require('./src/services/sync');

// Sync trades for a user
const trades = await syncTrades('user123', 'zerodha');
```

### Token Management

```javascript
const TokenService = require('./src/services/access_token');

// Get valid token for user
const token = await TokenService.getValidToken('user123', 'zerodha');
```

## 🔄 Adding a New Broker

### 1. Create Broker Adapter

```javascript
// src/adapters/newbroker.js
class NewBrokerAdapter {
  constructor(config) {
    this.config = config;
    this.baseUrl = config.baseUrl;
  }

  async fetchTrades(token, params) {
    // Implement broker-specific API calls
  }

  async refreshToken(refreshToken) {
    // Implement token refresh logic
  }
}

module.exports = NewBrokerAdapter;
```

### 2. Add Normalization Logic

```javascript
// src/normalization/newbroker.js
function normalizeNewBrokerTrade(brokerTrade) {
  return {
    id: generateTradeId(),
    symbol: brokerTrade.instrument,
    quantity: brokerTrade.qty,
    price: brokerTrade.price,
    side: brokerTrade.transaction_type,
    timestamp: new Date(brokerTrade.order_timestamp),
    broker: 'newbroker',
    brokerTradeId: brokerTrade.order_id,
    fees: brokerTrade.charges || 0,
    metadata: {
      exchange: brokerTrade.exchange,
      product: brokerTrade.product
    }
  };
}

module.exports = { normalizeNewBrokerTrade };
```

### 3. Register the Broker

Add the new broker to your adapter registry and configuration files.


## 📊 Data Flow

1. **Authentication**: Get/refresh user token for broker
2. **Fetch**: Retrieve trade data from broker API
3. **Normalize**: Convert to unified Trade format
4. **Validate**: Check data integrity and completeness
5. **Return**: Send normalized trades to caller


## 🏛️ Design Decisions

### Adapter Pattern
Each broker implements a common interface, making it easy to add new brokers without changing core logic.

### Service Layer
Separates concerns between authentication, data fetching, and normalization for better maintainability.

### In-Memory Storage
Tokens and cache stored in memory for simplicity. Easy to replace with persistent storage.

### Modular Structure
Clear separation between adapters, services, models, and utilities for better code organization.

## 📋 Assumptions

- Users have completed OAuth flow and have valid refresh tokens
- Broker APIs follow REST conventions with JSON responses
- Trade data volume is manageable for synchronous processing
- Network connectivity is generally stable
- All timestamps are in UTC format


