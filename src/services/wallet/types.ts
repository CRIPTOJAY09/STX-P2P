export interface WalletBalance {
  usdt: string;
  usd: string;
  eur: string;
}

export interface WalletCredentials {
  address: string;
  privateKey: string;
}

export interface TransactionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}