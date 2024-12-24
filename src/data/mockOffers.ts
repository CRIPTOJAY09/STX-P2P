import type { TradeOffer } from '../types';

export const mockOffers: TradeOffer[] = [
  {
    id: '1',
    sellerId: 'STX000001',
    sellerNickname: 'CriptoJay',
    sellerStatus: 'Online',
    cryptocurrency: 'USDT',
    fiatCurrency: 'USD',
    pricePerUnit: 1.00,
    minAmount: 100,
    maxAmount: 1000,
    paymentMethod: 'STX PAY',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  },
];