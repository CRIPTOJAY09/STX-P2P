export interface BinancePrice {
  symbol: string;
  price: string;
}

export interface ExchangeRates {
  usd: number;
  eur: number;
}

export interface APIConfig {
  baseURL: string;
  timeout: number;
  retryAttempts: number;
}