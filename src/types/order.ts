export type OrderStatus = 'active' | 'completed' | 'cancelled' | 'disputed';
export type OrderType = 'buy' | 'sell';

export interface Order {
  id: string;
  type: OrderType;
  cryptocurrency: string;
  fiatCurrency: string;
  amount: number;
  price: number;
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  txHash?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  type?: OrderType;
  dateRange?: {
    start: Date;
    end: Date;
  };
}