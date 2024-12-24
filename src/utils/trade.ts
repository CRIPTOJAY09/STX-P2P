export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const calculateTotal = (amount: number, price: number): number => {
  return amount * price;
};

export const calculateFee = (total: number): number => {
  return total * 0.0002; // 0.02%
};