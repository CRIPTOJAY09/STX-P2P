export interface FeeConfig {
  tradeFeePercentage: number;
  withdrawalFeePercentage: number;
}

export interface FeeCalculation {
  amount: string;
  fee: string;
  total: string;
}

export interface FeeValidation {
  isValid: boolean;
  error?: string;
}

export interface FeeTransferResult {
  success: boolean;
  error?: string;
  txHash?: string;
}