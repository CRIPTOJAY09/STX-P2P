export type TransactionType = 'deposit' | 'withdrawal';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: string;
  fee?: string;
  status: TransactionStatus;
  txHash?: string;
  createdAt: Date;
  completedAt?: Date;
}