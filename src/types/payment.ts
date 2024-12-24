export type PaymentMethodType = 'crypto' | 'fiat' | 'bank';
export type PaymentMethodStatus = 'active' | 'inactive' | 'coming_soon';

export interface PaymentMethod {
  id: string;
  name: string;
  type: PaymentMethodType;
  status: PaymentMethodStatus;
  icon: string;
  description: string;
  minAmount?: number;
  maxAmount?: number;
  processingTime: string;
  fee: number;
}