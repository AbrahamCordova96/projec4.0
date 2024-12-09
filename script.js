// Utility functions for the financial management system
import { formatCurrency, formatDateTime, generateOrderNumber } from './src/utils/formatters';

// Order management
const createNewOrder = (orderData) => {
  const order = {
    ...orderData,
    orderNumber: generateOrderNumber(),
    creationDateTime: new Date().toISOString()
  };
  return order;
};

// Financial calculations
const calculateBalance = (total, advance, discount = 0) => {
  return total - advance - discount;
};

const calculateProfit = (income, expenses) => {
  return income - expenses;
};

// Data validation
const validateOrderData = (data) => {
  const required = [
    'customerName',
    'customerPhone',
    'deviceType',
    'brand',
    'model',
    'faultDescription'
  ];

  const missing = required.filter(field => !data[field]);
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }

  return true;
};

// Export functions for use in components
export {
  createNewOrder,
  calculateBalance,
  calculateProfit,
  validateOrderData
};