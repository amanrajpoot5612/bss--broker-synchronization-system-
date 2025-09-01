function zeordhaAdaptor({ orders = [], positions = { net: [] }, holdings = [] }) {

    // orders mapping
    const normalizedOrders = orders.map(order => ({
        ClOrdID: o.order_id || `ORD-${Date.now()}`,
        Symbol: o.trading_symbol,
        Side: o.transaction_type === "BUY" ? "Buy" : "Sell",
        OrderQty: o.quantity,
        Price: o.price || o.average_price || 0,
        OrdType: o.order_type || "Limit",
        TransactTime: o.timestamp || new Date().toISOString(),
        OrdStatus: o.status || "New"
    }));

    // positions mapping
    const normalizedPositions = positions.net.map(p => ({
        PosMaintRptID: p.position_id || `POS-${Date.now()}`,
        Symbol: p.tradingsymbol,
        LongQty: p.quantity > 0 ? p.quantity : 0,
        ShortQty: p.quantity < 0 ? Math.abs(p.quantity) : 0,
        AvgPx: p.average_price || 0,
        CurrentPx: p.last_price || 0,
        UnrealizedPnl: p.pnl || (p.last_price - p.average_price) * p.quantity || 0,
        DayBuyQty: p.day_buy_quantity || 0,
        DaySellQty: p.day_sell_quantity || 0,
        TransactTime: p.timestamp || new Date().toISOString()
    }));


    const normalizedHoldings = holdings.map(h => ({
        HoldID: h.holding_id || `HOLD-${Date.now()}`,
        Symbol: h.tradingsymbol,
        Quantity: h.quantity,
        AvgPx: h.average_price,
        CurrentPx: h.last_price,
        MarketValue: (h.last_price || 0) * (h.quantity || 0),
        UnrealizedPnl: h.pnl || ((h.last_price || 0) - (h.average_price || 0)) * (h.quantity || 0),
        TransactTime: h.timestamp || new Date().toISOString()
    }));

    return {
        orders: normalizedOrders,
        positions: normalizedPositions,
        holdings: normalizedHoldings
    }
}

