export type PaymentMethod = 'PayPal' | 'Zelle';
export type TradeStatus = 'pending' | 'completed' | 'cancelled';

export interface SellerProfile {
  id: string;
  nickname: string;
  status: 'online' | 'offline' | 'busy';
  rating: number;
  responseTimeMinutes: number;
  completedTrades: number;
}

export interface TradeOrder {
  id: string;
  seller: SellerProfile;
  pricePerUnit: number;
  availableAmount: number;
  minAmount: number;
  maxAmount: number;
  paymentMethods: PaymentMethod[];
  expiresAt: Date;
  status: TradeStatus;
}