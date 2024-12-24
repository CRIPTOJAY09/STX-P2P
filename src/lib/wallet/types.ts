export interface WalletData {
  address: string;
  privateKey: string;
}

export interface EncryptedWallet {
  address: string;
  encryptedPrivateKey: string;
}

export interface TransactionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}