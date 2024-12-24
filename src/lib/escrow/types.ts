export interface EscrowData {
  id: string;
  tradeId: string;
  buyerAddress: string;
  sellerAddress: string;
  amount: string;
  status: EscrowStatus;
  createdAt: Date;
  expiresAt: Date;
}

export type EscrowStatus = 'pending' | 'locked' | 'released' | 'refunded' | 'expired';

export interface EscrowValidation {
  isValid: boolean;
  error?: string;
}