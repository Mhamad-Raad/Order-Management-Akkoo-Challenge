export const generateId = () =>
  `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
