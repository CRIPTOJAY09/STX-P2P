export const API_CONFIG = {
  baseURL: 'https://api.binance.com/api/v3',
  timeout: 5000,
  retryAttempts: 3
} as const;

export const FALLBACK_RATES = {
  usd: 1.0,
  eur: 0.92
} as const;