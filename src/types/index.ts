export type Currency = 'USDT' | 'STX';
export type FiatCurrency = 'USD' | 'EUR';
export type PaymentMethod = 'Zelle' | 'PayPal';
export type UserStatus = 'Online' | 'Offline' | 'Busy';

export interface TradeOffer {
  id: string;
  sellerId: string;
  sellerNickname: string;
  sellerStatus: UserStatus;
  cryptocurrency: Currency;
  fiatCurrency: FiatCurrency;
  pricePerUnit: number;
  minAmount: number;
  maxAmount: number;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  expiresAt: Date;
}

export interface User {
  id: string;
  nickname: string;
  status: UserStatus;
  wallets: {
    USDT: string;
    STX: string;
  };
  tradingEnabled: boolean;
  canceledOrders: number;
  blockedUntil?: Date;
}