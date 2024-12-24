export interface Balance {
  currency: string;
  amount: string;
  symbol?: string;
  flag?: string;
}

export interface WalletBalanceProps {
  balances: Balance[];
}