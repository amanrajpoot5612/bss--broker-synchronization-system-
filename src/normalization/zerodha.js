function normalizeZerodhaData({ orders = [], positions = [], holdings = [] }) {
  const normalizeArray = (arr, type) => {
    return arr.map(item => {
      const normalized = {};
      for (let key in item) {
        normalized[key] = typeof item[key] === "number"
          ? item[key]
          : isNaN(Number(item[key]))
            ? item[key]
            : Number(item[key]);
      }
      normalized.TransactTime = new Date(item.TransactTime || Date.now()).toISOString();
      normalized.source = type;
      return normalized;
    });
  };

  const ordersNormalized = normalizeArray(orders, "order");
  const positionsNormalized = normalizeArray(positions, "position");
  const holdingsNormalized = normalizeArray(holdings, "holding");


  return {
    orders: ordersNormalized,
    positions: positionsNormalized,
    holdings: holdingsNormalized,
  };
}

export { normalizeZerodhaData };
